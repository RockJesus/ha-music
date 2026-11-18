// 全局歌词悬浮窗：只显示当前播放歌曲的一句歌词。
// 由卡片安装/更新，跨仪表盘保持；主题跟随卡片当前主题，位置存在 localStorage。
import { resolveHass, normalizeTheme, findTopBarRect, findTopBarAddRect } from "./dock.js";
import { THEMES, DEFAULT_THEME } from "./const.js";
import { colorTriplet } from "./util.js";
import { lyricIndex } from "./lyrics.js";
import {
  fetchGlobalLyrics,
  globalTrackKey,
  pickGlobalLyricsEntity,
} from "./lyrics-service.js";

const PREF_KEY = "haMusicLyricDock";
const POS_KEY = "haMusicLyricDockPos";
const HOLD_MS = 360;

function clamp(value, min, max) {
  if (max < min) return min;
  return Math.min(max, Math.max(min, value));
}

// 与卡片歌词共用同一套播放时钟锚点。HA 的 media_position 可能落后于
// media_position_updated_at，直接把它当作当前时刻会让悬浮歌词晚几秒。
function positionAnchor(stamp, now = Date.now()) {
  const parsed = typeof stamp === "number" ? stamp : Date.parse(String(stamp || ""));
  if (!Number.isFinite(parsed)) return now;
  return Math.min(parsed, now);
}

function loadPositions() {
  try {
    const raw = window.localStorage.getItem(POS_KEY);
    if (!raw) return {};
    const value = JSON.parse(raw);
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  } catch {
    return {};
  }
}

function savePosition(x, y) {
  try {
    const positions = loadPositions();
    positions.lyric = {
      x: Number(clamp(x, 0, 1).toFixed(4)),
      y: Number(clamp(y, 0, 1).toFixed(4)),
    };
    window.localStorage.setItem(POS_KEY, JSON.stringify(positions));
  } catch {
    /* localStorage 不可用时只影响跨页面位置记忆 */
  }
}

export function loadLyricDockPref() {
  try {
    const raw = window.localStorage.getItem(PREF_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw);
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    return {
      enabled: value.enabled === true,
      entity: typeof value.entity === "string" ? value.entity : "",
      updated: Number(value.updated) || 0,
    };
  } catch {
    return null;
  }
}

export function saveLyricDockPref(input = {}) {
  try {
    const next = JSON.stringify({
      enabled: input.enabled === true,
      entity: typeof input.entity === "string" ? input.entity : "",
      updated: Number(input.updated) || Date.now(),
    });
    const current = window.localStorage.getItem(PREF_KEY);
    if (current === next) return;
    window.localStorage.setItem(PREF_KEY, next);
  } catch {
    /* ignore */
  }
}

export function uninstallLyricDock() {
  if (typeof document === "undefined") return;
  window.__haMusicLyricDock?.remove();
  window.__haMusicLyricDock = null;
}

export function installLyricDock(options = {}) {
  if (typeof window === "undefined" || typeof document === "undefined") return null;
  if (options.enabled === false) {
    uninstallLyricDock();
    return null;
  }
  if (!document.body) {
    document.addEventListener("DOMContentLoaded", () => installLyricDock(options), { once: true });
    return null;
  }
  let node = window.__haMusicLyricDock;
  if (!node || !node.isConnected) {
    node = document.createElement("ha-music-lyric");
    document.body.appendChild(node);
    window.__haMusicLyricDock = node;
  }
  node.update(options);
  return node;
}

const STYLE = `
  :host {
    position: fixed;
    inset: 0;
    z-index: 2147483002;
    pointer-events: none;
    --hm-accent: #2ee6c5;
    --hm-accent-2: #7b5cff;
    --hm-accent-rgb: 46,230,197;
    --hm-accent-2-rgb: 123,92,255;
    --hm-base-rgb: 5,10,18;
    --hm-glow: 1;
  }
  * { box-sizing: border-box; }
  .lyric {
    pointer-events: auto;
    position: fixed;
    display: flex;
    align-items: center;
    gap: 9px;
    max-width: min(760px, calc(100vw - 32px));
    min-width: 0;
    padding: 10px 18px 10px 14px;
    border: 1px solid rgba(var(--hm-accent-rgb), 0.42);
    border-radius: 999px;
    overflow: hidden;
    color: #f5fbff;
    background:
      linear-gradient(112deg, rgba(var(--hm-accent-rgb), 0.22), rgba(var(--hm-accent-2-rgb), 0.22)),
      rgba(var(--hm-base-rgb), 0.82);
    box-shadow:
      0 14px 38px rgba(0, 0, 0, 0.42),
      0 0 26px -6px rgba(var(--hm-accent-rgb), 0.48),
      inset 0 0 0 1px rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(18px) saturate(1.3);
    -webkit-backdrop-filter: blur(18px) saturate(1.3);
    font-family: var(--ha-font-family, "Noto Sans SC", "PingFang SC", system-ui, sans-serif);
    font-size: clamp(13px, 1.25vw, 17px);
    font-weight: 600;
    line-height: 1.35;
    letter-spacing: 0.01em;
    user-select: none;
    -webkit-user-select: none;
    touch-action: none;
    cursor: grab;
    will-change: left, top;
  }
  .lyric::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(120deg, var(--hm-accent), var(--hm-accent-2));
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
    opacity: 0.48;
    pointer-events: none;
  }
  .lyric::after {
    content: "";
    position: absolute;
    inset: -40% auto -40% -30%;
    width: 38%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.16), transparent);
    transform: rotate(12deg);
    pointer-events: none;
    opacity: 0.5;
  }
  .mark {
    flex: 0 0 auto;
    width: 3px;
    height: 16px;
    border-radius: 999px;
    background: linear-gradient(180deg, var(--hm-accent), var(--hm-accent-2));
    box-shadow: 0 0 10px rgba(var(--hm-accent-rgb), 0.7);
  }
  .text {
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-shadow: 0 0 16px rgba(var(--hm-accent-rgb), 0.28);
  }
  .lyric[data-empty="true"] {
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
  }
  .lyric[data-dragging="true"] {
    cursor: grabbing;
    box-shadow:
      0 18px 44px rgba(0, 0, 0, 0.52),
      0 0 34px -4px rgba(var(--hm-accent-rgb), 0.7);
  }
  .lyric[data-theme="liquid"] {
    background:
      linear-gradient(112deg, rgba(var(--hm-accent-rgb), 0.18), rgba(var(--hm-accent-2-rgb), 0.2)),
      rgba(var(--hm-base-rgb), 0.72);
  }
  .lyric[data-theme="cyber"] {
    border-style: double;
    border-width: 2px;
  }
  @media (max-width: 700px) {
    .lyric {
      max-width: calc(100vw - 24px);
      font-size: 13px;
    }
  }
  /* 手机主卡片自带歌词行，悬浮歌词层会压住顶栏 mini，直接隐藏。 */
  @media (max-width: 700px) {
    .lyric { display: none !important; }
  }
  /* 不要胶囊和底板：只保留主题渐变歌词文字。 */
  .lyric[data-theme] {
    gap: 0;
    padding: 6px 10px;
    border: 0;
    border-radius: 0;
    background: none;
    box-shadow: none;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    overflow: visible;
  }
  .lyric[data-theme]::before,
  .lyric[data-theme]::after,
  .lyric[data-theme] .mark {
    display: none;
  }
  .lyric[data-theme][data-dragging="true"] {
    box-shadow: none;
  }
  .lyric[data-theme] .text {
    color: var(--hm-accent);
    font-weight: 700;
    letter-spacing: 0.02em;
    text-shadow: none;
    filter: drop-shadow(0 2px 5px rgba(var(--hm-base-rgb), 0.92));
  }
  @supports ((-webkit-background-clip: text) or (background-clip: text)) {
    .lyric[data-theme] .text {
      background-image: linear-gradient(100deg, var(--hm-accent), var(--hm-accent-2));
      background-size: 100% 100%;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      -webkit-text-fill-color: transparent;
    }
  }
`;

class HaMusicLyric extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._theme = DEFAULT_THEME;
    this._entity = "";
    this._preferred = "";
    this._auto = true;
    this._source = "auto";
    this._status = "idle";
    this._hass = null;
    this._lines = [];
    this._plain = [];
    this._linesKey = "";
    this._requestKey = "";
    this._requestController = null;
    this._offset = 0;
    this._clock = null;
    this._poll = null;
    this._press = null;
    this._pressTimer = null;
    this._drag = null;
    this._dragging = false;
    this._onPointerDown = (event) => this._handlePointerDown(event);
    this._onPointerMove = (event) => this._handlePointerMove(event);
    this._onPointerUp = () => this._handlePointerUp();
    this._onPointerCancel = () => this._handlePointerCancel();
    this._onContextMenu = (event) => {
      if (this._press || this._dragging) event.preventDefault();
    };
    this._onResize = () => this._applyPosition();
    this.shadowRoot.innerHTML = `
      <style>${STYLE}</style>
      <div class="lyric" data-empty="true" role="region" aria-label="当前歌词">
        <span class="text"></span>
      </div>
    `;
    this._pill = this.shadowRoot.querySelector(".lyric");
    this._text = this.shadowRoot.querySelector(".text");
    this.shadowRoot.addEventListener("pointerdown", this._onPointerDown);
    this.shadowRoot.addEventListener("pointermove", this._onPointerMove);
    this.shadowRoot.addEventListener("pointerup", this._onPointerUp);
    this.shadowRoot.addEventListener("pointercancel", this._onPointerCancel);
    this.shadowRoot.addEventListener("contextmenu", this._onContextMenu);
    this.shadowRoot.addEventListener("dragstart", (event) => event.preventDefault());
  }

  update(config = {}) {
    if (config.enabled === false) {
      this.remove();
      return;
    }
    if (config.auto !== undefined) this._auto = config.auto !== false;
    if (config.source) this._source = String(config.source);
    if (config.entity) {
      this._preferred = config.entity;
      if (!this._entity || !this._auto) this._entity = config.entity;
    }
    // 卡片提供的歌词只在实体对得上时采用；自动跟随切到别的播放器后，
    // 旧卡片的歌词不能覆盖当前播放器。
    if (
      Array.isArray(config.lines) &&
      (!this._auto || !config.entity || config.entity === this._entity)
    ) {
      this._setLines(config.lines, config.trackKey, config.status, config.plain);
    }
    if (config.status && (!config.entity || config.entity === this._entity)) {
      this._status = config.status;
    }
    if (config.offset !== undefined) this._offset = Number(config.offset) || 0;
    if (config.hass?.states) this._hass = config.hass;
    const theme = normalizeTheme(config.theme);
    if (theme !== this._theme) {
      this._theme = theme;
      this._applyTheme();
    }
    this._applyTheme();
    this._sync();
    if (!this._dragging) this._applyPosition();
  }

  _setLines(lines, key, status, plain) {
    if (Array.isArray(lines)) this._lines = lines;
    if (Array.isArray(plain)) this._plain = plain;
    if (key !== undefined) this._linesKey = String(key || "");
    if (status) this._status = status;
  }

  connectedCallback() {
    window.addEventListener("resize", this._onResize);
    this._startPolling();
    this._applyTheme();
    this._sync();
    window.requestAnimationFrame(() => this._applyPosition());
  }

  disconnectedCallback() {
    window.removeEventListener("resize", this._onResize);
    if (this._poll) clearInterval(this._poll);
    this._poll = null;
  }

  _startPolling() {
    if (this._poll) return;
    this._poll = window.setInterval(() => this._sync(), 500);
  }

  _applyTheme() {
    const key = normalizeTheme(this._theme);
    const theme = THEMES[key] || THEMES[DEFAULT_THEME];
    this._theme = key;
    this.style.setProperty("--hm-accent", theme.accent[0]);
    this.style.setProperty("--hm-accent-2", theme.accent[1]);
    this.style.setProperty("--hm-accent-rgb", colorTriplet(theme.accent[0], "46,230,197"));
    this.style.setProperty("--hm-accent-2-rgb", colorTriplet(theme.accent[1], "123,92,255"));
    this.style.setProperty("--hm-base-rgb", colorTriplet(theme.base, "5,10,18"));
    this.style.setProperty("--hm-glow", String(theme.glow ?? 1));
    this._pill.dataset.theme = key;
  }

  _sync() {
    if (!this._pill) return;
    const hass = resolveHass() || this._hass;
    if (hass?.states) this._hass = hass;
    const preferred = this._preferred || this._entity;
    if (this._auto) {
      const active = pickGlobalLyricsEntity(hass, preferred);
      if (active && active !== this._entity) this._selectEntity(active);
    }
    if (!this._entity) {
      this._setText("");
      return;
    }
    const state = this._hass?.states?.[this._entity];
    if (!state) {
      this._setText("");
      return;
    }
    const attrs = state.attributes || {};
    const key = globalTrackKey(this._entity, state);
    if (
      key !== this._linesKey &&
      (this._status !== "loading" || key !== this._requestKey)
    ) {
      this._ensureLyrics(state, key);
    }
    const stamp = attrs.media_position_updated_at || "";
    const base = Number(attrs.media_position) || 0;
    const now = Date.now();
    const anchor = stamp ? positionAnchor(stamp, now) : now;
    if (
      !this._clock ||
      this._clock.key !== key ||
      this._clock.state !== state.state ||
      this._clock.stamp !== stamp
    ) {
      this._clock = { key, state: state.state, stamp, base, at: anchor };
    }
    let position = this._clock.base;
    if (state.state === "playing") position += Math.max(0, now - this._clock.at) / 1000;
    const duration = Number(attrs.media_duration) || 0;
    if (duration > 0) position = Math.min(duration, Math.max(0, position));
    position += this._offset;

    let line = "";
    if (this._linesKey && key === this._linesKey) {
      if (this._lines.length) {
        const index = lyricIndex(this._lines, position);
        line = this._lines[Math.max(0, index)]?.text || "";
      } else if (this._plain.length) {
        // 纯文本歌词没有时间轴，至少显示首句，避免全局歌词窗空白。
        line = this._plain[0] || "";
      }
    }
    this._setText(line);
  }

  _selectEntity(entityId) {
    if (!entityId || entityId === this._entity) return;
    this._abortRequest();
    this._entity = entityId;
    this._lines = [];
    this._plain = [];
    this._linesKey = "";
    this._requestKey = "";
    this._status = "idle";
    this._clock = null;
  }

  _abortRequest() {
    if (this._requestController) this._requestController.abort();
    this._requestController = null;
  }

  _ensureLyrics(state, key) {
    if (!state || this._requestKey === key && this._status === "loading") return;
    this._abortRequest();
    this._requestKey = key;
    this._status = "loading";
    this._lines = [];
    this._plain = [];
    this._linesKey = "";
    const entityId = this._entity;
    const controller = new AbortController();
    this._requestController = controller;
    fetchGlobalLyrics(state, {
      hass: this._hass,
      source: this._source,
      signal: controller.signal,
    })
      .then((result) => {
        if (controller.signal.aborted || this._entity !== entityId || this._requestKey !== key) {
          return;
        }
        // 卡片已经为同一首曲目提供了歌词时，不用全局兜底结果覆盖它。
        if (this._linesKey === key && (this._lines.length || this._plain.length)) return;
        this._lines = Array.isArray(result.lines) ? result.lines : [];
        this._plain = Array.isArray(result.plain) ? result.plain : [];
        this._linesKey = key;
        this._status = result.status || "none";
        this._source = result.source || this._source;
        this._sync();
      })
      .catch(() => {
        if (controller.signal.aborted || this._entity !== entityId || this._requestKey !== key) {
          return;
        }
        this._lines = [];
        this._plain = [];
        this._linesKey = key;
        this._status = "error";
        this._sync();
      })
      .finally(() => {
        if (this._requestController === controller) this._requestController = null;
      });
  }

  _setText(text) {
    const value = String(text || "").trim();
    if (!this._pill) return;
    const empty = !value;
    this._pill.dataset.empty = empty ? "true" : "false";
    if (this._text.textContent !== value) {
      this._text.textContent = value;
      if (!empty && !this._dragging) {
        window.requestAnimationFrame(() => this._applyPosition());
      }
    }
  }

  _applyPosition() {
    if (!this._pill?.isConnected || this._dragging) return;
    const rect = this._pill.getBoundingClientRect();
    const width = rect.width || 240;
    const height = rect.height || 42;
    const positions = loadPositions();
    // 兼容早期误存成顶层 { x, y } 的格式。
    const pos =
      positions.lyric && Number.isFinite(positions.lyric.x) && Number.isFinite(positions.lyric.y)
        ? positions.lyric
        : Number.isFinite(positions.x) && Number.isFinite(positions.y)
          ? positions
          : null;
    const vw = window.innerWidth || 1;
    const vh = window.innerHeight || 1;
    const topbar = findTopBarRect();
    let defaultX;
    let defaultY;
    if (topbar) {
      const addRect = findTopBarAddRect(topbar);
      defaultX = addRect
        ? addRect.left - width - 8
        : topbar.left + (topbar.width - width) / 2;
      defaultY = topbar.top + (topbar.height - height) / 2;
    } else {
      defaultX = vw - width - 16;
      defaultY = 16;
    }
    let x;
    let y;
    if (pos && Number.isFinite(pos.x) && Number.isFinite(pos.y)) {
      x = clamp(pos.x * vw, 8, Math.max(8, vw - width - 8));
      y = clamp(pos.y * vh, 8, Math.max(8, vh - height - 8));
    } else if (topbar) {
      x = clamp(defaultX, topbar.left + 8, Math.max(topbar.left + 8, topbar.right - width - 8));
      y = clamp(defaultY, topbar.top + 2, Math.max(topbar.top + 2, topbar.bottom - height - 2));
    } else {
      x = clamp(defaultX, 8, Math.max(8, vw - width - 8));
      y = 16;
    }
    this._pill.style.left = `${Math.round(x)}px`;
    this._pill.style.top = `${Math.round(y)}px`;
  }

  _savePosition() {
    if (!this._pill) return;
    const rect = this._pill.getBoundingClientRect();
    savePosition(
      rect.left / Math.max(1, window.innerWidth),
      rect.top / Math.max(1, window.innerHeight)
    );
  }

  _handlePointerDown(event) {
    if (!this._pill || event.button !== 0 || event.isPrimary === false) return;
    this._clearPress();
    this._press = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      long: false,
      moved: false,
    };
    this._dragging = false;
    this._pressTimer = window.setTimeout(() => {
      this._pressTimer = null;
      if (this._press) this._beginDrag();
    }, HOLD_MS);
  }

  _beginDrag() {
    if (!this._press || !this._pill) return;
    this._press.long = true;
    this._dragging = true;
    const rect = this._pill.getBoundingClientRect();
    this._drag = {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      x: this._press.x,
      y: this._press.y,
    };
    this._pill.dataset.dragging = "true";
    this._pill.style.left = `${rect.left}px`;
    this._pill.style.top = `${rect.top}px`;
    try {
      this._pill.setPointerCapture(this._press.pointerId);
    } catch {
      /* ignore */
    }
  }

  _handlePointerMove(event) {
    if (!this._press) return;
    const dx = event.clientX - this._press.x;
    const dy = event.clientY - this._press.y;
    if (!this._dragging) {
      if (Math.hypot(dx, dy) > 8) {
        this._press.moved = true;
        this._clearPress();
      }
      return;
    }
    event.preventDefault();
    const vw = window.innerWidth || 1;
    const vh = window.innerHeight || 1;
    const x = clamp(this._drag.left + dx, 8, Math.max(8, vw - this._drag.width - 8));
    const y = clamp(this._drag.top + dy, 8, Math.max(8, vh - this._drag.height - 8));
    this._pill.style.left = `${Math.round(x)}px`;
    this._pill.style.top = `${Math.round(y)}px`;
  }

  _handlePointerUp() {
    if (!this._press) return;
    if (this._pressTimer) {
      clearTimeout(this._pressTimer);
      this._pressTimer = null;
    }
    if (this._dragging) {
      this._savePosition();
      this._releasePointer();
    }
    this._dragging = false;
    this._press = null;
    if (this._pill) delete this._pill.dataset.dragging;
  }

  _handlePointerCancel() {
    this._releasePointer();
    this._clearPress();
    this._dragging = false;
    if (this._pill) delete this._pill.dataset.dragging;
  }

  _clearPress() {
    if (this._pressTimer) {
      clearTimeout(this._pressTimer);
      this._pressTimer = null;
    }
    this._press = null;
  }

  _releasePointer() {
    const id = this._press?.pointerId;
    if (id === undefined || !this._pill) return;
    try {
      this._pill.releasePointerCapture(id);
    } catch {
      /* ignore */
    }
  }
}

if (typeof customElements !== "undefined" && !customElements.get("ha-music-lyric")) {
  customElements.define("ha-music-lyric", HaMusicLyric);
}
