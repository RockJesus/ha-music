import { SendspinPlayer } from "@sendspin/sendspin-js";

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
      productName: "HA Music Card",
      manufacturer: "RockJesus",
      softwareVersion: this.version,
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
