// 全局迷你播放器：顶部 / 侧边栏 / 右下角三种位置，直接控制当前播放器。
// 通过卡片传入 hass 与当前实体；也支持模块 URL 的 dock=top|sidebar|fab + dock_entity。
const PREF_KEY = "haMusicMiniPlayer";
const MODES = new Set(["top", "sidebar", "fab"]);

const NOTE_ICON = `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path d="M14.5 5.2l4.6-1v9.1a3 3 0 1 1-1.8-2.7V7.1l-2.8.6v7.7a3 3 0 1 1-1.8-2.7V5.2z" fill="currentColor"/></svg>`;
const PREV_ICON = `<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" fill="currentColor"/></svg>`;
const NEXT_ICON = `<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M16 6h2v12h-2zM6 6l8.5 6L6 18z" fill="currentColor"/></svg>`;
const PLAY_ICON = `<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>`;
const PAUSE_ICON = `<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M6 5h4v14H6zM14 5h4v14h-4z" fill="currentColor"/></svg>`;

const STYLE = `
  :host {
    position: fixed;
    inset: 0;
    z-index: 2147483000;
    pointer-events: none;
    --hm-accent: #2ee6c5;
    --hm-accent-2: #7b5cff;
  }
  * { box-sizing: border-box; }
  .mini {
    pointer-events: auto;
    position: fixed;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 9px 9px;
    border: 1px solid rgba(46, 230, 197, 0.3);
    border-radius: 16px;
    background:
      linear-gradient(135deg, rgba(46, 230, 197, 0.14), rgba(123, 92, 255, 0.14)),
      rgba(7, 11, 19, 0.82);
    box-shadow:
      0 14px 38px rgba(0, 0, 0, 0.4),
      0 0 20px -6px rgba(46, 230, 197, 0.4);
    backdrop-filter: blur(16px) saturate(1.25);
    -webkit-backdrop-filter: blur(16px) saturate(1.25);
    color: #eaf6ff;
    font-family: var(--ha-font-family, "Noto Sans SC", "PingFang SC", system-ui, sans-serif);
    transition: box-shadow 0.18s ease, border-color 0.18s ease;
  }
  .mini:hover {
    border-color: rgba(46, 230, 197, 0.5);
    box-shadow:
      0 16px 40px rgba(0, 0, 0, 0.46),
      0 0 26px -6px rgba(46, 230, 197, 0.5);
  }
  .mini[data-mode="top"] {
    top: calc(env(safe-area-inset-top, 0px) + 56px);
    right: max(16px, env(safe-area-inset-right, 0px));
    width: min(420px, calc(100vw - 32px));
  }
  .mini[data-mode="sidebar"] {
    left: max(10px, env(safe-area-inset-left, 0px));
    bottom: calc(env(safe-area-inset-bottom, 0px) + 84px);
    width: 236px;
  }
  .mini[data-mode="fab"] {
    right: max(16px, env(safe-area-inset-right, 0px));
    bottom: calc(env(safe-area-inset-bottom, 0px) + 18px);
    width: min(300px, calc(100vw - 32px));
  }
  .art {
    width: 36px;
    height: 36px;
    flex: 0 0 auto;
    border-radius: 9px;
    overflow: hidden;
    display: grid;
    place-items: center;
    color: var(--hm-accent);
    background: linear-gradient(135deg, rgba(46, 230, 197, 0.2), rgba(123, 92, 255, 0.26));
  }
  .art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: none;
  }
  .art img[src] { display: block; }
  .art .fallback { display: grid; place-items: center; }
  .meta {
    min-width: 0;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 2px;
    line-height: 1.2;
  }
  .title {
    min-width: 0;
    font-size: 12px;
    font-weight: 650;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #f2f9ff;
  }
  .sub {
    min-width: 0;
    font-size: 10px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #9fb3c8;
  }
  .controls {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    gap: 1px;
  }
  .controls button {
    width: 28px;
    height: 28px;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 8px;
    display: grid;
    place-items: center;
    background: transparent;
    color: #c9d9e8;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease;
  }
  .controls button:hover { background: rgba(46, 230, 197, 0.13); color: var(--hm-accent); }
  .controls button:active { transform: scale(0.92); }
  .controls button:focus-visible {
    outline: 2px solid rgba(46, 230, 197, 0.8);
    outline-offset: 2px;
  }
  .controls button[disabled] { opacity: 0.38; cursor: default; }
  .controls .toggle {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    color: var(--hm-accent);
    background: rgba(46, 230, 197, 0.15);
  }
  .controls .toggle:hover { background: rgba(46, 230, 197, 0.24); }
  .progress {
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 3px;
    height: 2px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.1);
    overflow: hidden;
  }
  .progress span {
    display: block;
    width: 0;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--hm-accent), var(--hm-accent-2));
    transition: width 0.5s linear;
  }
  @media (max-width: 700px) {
    .mini[data-mode="top"] {
      top: calc(env(safe-area-inset-top, 0px) + 58px);
      left: max(10px, env(safe-area-inset-left, 0px));
      right: max(10px, env(safe-area-inset-right, 0px));
      width: auto;
    }
    .mini[data-mode="sidebar"] {
      left: max(10px, env(safe-area-inset-left, 0px));
      right: max(10px, env(safe-area-inset-right, 0px));
      bottom: calc(env(safe-area-inset-bottom, 0px) + 78px);
      width: auto;
    }
    .mini[data-mode="fab"] {
      right: max(12px, env(safe-area-inset-right, 0px));
      bottom: calc(env(safe-area-inset-bottom, 0px) + 14px);
      width: min(300px, calc(100vw - 24px));
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .mini, .controls button, .progress span { transition: none; }
  }
`;

function normalizeMode(value) {
  if (value === true || value === "1") return "top";
  return MODES.has(value) ? value : "none";
}

function normalizeEntity(value) {
  return typeof value === "string" && value.startsWith("media_player.") ? value : "";
}

export function resolveHass() {
  if (typeof document === "undefined") return null;
  const root = document.querySelector("home-assistant");
  if (root?.hass?.states) return root.hass;
  const main = root?.shadowRoot?.querySelector("home-assistant-main");
  if (main?.hass?.states) return main.hass;
  const card = document.querySelector("ha-music");
  if (card?.hass?.states) return card.hass;
  return null;
}

export function loadDockPref() {
  try {
    const raw = window.localStorage.getItem(PREF_KEY);
    if (!raw) return null;
    const pref = JSON.parse(raw);
    const mode = normalizeMode(pref?.mode);
    const entity = normalizeEntity(pref?.entity);
    if (mode === "none" || !entity) return null;
    return { mode, entity };
  } catch {
    return null;
  }
}

export function saveDockPref({ mode, entity }) {
  try {
    const m = normalizeMode(mode);
    const e = normalizeEntity(entity);
    if (m === "none" || !e) {
      window.localStorage.removeItem(PREF_KEY);
      return;
    }
    const current = loadDockPref();
    if (current?.mode === m && current?.entity === e) return;
    window.localStorage.setItem(PREF_KEY, JSON.stringify({ mode: m, entity: e }));
  } catch {
    /* localStorage 不可用时只影响跨页面记忆，不影响当前实例 */
  }
}

export function clearDockPref() {
  try {
    window.localStorage.removeItem(PREF_KEY);
  } catch {
    /* ignore */
  }
}

export function uninstallDock() {
  if (typeof document === "undefined") return;
  window.__haMusicDock?.remove();
  window.__haMusicDock = null;
}

export function installDock(options = {}) {
  if (typeof window === "undefined" || typeof document === "undefined") return null;
  const mode = normalizeMode(options.mode);
  if (mode === "none") {
    uninstallDock();
    return null;
  }
  const config = {
    mode,
    entity: normalizeEntity(options.entity),
    hass: options.hass || null,
  };
  if (!document.body) {
    document.addEventListener("DOMContentLoaded", () => installDock(config), { once: true });
    return null;
  }
  if (window.__haMusicDock) {
    window.__haMusicDock.update(config);
    return window.__haMusicDock;
  }
  const node = document.createElement("ha-music-mini");
  node.update(config);
  document.body.appendChild(node);
  window.__haMusicDock = node;
  return node;
}

class HaMusicMini extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._mode = "top";
    this._entity = "";
    this._hass = null;
    this._poll = null;
    this._onClick = (event) => this._handleClick(event);
    this._onRoute = () => this._sync();
    this._sync = this._sync.bind(this);
  }

  update(config = {}) {
    const mode = normalizeMode(config.mode);
    const entity = normalizeEntity(config.entity);
    const changedMode = mode !== this._mode;
    this._mode = mode;
    this._entity = entity;
    if (config.hass?.states) this._hass = config.hass;
    if (!this.shadowRoot.childElementCount || changedMode) this._render();
    this._sync();
  }

  connectedCallback() {
    if (!this.shadowRoot.childElementCount) this._render();
    this.shadowRoot.addEventListener("click", this._onClick);
    window.addEventListener("location-changed", this._onRoute);
    this._startPolling();
    this._sync();
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener("click", this._onClick);
    window.removeEventListener("location-changed", this._onRoute);
    if (this._poll) clearInterval(this._poll);
    this._poll = null;
  }

  _startPolling() {
    if (this._poll) return;
    this._poll = window.setInterval(() => {
      const hass = resolveHass() || this._hass;
      if (hass?.states) {
        this._hass = hass;
        this._sync();
      }
    }, 1000);
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>${STYLE}</style>
      <div class="mini" data-mode="${this._mode}" role="region" aria-label="HA Music 迷你播放器">
        <div class="art">
          <img alt="" />
          <span class="fallback">${NOTE_ICON}</span>
        </div>
        <div class="meta">
          <div class="title">选择播放器</div>
          <div class="sub">在卡片编辑器中选择位置</div>
        </div>
        <div class="controls">
          <button data-act="prev" type="button" aria-label="上一首">${PREV_ICON}</button>
          <button class="toggle" data-act="toggle" type="button" aria-label="播放">${PLAY_ICON}</button>
          <button data-act="next" type="button" aria-label="下一首">${NEXT_ICON}</button>
        </div>
        <div class="progress"><span></span></div>
      </div>
    `;
    this._mini = this.shadowRoot.querySelector(".mini");
    this._art = this.shadowRoot.querySelector(".art img");
    this._fallback = this.shadowRoot.querySelector(".fallback");
    this._title = this.shadowRoot.querySelector(".title");
    this._sub = this.shadowRoot.querySelector(".sub");
    this._toggle = this.shadowRoot.querySelector(".toggle");
    this._prev = this.shadowRoot.querySelector('[data-act="prev"]');
    this._next = this.shadowRoot.querySelector('[data-act="next"]');
    this._progress = this.shadowRoot.querySelector(".progress span");
    this._art.addEventListener("error", () => {
      this._art.removeAttribute("src");
      this._fallback.style.display = "grid";
    });
  }

  _stateLabel(state) {
    const zh = !this._hass?.language || String(this._hass.language).startsWith("zh");
    const labels = {
      playing: zh ? "播放中" : "Playing",
      paused: zh ? "已暂停" : "Paused",
      idle: zh ? "空闲" : "Idle",
      off: zh ? "已关闭" : "Off",
      unavailable: zh ? "不可用" : "Unavailable",
      unknown: zh ? "未知" : "Unknown",
    };
    return labels[state] || state;
  }

  _sync() {
    if (!this._mini) return;
    this._mini.dataset.mode = this._mode;
    if (!this._entity) {
      this._title.textContent = "选择播放器";
      this._sub.textContent = "在卡片编辑器中选择位置";
      this._setDisabled(true);
      this._progress.style.width = "0%";
      this._setArt(null);
      return;
    }
    const hass = resolveHass() || this._hass;
    if (hass?.states) this._hass = hass;
    const state = this._hass?.states?.[this._entity];
    if (!state) {
      this._title.textContent = this._entity;
      this._sub.textContent = "实体不可用";
      this._setDisabled(true);
      this._progress.style.width = "0%";
      this._setArt(null);
      return;
    }
    const a = state.attributes || {};
    const title = a.media_title || a.friendly_name || this._entity;
    this._title.textContent = title;
    let artist = a.media_artist || a.media_album_name || "";
    if (artist === title) artist = "";
    const label = this._stateLabel(state.state);
    this._sub.textContent = artist ? `${artist} · ${label}` : label;
    this._setDisabled(false);
    const playing = state.state === "playing";
    this._toggle.innerHTML = playing ? PAUSE_ICON : PLAY_ICON;
    this._toggle.setAttribute("aria-label", playing ? "暂停" : "播放");
    this._setArt(a.entity_picture);
    const duration = Number(a.media_duration || 0);
    const position = Number(a.media_position || 0);
    const percent = duration > 0 ? Math.min(100, Math.max(0, (position / duration) * 100)) : 0;
    this._progress.style.width = `${percent}%`;
  }

  _setArt(url) {
    if (!this._art) return;
    if (url) {
      try {
        const resolved = new URL(url, window.location.href).href;
        if (this._art.getAttribute("src") !== resolved) this._art.src = resolved;
        this._fallback.style.display = "none";
      } catch {
        this._art.removeAttribute("src");
        this._fallback.style.display = "grid";
      }
    } else {
      this._art.removeAttribute("src");
      this._fallback.style.display = "grid";
    }
  }

  _setDisabled(disabled) {
    for (const button of [this._prev, this._toggle, this._next]) {
      if (button) button.disabled = disabled;
    }
  }

  _handleClick(event) {
    const button = event.target.closest?.("button[data-act]");
    if (!button || button.disabled) return;
    event.preventDefault();
    event.stopPropagation();
    const act = button.dataset.act;
    if (act === "toggle") this._call("media_play_pause");
    else if (act === "prev") this._call("media_previous_track");
    else if (act === "next") this._call("media_next_track");
  }

  _call(service) {
    if (!this._hass || !this._entity) return;
    const result = this._hass.callService("media_player", service, {
      entity_id: this._entity,
    });
    if (result?.catch) result.catch((error) => console.warn("ha-music mini player:", error));
  }
}

if (!customElements.get("ha-music-mini")) {
  customElements.define("ha-music-mini", HaMusicMini);
}
