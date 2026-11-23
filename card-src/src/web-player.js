import { SendspinPlayer, loadSendspinClientIdentity } from "@sendspin/sendspin-js";

const WEBPLAYER_ID_KEY = "sendspin_webplayer_id";
const SYNC_DELAY_KEY = "sendspin_static_delay_v2";
const VOLUME_KEY = "frontend.settings.sendspin_volume";

function detectBrowser() {
  const ua = navigator.userAgent || "";
  if (/Edg\//.test(ua)) return "Edge";
  if (/OPR\//.test(ua)) return "Opera";
  if (/Firefox\//.test(ua)) return "Firefox";
  if (/Chrome\//.test(ua)) return "Chrome";
  if (/Safari\//.test(ua)) return "Safari";
  return "Browser";
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
  return `Web (${detectBrowser()} on ${detectPlatform()})`;
}

function readNumber(key) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return undefined;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
}

function writeNumber(key, value) {
  try {
    if (Number.isFinite(value)) localStorage.setItem(key, String(value));
  } catch {
    // ignore storage errors
  }
}

// Read the persisted Sendspin identity before creating the player.  Music
// Assistant needs this client_id in its proxy auth frame to whitelist the
// browser web player; a player built later on localStorage adopts it.
export function webPlayerClientId() {
  try {
    return loadSendspinClientIdentity().clientId || "";
  } catch {
    return "";
  }
}

// Music Assistant's built-in player uses this exact localStorage key to find
// the tab that owns playback.  Mirror the Sendspin identity into it before the
// socket is created, exactly like the official frontend does.
export function rememberWebPlayerId(clientId) {
  if (!clientId) return clientId;
  try {
    localStorage.setItem(WEBPLAYER_ID_KEY, clientId);
  } catch {
    // ignore storage errors
  }
  return clientId;
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
    // The official player mirrors the Sendspin Noise public key into this
    // fixed key; the proxy auth and pairing both resolve the same client id.
    rememberWebPlayerId(webPlayerClientId());
    const savedDelay = readNumber(SYNC_DELAY_KEY);
    const savedVolume = readNumber(VOLUME_KEY);
    const player = new SendspinPlayer({
      url: this.url,
      clientName: this.name,
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
