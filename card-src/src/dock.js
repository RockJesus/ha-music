// 全局迷你播放器：顶部 / 侧边栏 / 右下角三种位置，直接控制当前播放器。
// 通过卡片传入 hass 与当前实体；也支持模块 URL 的 dock=top|sidebar|fab + dock_entity。
import { syncCoverSpin } from "./cover-spin.js";

const PREF_KEY = "haMusicMiniPlayer";
const POS_KEY = "haMusicMiniPositions";
const MODES = new Set(["top", "sidebar", "fab"]);

function loadDockPositions() {
  try {
    const raw = window.localStorage.getItem(POS_KEY);
    if (!raw) return {};
    const value = JSON.parse(raw);
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  } catch {
    return {};
  }
}

function saveDockPosition(mode, x, y) {
  if (!MODES.has(mode)) return;
  try {
    const positions = loadDockPositions();
    positions[mode] = { x: Number(x.toFixed(4)), y: Number(y.toFixed(4)) };
    window.localStorage.setItem(POS_KEY, JSON.stringify(positions));
  } catch {
    /* localStorage 不可用时只影响跨页面位置记忆 */
  }
}

const NOTE_ICON = `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path d="M14.5 5.2l4.6-1v9.1a3 3 0 1 1-1.8-2.7V7.1l-2.8.6v7.7a3 3 0 1 1-1.8-2.7V5.2z" fill="currentColor"/></svg>`;
const PREV_ICON = `<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" fill="currentColor"/></svg>`;
const NEXT_ICON = `<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="M16 6h2v12h-2zM6 6l8.5 6L6 18z" fill="currentColor"/></svg>`;
const PLAY_ICON = `<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>`;
const PAUSE_ICON = `<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M6 5h4v14H6zM14 5h4v14h-4z" fill="currentColor"/></svg>`;
const UP_ICON = `<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" focusable="false"><path d="M6.7 14.7L12 9.4l5.3 5.3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const DOWN_ICON = `<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" focusable="false"><path d="M6.7 9.3L12 14.6l5.3-5.3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

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
    user-select: none;
    -webkit-user-select: none;
    touch-action: none;
    cursor: grab;
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
    border-radius: 50%;
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
    transform-origin: 50% 50%;
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
    width: 32px;
    height: 32px;
    border-radius: 10px;
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
  /* 右下角悬浮播放器：参考站内左下角 APlayer 的圆盘 + 玻璃面板 */
  .mini[data-mode="fab"] {
    right: max(18px, env(safe-area-inset-right, 0px));
    bottom: calc(env(safe-area-inset-bottom, 0px) + 18px);
    width: 64px;
    height: 64px;
    padding: 0;
    gap: 0;
    border: 0;
    border-radius: 50%;
    background: transparent;
    box-shadow: none;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    overflow: visible;
    isolation: isolate;
    transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1), height 0.3s cubic-bezier(0.22, 1, 0.36, 1), padding 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-radius 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  }
  .mini[data-mode="fab"][data-open="true"] {
    width: min(356px, calc(100vw - 32px));
    height: auto;
    padding: 10px 12px;
    gap: 12px;
    align-items: center;
    border: 1px solid rgba(139, 92, 246, 0.36);
    border-radius: 18px;
    background:
      linear-gradient(104deg, rgba(7, 10, 20, 0.6) 0%, rgba(10, 14, 28, 0.5) 48%, rgba(22, 12, 40, 0.46) 100%),
      rgba(8, 11, 21, 0.66);
    box-shadow:
      0 16px 40px rgba(2, 6, 18, 0.62),
      0 0 0 1px rgba(255, 255, 255, 0.04) inset,
      0 0 28px rgba(139, 92, 246, 0.2);
    backdrop-filter: blur(26px) saturate(165%);
    -webkit-backdrop-filter: blur(26px) saturate(165%);
    overflow: hidden;
  }
  .mini[data-mode="fab"][data-open="true"]::before {
    content: "";
    position: absolute;
    inset: -12%;
    z-index: -1;
    border-radius: inherit;
    background-image: var(--fab-cover, none);
    background-size: cover;
    background-position: center;
    filter: blur(22px) saturate(160%);
    opacity: 0.35;
    transform: scale(1.06);
    pointer-events: none;
  }
  .fab-orb {
    position: relative;
    z-index: 2;
    flex: 0 0 auto;
    width: 64px;
    height: 64px;
    transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1), height 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .mini[data-mode="fab"][data-open="true"] .fab-orb {
    width: 52px;
    height: 52px;
  }
  .fab-disc {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: rgba(20, 26, 44, 0.9);
    color: var(--hm-accent);
    cursor: pointer;
    overflow: visible;
    -webkit-tap-highlight-color: transparent;
  }
  .fab-disc .art {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 10px 26px rgba(2, 6, 18, 0.48), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
    background: linear-gradient(135deg, rgba(46, 230, 197, 0.2), rgba(123, 92, 255, 0.26));
  }
  .fab-disc .art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    display: none;
  }
  .fab-disc .art img[src] { display: block; }
  .fab-disc .art .fallback { display: grid; place-items: center; }
  .fab-glow {
    position: absolute;
    inset: -5px;
    z-index: -1;
    border-radius: 50%;
    background: conic-gradient(from 30deg, rgba(46, 230, 197, 0.85), rgba(123, 92, 255, 0.9), rgba(236, 72, 153, 0.55), rgba(46, 230, 197, 0.85));
    filter: blur(9px);
    opacity: 0.72;
    animation: fabRingSpin 9s linear infinite;
    pointer-events: none;
  }
  .mini[data-mode="fab"][data-open="true"] .fab-glow {
    opacity: 0.42;
    animation-duration: 16s;
  }
  .fab-disc:hover .fab-glow { opacity: 0.95; }
  .fab-disc:active { transform: scale(0.96); }
  .fab-disc:focus-visible {
    outline: 2px solid rgba(46, 230, 197, 0.8);
    outline-offset: 4px;
  }
  .fab-quick {
    position: absolute;
    right: -2px;
    bottom: -2px;
    z-index: 5;
    width: 24px;
    height: 24px;
    margin: 0;
    padding: 0;
    border: 1px solid rgba(180, 160, 255, 0.5);
    border-radius: 7px;
    display: grid;
    place-items: center;
    background: rgba(7, 10, 20, 0.78);
    color: #d8ccff;
    box-shadow: 0 4px 12px rgba(2, 6, 18, 0.46);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .fab-quick:hover { background: rgba(123, 92, 255, 0.42); color: #fff; }
  .fab-quick:active { transform: scale(0.92); }
  .fab-quick:focus-visible { outline: 2px solid rgba(46, 230, 197, 0.8); outline-offset: 2px; }
  .fab-quick[disabled] { opacity: 0.42; cursor: default; }
  .mini[data-mode="fab"][data-open="true"] .fab-quick { display: none; }
  .fab-panel {
    display: none;
    min-width: 0;
    flex: 1 1 auto;
    flex-direction: column;
    gap: 7px;
  }
  .mini[data-mode="fab"][data-open="true"] .fab-panel { display: flex; }
  .fab-head {
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }
  .fab-head .meta { flex: 1 1 auto; }
  .fab-collapse {
    flex: 0 0 auto;
    width: 24px;
    height: 24px;
    margin: 0;
    padding: 0;
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 7px;
    display: grid;
    place-items: center;
    background: rgba(255, 255, 255, 0.05);
    color: #9fb3c8;
    cursor: pointer;
  }
  .fab-collapse:hover { color: var(--hm-accent); background: rgba(46, 230, 197, 0.12); }
  .fab-panel .progress {
    position: relative;
    left: auto;
    right: auto;
    bottom: auto;
    height: 3px;
    margin: 0;
    overflow: visible;
    background: rgba(255, 255, 255, 0.14);
  }
  .fab-panel .progress span { box-shadow: 0 0 8px rgba(46, 230, 197, 0.55); }
  .fab-panel .controls { gap: 3px; }
  .fab-panel .controls .toggle { width: 32px; height: 32px; border-radius: 9px; }
  .fab-panel .title { font-size: 13px; }
  .fab-panel .sub { font-size: 10.5px; }
  .mini[data-dragging="true"] {
    transition: none;
    cursor: grabbing;
  }
  .mini[data-dragging="true"] * { cursor: grabbing; }
  /* 顶部 / 侧边栏双击折叠成小圆盘，再次双击展开 */
  .mini[data-mode][data-folded="true"] {
    width: 56px !important;
    height: 56px;
    padding: 4px;
    gap: 0;
    border-radius: 50%;
    justify-content: center;
  }
  .mini[data-mode][data-folded="true"] .meta,
  .mini[data-mode][data-folded="true"] .controls,
  .mini[data-mode][data-folded="true"] .progress { display: none; }
  .mini[data-mode][data-folded="true"] .art {
    width: 46px;
    height: 46px;
    border-radius: 50%;
  }
  @keyframes fabRingSpin {
    to { transform: rotate(1turn); }
  }
  @media (prefers-reduced-motion: reduce) {
    .mini, .controls button, .progress span { transition: none; }
  }
`;

export function normalizeDockModes(value) {
  if (value === true || value === "1") return ["top"];
  if (Array.isArray(value)) {
    return [...new Set(value.map((item) => String(item)).filter((item) => MODES.has(item)))];
  }
  if (typeof value !== "string" || !value || value === "none") return [];
  if (value.includes(",")) {
    return [...new Set(value.split(",").map((item) => item.trim()).filter((item) => MODES.has(item)))];
  }
  return MODES.has(value) ? [value] : [];
}

function normalizeMode(value) {
  return normalizeDockModes(value)[0] || "none";
}

function normalizeEntity(value) {
  return typeof value === "string" && value.startsWith("media_player.") ? value : "";
}

export function normalizeDockEntities(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const out = {};
  for (const mode of MODES) {
    const entity = normalizeEntity(value[mode]);
    if (entity) out[mode] = entity;
  }
  return out;
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
    const modes = normalizeDockModes(pref?.modes ?? pref?.mode);
    const entities = normalizeDockEntities(pref?.entities);
    const legacyEntity = normalizeEntity(pref?.entity);
    if (legacyEntity && modes[0] && !entities[modes[0]]) entities[modes[0]] = legacyEntity;
    const cleanModes = modes.filter((mode) => entities[mode]);
    if (!cleanModes.length) return null;
    return { modes: cleanModes, entities };
  } catch {
    return null;
  }
}

export function saveDockPref(input = {}) {
  try {
    const modes = normalizeDockModes(input.modes ?? input.mode);
    const entities = normalizeDockEntities(input.entities);
    const legacyEntity = normalizeEntity(input.entity);
    if (legacyEntity && modes[0] && !entities[modes[0]]) entities[modes[0]] = legacyEntity;
    const cleanModes = modes.filter((mode) => entities[mode]);
    if (!cleanModes.length) {
      window.localStorage.removeItem(PREF_KEY);
      return;
    }
    const next = JSON.stringify({ modes: cleanModes, entities });
    const current = window.localStorage.getItem(PREF_KEY);
    if (current === next) return;
    window.localStorage.setItem(PREF_KEY, next);
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

export function uninstallDock(mode) {
  if (typeof document === "undefined") return;
  const docks = window.__haMusicDocks;
  if (docks && typeof docks.get === "function") {
    if (mode) {
      const node = docks.get(mode);
      node?.remove();
      docks.delete(mode);
    } else {
      for (const node of docks.values()) node.remove();
      docks.clear();
    }
    window.__haMusicDock = docks.values().next().value || null;
    return;
  }
  window.__haMusicDock?.remove();
  window.__haMusicDock = null;
}

export function installDocks(inputs = []) {
  if (typeof window === "undefined" || typeof document === "undefined") return [];
  const configs = [];
  for (const input of Array.isArray(inputs) ? inputs : [inputs]) {
    const mode = normalizeMode(input?.mode);
    const entity = normalizeEntity(input?.entity);
    if (mode === "none" || !entity) continue;
    configs.push({ mode, entity, hass: input?.hass || null });
  }
  if (!configs.length) {
    uninstallDock();
    return [];
  }
  if (!document.body) {
    document.addEventListener("DOMContentLoaded", () => installDocks(configs), { once: true });
    return [];
  }
  const docks = window.__haMusicDocks instanceof Map ? window.__haMusicDocks : new Map();
  const desired = new Map(configs.map((config) => [config.mode, config]));
  for (const [mode, node] of docks) {
    if (!desired.has(mode)) {
      node.remove();
      docks.delete(mode);
    }
  }
  for (const [mode, config] of desired) {
    let node = docks.get(mode);
    if (!node) {
      node = document.createElement("ha-music-mini");
      node.update(config);
      document.body.appendChild(node);
      docks.set(mode, node);
    } else {
      node.update(config);
    }
  }
  window.__haMusicDocks = docks;
  window.__haMusicDock = docks.values().next().value || null;
  return [...docks.values()];
}

export function installDock(options = {}) {
  return installDocks([options])[0] || null;
}

class HaMusicMini extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._mode = "top";
    this._open = false;
    this._folded = false;
    this._entity = "";
    this._hass = null;
    this._poll = null;
    this._press = null;
    this._pressTimer = null;
    this._drag = null;
    this._dragging = false;
    this._suppressClick = false;
    this._clickTimer = null;
    this._onClick = (event) => this._handleClick(event);
    this._onRoute = () => this._sync();
    this._onPointerDown = (event) => this._handlePointerDown(event);
    this._onPointerMove = (event) => this._handlePointerMove(event);
    this._onPointerUp = (event) => this._handlePointerUp(event);
    this._onPointerCancel = (event) => this._handlePointerCancel(event);
    this._onContextMenu = (event) => this._handleContextMenu(event);
    this._onResize = () => this._applySavedPosition();
    this._sync = this._sync.bind(this);
  }

  update(config = {}) {
    const mode = normalizeMode(config.mode);
    const entity = normalizeEntity(config.entity);
    const changedMode = mode !== this._mode;
    this._mode = mode;
    if (changedMode) {
      this._open = false;
      this._folded = false;
    }
    this._entity = entity;
    if (config.hass?.states) this._hass = config.hass;
    if (!this.shadowRoot.childElementCount || changedMode) this._render();
    this._sync();
    this._applySavedPosition();
  }

  connectedCallback() {
    if (!this.shadowRoot.childElementCount) this._render();
    this.shadowRoot.addEventListener("click", this._onClick);
    this.shadowRoot.addEventListener("pointerdown", this._onPointerDown);
    this.shadowRoot.addEventListener("pointermove", this._onPointerMove);
    this.shadowRoot.addEventListener("pointerup", this._onPointerUp);
    this.shadowRoot.addEventListener("pointercancel", this._onPointerCancel);
    this.shadowRoot.addEventListener("contextmenu", this._onContextMenu);
    window.addEventListener("resize", this._onResize);
    window.addEventListener("location-changed", this._onRoute);
    this._startPolling();
    this._sync();
    window.requestAnimationFrame(() => this._applySavedPosition());
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener("click", this._onClick);
    this.shadowRoot.removeEventListener("pointerdown", this._onPointerDown);
    this.shadowRoot.removeEventListener("pointermove", this._onPointerMove);
    this.shadowRoot.removeEventListener("pointerup", this._onPointerUp);
    this.shadowRoot.removeEventListener("pointercancel", this._onPointerCancel);
    this.shadowRoot.removeEventListener("contextmenu", this._onContextMenu);
    window.removeEventListener("resize", this._onResize);
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
    if (this._mode === "fab") return this._renderFab();
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
    this._disc = null;
    this._quick = null;
    this._art.addEventListener("error", () => {
      this._art.removeAttribute("src");
      this._fallback.style.display = "grid";
    });
  }

  _renderFab() {
    this.shadowRoot.innerHTML = `
      <style>${STYLE}</style>
      <div class="mini mini-fab" data-mode="fab" data-open="${this._open ? "true" : "false"}" role="region" aria-label="HA Music 悬浮播放器">
        <div class="fab-orb">
          <button class="fab-disc" type="button" aria-label="展开播放器" aria-expanded="${this._open ? "true" : "false"}">
            <div class="art">
              <img alt="" />
              <span class="fallback">${NOTE_ICON}</span>
            </div>
            <span class="fab-glow"></span>
          </button>
          <button class="fab-quick" data-act="toggle" type="button" aria-label="播放">${PLAY_ICON}</button>
        </div>
        <div class="fab-panel">
          <div class="fab-head">
            <div class="meta">
              <div class="title">选择播放器</div>
              <div class="sub">在卡片编辑器中选择位置</div>
            </div>
            <button class="fab-collapse" data-act="collapse" type="button" aria-label="收起播放器">${DOWN_ICON}</button>
          </div>
          <div class="progress"><span></span></div>
          <div class="controls">
            <button data-act="prev" type="button" aria-label="上一首">${PREV_ICON}</button>
            <button class="toggle" data-act="toggle" type="button" aria-label="播放">${PLAY_ICON}</button>
            <button data-act="next" type="button" aria-label="下一首">${NEXT_ICON}</button>
          </div>
        </div>
      </div>
    `;
    this._mini = this.shadowRoot.querySelector(".mini");
    this._art = this.shadowRoot.querySelector(".art img");
    this._fallback = this.shadowRoot.querySelector(".fallback");
    this._title = this.shadowRoot.querySelector(".title");
    this._sub = this.shadowRoot.querySelector(".sub");
    this._toggle = this.shadowRoot.querySelector(".fab-panel .toggle");
    this._prev = this.shadowRoot.querySelector('.fab-panel [data-act="prev"]');
    this._next = this.shadowRoot.querySelector('.fab-panel [data-act="next"]');
    this._progress = this.shadowRoot.querySelector(".fab-panel .progress span");
    this._disc = this.shadowRoot.querySelector(".fab-disc");
    this._quick = this.shadowRoot.querySelector(".fab-quick");
    this._collapse = this.shadowRoot.querySelector(".fab-collapse");
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

  _applySavedPosition() {
    if (!this._mini || !this._mini.isConnected) return;
    const positions = loadDockPositions();
    const pos = positions[this._mode];
    if (!pos || typeof pos.x !== "number" || typeof pos.y !== "number") return;
    const rect = this._mini.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const margin = 8;
    const maxX = Math.max(margin, window.innerWidth - rect.width - margin);
    const maxY = Math.max(margin, window.innerHeight - rect.height - margin);
    const x = Math.max(margin, Math.min(maxX, pos.x * window.innerWidth));
    const y = Math.max(margin, Math.min(maxY, pos.y * window.innerHeight));
    this._mini.style.left = `${Math.round(x)}px`;
    this._mini.style.top = `${Math.round(y)}px`;
    this._mini.style.right = "auto";
    this._mini.style.bottom = "auto";
  }

  _saveCurrentPosition() {
    if (!this._mini) return;
    const rect = this._mini.getBoundingClientRect();
    saveDockPosition(
      this._mode,
      Math.max(0, Math.min(1, rect.left / window.innerWidth)),
      Math.max(0, Math.min(1, rect.top / window.innerHeight)),
    );
  }

  _handlePointerDown(event) {
    if (!this._mini || event.button !== 0 || event.isPrimary === false) return;
    this._clearPress();
    this._press = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      long: false,
      moved: false,
    };
    this._dragging = false;
    this._suppressClick = false;
    this._pressTimer = window.setTimeout(() => {
      this._pressTimer = null;
      if (this._press) this._beginDrag();
    }, 360);
  }

  _beginDrag() {
    if (!this._press || !this._mini) return;
    this._press.long = true;
    this._dragging = true;
    const rect = this._mini.getBoundingClientRect();
    this._drag = {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      x: this._press.x,
      y: this._press.y,
    };
    this._mini.dataset.dragging = "true";
    this._mini.style.left = `${rect.left}px`;
    this._mini.style.top = `${rect.top}px`;
    this._mini.style.right = "auto";
    this._mini.style.bottom = "auto";
    try {
      this._mini.setPointerCapture(this._press.pointerId);
    } catch {
      /* 某些浏览器不支持指针捕获 */
    }
  }

  _handlePointerMove(event) {
    if (!this._press) return;
    const dx = event.clientX - this._press.x;
    const dy = event.clientY - this._press.y;
    if (!this._dragging) {
      if (Math.hypot(dx, dy) > 8) {
        this._press.moved = true;
        if (this._pressTimer) {
          window.clearTimeout(this._pressTimer);
          this._pressTimer = null;
        }
      }
      return;
    }
    event.preventDefault();
    const margin = 8;
    const maxX = Math.max(margin, window.innerWidth - this._drag.width - margin);
    const maxY = Math.max(margin, window.innerHeight - this._drag.height - margin);
    const x = Math.max(margin, Math.min(maxX, this._drag.left + dx));
    const y = Math.max(margin, Math.min(maxY, this._drag.top + dy));
    this._mini.style.left = `${Math.round(x)}px`;
    this._mini.style.top = `${Math.round(y)}px`;
  }

  _handlePointerUp() {
    if (!this._press) return;
    const long = this._press.long;
    const moved = this._press.moved;
    if (this._pressTimer) {
      window.clearTimeout(this._pressTimer);
      this._pressTimer = null;
    }
    if (this._dragging) {
      this._saveCurrentPosition();
      this._releasePointer();
    }
    if (this._dragging || long || moved) {
      this._suppressClick = true;
      window.setTimeout(() => {
        this._suppressClick = false;
      }, 560);
    }
    this._dragging = false;
    this._press = null;
    if (this._mini) delete this._mini.dataset.dragging;
  }

  _handlePointerCancel() {
    this._releasePointer();
    this._clearPress();
    this._dragging = false;
    if (this._mini) delete this._mini.dataset.dragging;
  }

  _clearPress() {
    if (this._pressTimer) {
      window.clearTimeout(this._pressTimer);
      this._pressTimer = null;
    }
    this._press = null;
  }

  _releasePointer() {
    const pointerId = this._press?.pointerId;
    if (pointerId === undefined || !this._mini) return;
    try {
      this._mini.releasePointerCapture(pointerId);
    } catch {
      /* ignore */
    }
  }

  _handleContextMenu(event) {
    if (this._press || this._dragging) event.preventDefault();
  }

  _sync() {
    if (!this._mini) return;
    this._mini.dataset.mode = this._mode;
    this._mini.dataset.folded = this._mode !== "fab" && this._folded ? "true" : "false";
    if (this._mode === "fab") this._mini.dataset.open = this._open ? "true" : "false";
    if (!this._entity) {
      this._title.textContent = "选择播放器";
      this._sub.textContent = "在卡片编辑器中选择位置";
      this._setDisabled(true);
      this._progress.style.width = "0%";
      this._setArt(null);
      syncCoverSpin(this._art, false);
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
      syncCoverSpin(this._art, false);
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
    const icon = playing ? PAUSE_ICON : PLAY_ICON;
    this._toggle.innerHTML = icon;
    this._toggle.setAttribute("aria-label", playing ? "暂停" : "播放");
    if (this._quick) {
      this._quick.innerHTML = icon;
      this._quick.setAttribute("aria-label", playing ? "暂停" : "播放");
    }
    if (this._disc) {
      this._disc.setAttribute("aria-label", this._open ? "收起播放器" : "展开播放器");
      this._disc.setAttribute("aria-expanded", this._open ? "true" : "false");
    }
    if (this._collapse) this._collapse.innerHTML = DOWN_ICON;
    this._setArt(a.entity_picture);
    syncCoverSpin(this._art, playing);
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
        this._mini?.style.setProperty("--fab-cover", `url(${JSON.stringify(resolved)})`);
      } catch {
        this._art.removeAttribute("src");
        this._fallback.style.display = "grid";
        this._mini?.style.removeProperty("--fab-cover");
      }
    } else {
      this._art.removeAttribute("src");
      this._fallback.style.display = "grid";
      this._mini?.style.removeProperty("--fab-cover");
    }
  }

  _setDisabled(disabled) {
    for (const button of [this._prev, this._toggle, this._next, this._quick]) {
      if (button) button.disabled = disabled;
    }
  }

  _toggleOpen() {
    if (this._mode !== "fab" || !this._mini) return;
    this._open = !this._open;
    this._mini.dataset.open = this._open ? "true" : "false";
    if (this._disc) {
      this._disc.setAttribute("aria-label", this._open ? "收起播放器" : "展开播放器");
      this._disc.setAttribute("aria-expanded", this._open ? "true" : "false");
    }
    window.setTimeout(() => this._applySavedPosition(), 340);
  }

  _toggleFold() {
    if (this._mode === "fab") {
      this._toggleOpen();
      return;
    }
    this._folded = !this._folded;
    this._sync();
    window.setTimeout(() => this._applySavedPosition(), 340);
  }

  _handleClick(event) {
    const button = event.target.closest?.("button[data-act]");
    if (button) {
      if (button.disabled) return;
      event.preventDefault();
      event.stopPropagation();
      const act = button.dataset.act;
      if (act === "collapse") this._toggleOpen();
      else if (act === "toggle") this._call("media_play_pause");
      else if (act === "prev") this._call("media_previous_track");
      else if (act === "next") this._call("media_next_track");
      return;
    }
    if (this._suppressClick) {
      this._suppressClick = false;
      return;
    }
    event.preventDefault();
    if (this._clickTimer) {
      window.clearTimeout(this._clickTimer);
      this._clickTimer = null;
      this._toggleFold();
      return;
    }
    this._clickTimer = window.setTimeout(() => {
      this._clickTimer = null;
      this._call("media_play_pause");
    }, 280);
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
