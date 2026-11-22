import { SendspinPlayer, loadSendspinClientIdentity } from "@sendspin/sendspin-js";

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

export class WebPlayer {
  constructor({ url, name, version, onState }) {
    this.url = url;
    this.name = name;
    this.version = version;
    this.onState = onState;
    this.player = null;
    this.connected = false;
  }

  async connect() {
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
      requiredLeadTimeMs: 250,
      minBufferMs: 500,
      correctionMode: "sync",
      onStateChange: (state) => {
        this.onState?.(state, this);
      },
    });
    this.player = player;
    // unlock() must be the first awaited call in the click handler so mobile
    // browsers create/resume the AudioContext inside the user gesture.
    await player.unlock();
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
