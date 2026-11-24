import { SendspinPlayer, loadSendspinClientIdentity } from "@sendspin/sendspin-js";

const SYNC_DELAY_KEY = "sendspin_static_delay_v2";
const VOLUME_KEY = "frontend.settings.sendspin_volume";

// The card keeps its own Sendspin identity instead of reusing the frontend's
// shared one.  Music Assistant's own web player stores its Noise identity in
// localStorage under fixed keys; on a phone the HA app and the Music Assistant
// panel share one origin, so reading those keys handed the card the identity of
// MA's player.  The server then saw two sessions for one client id, never
// registered a separate player, and exposing it to Home Assistant silently
// failed (card stuck on "waiting for entity").  A namespaced storage gives the
// card a distinct client id (and PSKs) that never collide with MA's player.
const STORAGE_NAMESPACE = "ha-music:";

function cardStorage() {
  try {
    const raw = typeof localStorage !== "undefined" ? localStorage : null;
    if (!raw) return null;
    return {
      getItem: (key) => raw.getItem(STORAGE_NAMESPACE + key),
      setItem: (key, value) => raw.setItem(STORAGE_NAMESPACE + key, String(value)),
    };
  } catch {
    return null;
  }
}


function detectPlatform() {
  const ua = navigator.userAgent || "";
  if (/Windows/i.test(ua)) return "Windows";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  if (/Android/i.test(ua)) return "Android";
  if (/Mac OS X|Macintosh/i.test(ua)) return "macOS";
  if (/Linux/i.test(ua)) return "Linux";
  return "Device";
}

export function webPlayerName() {
  // Keep the name short and device-shaped: "Web iOS", "Web Android",
  // "Web Windows". The browser is deliberately left out so one person's phone
  // reads the same in Music Assistant and in Home Assistant's player picker.
  return `Web ${detectPlatform()}`;
}

function readNumber(key) {
  try {
    const raw = cardStorage()?.getItem(key);
    if (raw === undefined || raw === null) return undefined;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
}

function writeNumber(key, value) {
  try {
    if (Number.isFinite(value)) cardStorage()?.setItem(key, value);
  } catch {
    // ignore storage errors
  }
}

// Read the card's persisted Sendspin identity before creating the player.
// Music Assistant needs this client_id in its proxy auth frame to whitelist the
// browser web player; a player built later on the same storage adopts it.
export function webPlayerClientId() {
  try {
    return loadSendspinClientIdentity(cardStorage()).clientId || "";
  } catch {
    return "";
  }
}

export class WebPlayer {
  constructor({ url, name, version, onState, onPairing, onReconnected }) {
    this.url = url;
    this.name = name;
    this.version = version;
    this.onState = onState;
    this.onPairing = onPairing;
    this.onReconnected = onReconnected;
    this.player = null;
    this.connected = false;
  }

  async connect() {
    const savedDelay = readNumber(SYNC_DELAY_KEY);
    const savedVolume = readNumber(VOLUME_KEY);
    const player = new SendspinPlayer({
      url: this.url,
      clientName: this.name,
      // Everything the SDK persists (Noise identity, pairing PSKs) stays in the
      // card's namespace so it never shares a client id with the frontend player.
      storage: cardStorage(),
      // Music Assistant recognizes its built-in browser player by this exact
      // product name; anything else is treated as a third-party client that
      // needs manual pairing and never auto-appears as a playable web player.
      productName: "Web Player",
      manufacturer: navigator.vendor || "Unknown",
      softwareVersion: navigator.userAgent || this.version,
      codecs: ["opus", "flac"],
      syncDelay: savedDelay,
      requiredLeadTimeMs: 250,
      minBufferMs: 500,
      // The official frontend only uses the precise "sync" correction when the
      // player belongs to a group; a standalone web player uses quality-local.
      correctionMode: "quality-local",
      onStateChange: (state) => {
        this.onState?.(state, this);
        if (state?.volume !== undefined) writeNumber(VOLUME_KEY, state.volume);
      },
      onPairing: (event, detail) => {
        // The server can request pairing at any point in the handshake; let the
        // card send the token instead of waiting for connect() to resolve.
        this.onPairing?.(event, detail);
      },
      onDelayCommand: (delayMs) => writeNumber(SYNC_DELAY_KEY, delayMs),
      reconnect: {
        baseDelayMs: 1000,
        maxDelayMs: 30000,
        onReconnected: () => {
          // Pairing can be dropped when the socket reconnects; re-announce the
          // pairing token so the player becomes available again.
          this.onReconnected?.();
        },
      },
    });
    this.player = player;
    if (savedVolume !== undefined) {
      try {
        player.setVolume(savedVolume);
      } catch {
        // ignore volume restore errors
      }
    }
    // Do NOT call player.unlock() here.  It creates/resumes an AudioContext
    // outside the click gesture, and Chrome rejects that with NotAllowedError,
    // which aborts the whole Sendspin connection on desktop.  The SDK creates
    // and resumes its audio context when the first stream starts.
    await player.connect();
    this.connected = true;
    return player;
  }

  get clientId() {
    return this.player?.clientId || "";
  }

  // 底层 Sendspin 会话是否真的连着；后台期间可能被浏览器/网络掐断，
  // 回到前台据此决定是否需要重建。
  get isConnected() {
    try {
      return Boolean(this.player?.isConnected);
    } catch {
      return false;
    }
  }

  get pairingToken() {
    return this.player?.pairingToken || "";
  }

  async unlock() {
    // Called from a real pointer gesture after the automatic connection.  This
    // only resumes the existing AudioContext; it never creates a socket.
    try {
      await this.player?.unlock();
      return true;
    } catch {
      return false;
    }
  }

  disconnect() {
    this.connected = false;
    try {
      this.player?.destroy("user_request");
    } catch {
      // ignore
    }
    this.player = null;
  }
}
