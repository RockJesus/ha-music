// 全局播放器入口：顶部悬浮胶囊 + 右下角悬浮按钮。
// 只在明确启用时安装（卡片 dock: true，或模块 URL 带 ?dock=1），避免污染普通仪表盘。
const DEFAULT_PATH = "/ha-music-player";
const MUSIC_ICON = `<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" focusable="false"><path d="M14.5 5.2l4.6-1v9.1a3 3 0 1 1-1.8-2.7V7.1l-2.8.6v7.7a3 3 0 1 1-1.8-2.7V5.2z" fill="currentColor"/></svg>`;

const DOCK_STYLE = `
  :host {
    position: fixed;
    inset: 0;
    z-index: 2147483000;
    pointer-events: none;
  }
  * { box-sizing: border-box; }
  [hidden] { display: none !important; }
  button {
    margin: 0;
    font: inherit;
    color: #eaf6ff;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    pointer-events: auto;
  }
  .cap {
    position: fixed;
    top: calc(env(safe-area-inset-top, 0px) + 64px);
    left: 50%;
    transform: translateX(-50%);
    display: inline-flex;
    align-items: center;
    gap: 7px;
    height: 34px;
    padding: 0 13px 0 10px;
    border: 1px solid rgba(46, 230, 197, 0.34);
    border-radius: 999px;
    background:
      linear-gradient(135deg, rgba(46, 230, 197, 0.16), rgba(123, 92, 255, 0.16)),
      rgba(7, 11, 19, 0.76);
    box-shadow:
      0 10px 32px rgba(0, 0, 0, 0.34),
      0 0 18px -4px rgba(46, 230, 197, 0.36);
    backdrop-filter: blur(16px) saturate(1.25);
    -webkit-backdrop-filter: blur(16px) saturate(1.25);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
  }
  .cap .icon { display: inline-flex; color: #2ee6c5; }
  .cap:hover {
    transform: translateX(-50%) translateY(-1px);
    border-color: rgba(46, 230, 197, 0.62);
    box-shadow:
      0 12px 34px rgba(0, 0, 0, 0.4),
      0 0 24px -4px rgba(46, 230, 197, 0.52);
  }
  .fab {
    position: fixed;
    right: max(18px, env(safe-area-inset-right, 0px));
    bottom: calc(env(safe-area-inset-bottom, 0px) + 18px);
    width: 52px;
    height: 52px;
    display: grid;
    place-items: center;
    border: 1px solid rgba(46, 230, 197, 0.42);
    border-radius: 50%;
    background:
      linear-gradient(135deg, rgba(46, 230, 197, 0.22), rgba(123, 92, 255, 0.2)),
      rgba(7, 11, 19, 0.8);
    box-shadow:
      0 14px 38px rgba(0, 0, 0, 0.44),
      0 0 22px -2px rgba(46, 230, 197, 0.46);
    backdrop-filter: blur(16px) saturate(1.25);
    -webkit-backdrop-filter: blur(16px) saturate(1.25);
    color: #2ee6c5;
    transition: transform 0.18s ease, box-shadow 0.18s ease;
  }
  .fab:hover {
    transform: translateY(-2px) scale(1.04);
    box-shadow:
      0 18px 42px rgba(0, 0, 0, 0.5),
      0 0 30px -2px rgba(46, 230, 197, 0.62);
  }
  .cap:active, .fab:active { transform: scale(0.96); }
  .cap:focus-visible, .fab:focus-visible {
    outline: 2px solid rgba(46, 230, 197, 0.8);
    outline-offset: 3px;
  }
  @media (max-width: 600px) {
    .cap {
      top: calc(env(safe-area-inset-top, 0px) + 58px);
      height: 32px;
      padding: 0 11px 0 9px;
      font-size: 10px;
    }
    .fab {
      width: 48px;
      height: 48px;
      right: max(14px, env(safe-area-inset-right, 0px));
      bottom: calc(env(safe-area-inset-bottom, 0px) + 14px);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .cap, .fab { transition: none; }
  }
`;

function normalizePath(value) {
  if (typeof value !== "string" || !value.startsWith("/")) return DEFAULT_PATH;
  return value.trim() || DEFAULT_PATH;
}

function goTo(path) {
  try {
    window.history.pushState(null, "", path);
    window.dispatchEvent(
      new CustomEvent("location-changed", {
        bubbles: true,
        composed: true,
      })
    );
  } catch {
    window.location.href = path;
  }
}

export function installDock(options = {}) {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return null;
  }
  const config = {
    path: normalizePath(options.path),
    top: options.top !== false,
    fab: options.fab !== false,
  };
  if (!document.body) {
    document.addEventListener(
      "DOMContentLoaded",
      () => installDock(config),
      { once: true }
    );
    return null;
  }
  if (window.__haMusicDock) {
    window.__haMusicDock.configure(config);
    return window.__haMusicDock;
  }
  const node = document.createElement("ha-music-dock");
  node.configure(config);
  document.body.appendChild(node);
  window.__haMusicDock = node;
  return node;
}

class HaMusicDock extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = { path: DEFAULT_PATH, top: true, fab: true };
    this._onRoute = () => this._sync();
  }

  configure(config) {
    this._config = {
      path: normalizePath(config?.path),
      top: config?.top !== false,
      fab: config?.fab !== false,
    };
    if (this.shadowRoot?.childElementCount) this._sync();
  }

  connectedCallback() {
    this._render();
    window.addEventListener("location-changed", this._onRoute);
    window.addEventListener("popstate", this._onRoute);
    this._sync();
  }

  disconnectedCallback() {
    window.removeEventListener("location-changed", this._onRoute);
    window.removeEventListener("popstate", this._onRoute);
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>${DOCK_STYLE}</style>
      <button class="cap" type="button" aria-label="打开 HA Music" title="打开 HA Music">
        <span class="icon">${MUSIC_ICON}</span>
        <span>HA Music</span>
      </button>
      <button class="fab" type="button" aria-label="打开 HA Music" title="打开 HA Music">
        ${MUSIC_ICON}
      </button>
    `;
    this._cap = this.shadowRoot.querySelector(".cap");
    this._fab = this.shadowRoot.querySelector(".fab");
    this._cap?.addEventListener("click", () => this._go());
    this._fab?.addEventListener("click", () => this._go());
  }

  _isOnPlayer() {
    const current = (window.location.pathname || "/").replace(/\/+$/, "") || "/";
    const target = this._config.path.replace(/\/+$/, "") || "/";
    return current === target || current.startsWith(`${target}/`);
  }

  _sync() {
    const onPlayer = this._isOnPlayer();
    if (this._cap) this._cap.hidden = !this._config.top || onPlayer;
    if (this._fab) this._fab.hidden = !this._config.fab || onPlayer;
  }

  _go() {
    if (this._isOnPlayer()) return;
    goTo(this._config.path);
  }
}

if (!customElements.get("ha-music-dock")) {
  customElements.define("ha-music-dock", HaMusicDock);
}
