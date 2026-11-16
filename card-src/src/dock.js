// 全局迷你播放器：顶部 / 侧边栏 / 右下角三种位置，直接控制当前播放器。
// 通过卡片传入 hass 与当前实体；也支持模块 URL 的 dock=top|sidebar|fab + dock_entity。
import { syncCoverSpin } from "./cover-spin.js";
import { syncFabEq } from "./fab-eq.js";
import { THEMES, DEFAULT_THEME } from "./const.js";
import { colorTriplet } from "./util.js";

const PREF_KEY = "haMusicMiniPlayer";
const POS_KEY = "haMusicMiniPositions";
const MODES = new Set(["top", "sidebar", "fab"]);

export function normalizeTheme(value) {
  return typeof value === "string" && THEMES[value] ? value : DEFAULT_THEME;
}

export function normalizeDockThemes(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const out = {};
  for (const mode of MODES) {
    if (THEMES[value[mode]]) out[mode] = value[mode];
  }
  return out;
}

function applyMiniTheme(node, themeKey) {
  if (!node) return;
  const key = normalizeTheme(themeKey);
  const theme = THEMES[key];
  node.dataset.theme = key;
  node.style.setProperty("--hm-accent", theme.accent[0]);
  node.style.setProperty("--hm-accent-2", theme.accent[1]);
  node.style.setProperty("--hm-accent-rgb", colorTriplet(theme.accent[0], "46,230,197"));
  node.style.setProperty("--hm-accent-2-rgb", colorTriplet(theme.accent[1], "123,92,255"));
  node.style.setProperty("--hm-base-rgb", colorTriplet(theme.base, "5,10,18"));
  node.style.setProperty("--hm-glow", String(theme.glow ?? 1));
}

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


const TOP_BAR_TAGS = new Set(["HA-TOP-APP-BAR-FIXED", "HA-TOP-APP-BAR"]);
const SIDEBAR_TAGS = new Set(["HA-SIDEBAR", "ASIDE"]);

function isUsableRect(rect, minW = 1, minH = 1) {
  return Boolean(rect && rect.width >= minW && rect.height >= minH && rect.bottom > 0 && rect.right > 0);
}

function collectDeep(root, predicate, out, depth = 0) {
  if (!root || depth > 8) return;
  const nodes = root.querySelectorAll ? root.querySelectorAll("*") : [];
  for (const node of nodes) {
    try {
      if (predicate(node)) out.push(node);
    } catch {
      /* 忽略单个节点的异常 */
    }
    if (node.shadowRoot) collectDeep(node.shadowRoot, predicate, out, depth + 1);
  }
}

function deepMatches(predicate) {
  const out = [];
  collectDeep(document, predicate, out);
  return out;
}

function visibleTagRect(tags) {
  const found = deepMatches((node) => tags.has(node.tagName));
  let best = null;
  for (const node of found) {
    const rect = node.getBoundingClientRect();
    if (!isUsableRect(rect, 24, 24)) continue;
    if (!best || rect.width * rect.height > best.width * best.height) {
      best = { left: rect.left, top: rect.top, width: rect.width, height: rect.height, right: rect.right, bottom: rect.bottom };
    }
  }
  return best;
}

export function findTopBarRect() {
  // HA 新版顶栏是 ha-top-app-bar-fixed 内的 .top-app-bar；
  // 不能用 hui-root 的 .header，那是仪表盘视图标题栏，位置会偏到页面中部。
  const bars = deepMatches((node) => {
    if (node.tagName === "BODY" || node.tagName === "HTML") return false;
    const rect = node.getBoundingClientRect();
    if (!isUsableRect(rect, 200, 36) || rect.top > 8 || rect.height > 150) return false;
    return (
      node.classList?.contains("top-app-bar") ||
      node.classList?.contains("app-header") ||
      node.tagName === "HA-TOP-APP-BAR" ||
      node.tagName === "HA-TOP-APP-BAR-FIXED"
    );
  });
  let best = null;
  for (const node of bars) {
    const rect = node.getBoundingClientRect();
    // ha-top-app-bar-fixed 宿主本身是 100vh，优先取它内部的 .top-app-bar。
    if (rect.height > 150) continue;
    if (!best || rect.width * rect.height > best.width * best.height) {
      best = { left: rect.left, top: rect.top, width: rect.width, height: rect.height, right: rect.right, bottom: rect.bottom };
    }
  }
  if (best) return best;

  // 兼容旧版/自定义布局：找页面最顶部、高度接近导航栏的 header。
  const headers = deepMatches((node) => {
    if (node.tagName === "BODY" || node.tagName === "HTML") return false;
    const rect = node.getBoundingClientRect();
    if (!isUsableRect(rect, 240, 36) || rect.top > 8 || rect.height > 92) return false;
    const name = `${node.tagName} ${node.id} ${node.className || ""}`.toLowerCase();
    return /top-app-bar|app-header|navbar|\bheader\b/.test(name);
  });
  for (const node of headers) {
    const rect = node.getBoundingClientRect();
    if (rect.height <= 92) {
      return { left: rect.left, top: rect.top, width: rect.width, height: rect.height, right: rect.right, bottom: rect.bottom };
    }
  }
  return null;
}

export function findTopBarAddRect(bounds) {
  if (!bounds) return null;
  const found = deepMatches((node) => {
    if (node.tagName === "BODY" || node.tagName === "HTML") return false;
    if (typeof node.getBoundingClientRect !== "function") return false;
    const rect = node.getBoundingClientRect();
    if (!isUsableRect(rect, 16, 16) || rect.width > 88 || rect.height > 64) return false;
    if (rect.left < bounds.left - 2 || rect.right > bounds.right + 2) return false;
    if (rect.top < bounds.top - 4 || rect.bottom > bounds.bottom + 4) return false;
    const name = [
      node.getAttribute?.("aria-label"),
      node.getAttribute?.("title"),
      node.getAttribute?.("icon"),
      node.id,
      node.className,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    if (/remove|delete|close|unpin|关闭|删除/.test(name)) return false;
    return /(mdi:(plus|add)|plus|add|create|添加|新增|新建)/.test(name);
  });
  let best = null;
  for (const node of found) {
    const rect = node.getBoundingClientRect();
    const area = rect.width * rect.height;
    if (!best || area > best.area || (area === best.area && rect.right > best.rect.right)) {
      best = { rect, area };
    }
  }
  return best?.rect || null;
}

function findSidebarSettingsRect(bounds) {
  if (!bounds) return null;
  const found = deepMatches((node) => {
    if (node.tagName === "BODY" || node.tagName === "HTML") return false;
    if (typeof node.getBoundingClientRect !== "function") return false;
    const rect = node.getBoundingClientRect();
    if (!isUsableRect(rect, 16, 16) || rect.height > 72 || rect.width > bounds.width + 2) return false;
    if (rect.left < bounds.left - 2 || rect.right > bounds.right + 2) return false;
    if (rect.top < bounds.top || rect.bottom > bounds.bottom + 2) return false;
    if (rect.top < bounds.top + bounds.height * 0.45) return false;
    const name = [
      node.getAttribute?.("aria-label"),
      node.getAttribute?.("title"),
      node.getAttribute?.("icon"),
      node.id,
      node.className,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    if (/remove|delete|close|关闭|删除/.test(name)) return false;
    return /(settings|设置|cog|gear)/.test(name);
  });
  let best = null;
  for (const node of found) {
    const rect = node.getBoundingClientRect();
    if (!best || rect.top > best.top) best = { top: rect.top, rect };
  }
  return best?.rect || null;
}

function findSidebarRect() {
  const tagged = visibleTagRect(SIDEBAR_TAGS);
  if (tagged) return tagged;
  const found = deepMatches((node) => {
    if (node.tagName === "BODY" || node.tagName === "HTML") return false;
    const rect = node.getBoundingClientRect();
    if (!isUsableRect(rect, 40, 240) || rect.left > 8) return false;
    const name = `${node.tagName} ${node.id} ${node.className || ""}`.toLowerCase();
    return /sidebar|navigation|nav-drawer/.test(name);
  });
  let best = null;
  for (const node of found) {
    const rect = node.getBoundingClientRect();
    if (!best || rect.height > best.height) {
      best = { left: rect.left, top: rect.top, width: rect.width, height: rect.height, right: rect.right, bottom: rect.bottom };
    }
  }
  return best;
}

function findTopBarNode() {
  const bars = deepMatches((node) => {
    if (node.tagName === "BODY" || node.tagName === "HTML") return false;
    const rect = node.getBoundingClientRect();
    if (!isUsableRect(rect, 200, 36) || rect.top > 8 || rect.height > 150) return false;
    return (
      node.classList?.contains("top-app-bar") ||
      node.classList?.contains("app-header") ||
      node.tagName === "HA-TOP-APP-BAR" ||
      node.tagName === "HA-TOP-APP-BAR-FIXED"
    );
  });
  let best = null;
  for (const node of bars) {
    const rect = node.getBoundingClientRect();
    if (rect.height > 150) continue;
    if (!best || rect.width * rect.height > best.area) {
      best = { node, area: rect.width * rect.height };
    }
  }
  return best?.node || null;
}

function findSidebarNode() {
  const found = deepMatches((node) => SIDEBAR_TAGS.has(node.tagName));
  let best = null;
  for (const node of found) {
    const rect = node.getBoundingClientRect();
    if (!isUsableRect(rect, 24, 120)) continue;
    if (!best || rect.height > best.height) best = { node, height: rect.height };
  }
  return best?.node || null;
}

function getDockBounds(mode) {
  const vw = Math.round(window.innerWidth || 0);
  const vh = Math.round(window.innerHeight || 0);
  if (mode === "top") {
    const bar = findTopBarRect();
    const height = bar?.height || 56;
    const top = bar?.top || 0;
    return {
      left: bar?.left || 0,
      top,
      width: bar?.width || vw,
      height: Math.max(40, Math.min(72, height)),
      right: (bar?.left || 0) + (bar?.width || vw),
      bottom: top + Math.max(40, Math.min(72, height)),
    };
  }
  if (mode === "sidebar") {
    const side = findSidebarRect();
    if (side) return side;
    const top = findTopBarRect()?.height || 56;
    return { left: 0, top, width: 256, height: Math.max(240, vh - top), right: 256, bottom: vh };
  }
  return null;
}

const FAB_GAP = 12;

function getFabConstraints() {
  const vw = Math.round(window.innerWidth || 0);
  const vh = Math.round(window.innerHeight || 0);
  const bar = findTopBarRect();
  const side = findSidebarRect();
  const minX = side && side.height >= vh * 0.4 ? side.right + FAB_GAP : 0;
  const minY = bar && bar.width >= vw * 0.5 ? bar.bottom + FAB_GAP : 0;
  return { vw, vh, minX, minY };
}

function clampFabPosition(x, y, width, height, constraints = getFabConstraints()) {
  const { vw, vh, minX, minY } = constraints;
  const maxX = Math.max(minX, vw - width - FAB_GAP);
  const maxY = Math.max(minY, vh - height - FAB_GAP);
  return {
    x: clampNumber(x, minX, maxX),
    y: clampNumber(y, minY, maxY),
  };
}

function clampNumber(value, min, max) {
  if (max < min) return min;
  return Math.max(min, Math.min(max, value));
}

function dockMargin(mode) {
  if (mode === "top") return 8;
  if (mode === "sidebar") return 8;
  return 24;
}

const STYLE = `
  :host {
    position: fixed;
    inset: 0;
    z-index: 2147483000;
    pointer-events: none;
    --hm-accent: #2ee6c5;
    --hm-accent-2: #7b5cff;
    --hm-accent-rgb: 46,230,197;
    --hm-accent-2-rgb: 123,92,255;
    --hm-base-rgb: 5,10,18;
    --hm-glow: 1;
  }
  * { box-sizing: border-box; }
  .mini {
    pointer-events: auto;
    position: fixed;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 9px 9px;
    border: 1px solid rgba(var(--hm-accent-rgb), 0.3);
    border-radius: 16px;
    background:
      linear-gradient(135deg, rgba(var(--hm-accent-rgb), 0.14), rgba(var(--hm-accent-2-rgb), 0.14)),
      rgba(var(--hm-base-rgb), 0.82);
    box-shadow:
      0 14px 38px rgba(0, 0, 0, 0.4),
      0 0 20px -6px rgba(var(--hm-accent-rgb), 0.4);
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
    border-color: rgba(var(--hm-accent-rgb), 0.5);
    box-shadow:
      0 16px 40px rgba(0, 0, 0, 0.46),
      0 0 26px -6px rgba(var(--hm-accent-rgb), 0.5);
  }
  .mini[data-mode="top"] {
    top: 4px;
    left: 8px;
    right: auto;
    height: 44px;
    padding: 4px 7px;
    gap: 6px;
    border-radius: 11px;
    overflow: hidden;
  }
  .mini[data-mode="top"] .art {
    width: 30px;
    height: 30px;
  }
  .mini[data-mode="top"] .title {
    font-size: 11px;
  }
  .mini[data-mode="top"] .sub {
    font-size: 9.5px;
  }
  .mini[data-mode="top"] .controls button {
    width: 24px;
    height: 24px;
    border-radius: 7px;
  }
  .mini[data-mode="top"] .controls .toggle {
    width: 28px;
    height: 28px;
    border-radius: 8px;
  }
  .mini[data-mode="top"] .progress {
    left: 8px;
    right: 8px;
    bottom: 2px;
  }
  .mini[data-mode="sidebar"] {
    left: 8px;
    top: 64px;
    bottom: auto;
    width: 236px;
    max-height: calc(100vh - 72px);
    border-radius: 14px;
  }
  .mini[data-mode="sidebar"][data-compact="true"] {
    width: var(--hm-sidebar-compact-size, 56px) !important;
    height: var(--hm-sidebar-compact-size, 56px);
    padding: 4px;
    gap: 0;
    justify-content: center;
    border-radius: 50%;
  }
  .mini[data-mode="sidebar"][data-compact="true"] .meta,
  .mini[data-mode="sidebar"][data-compact="true"] .controls,
  .mini[data-mode="sidebar"][data-compact="true"] .progress { display: none; }
  .mini[data-mode="sidebar"][data-compact="true"] .art {
    width: calc(var(--hm-sidebar-compact-size, 56px) - 12px);
    height: calc(var(--hm-sidebar-compact-size, 56px) - 12px);
  }
  .mini[data-theme="liquid"] {
    backdrop-filter: blur(22px) saturate(1.45);
    -webkit-backdrop-filter: blur(22px) saturate(1.45);
  }
  .mini[data-theme="cyber"] {
    border-style: double;
    border-width: 2px;
  }
  .mini[data-theme="mono"] {
    filter: saturate(0.35);
  }
  .mini[data-theme="sunset"] .progress span {
    background: linear-gradient(90deg, #ffa45c, #ff4d8d);
  }
  .mini[data-theme="ocean"] .progress span {
    background: linear-gradient(90deg, #39d0ff, #2f7bff);
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
    clip-path: circle(50% at 50% 50%);
    display: grid;
    place-items: center;
    color: var(--hm-accent);
    background: linear-gradient(135deg, rgba(var(--hm-accent-rgb), 0.2), rgba(var(--hm-accent-2-rgb), 0.26));
  }
  .art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform-origin: 50% 50%;
    display: none;
    border-radius: 50%;
    clip-path: circle(50% at 50% 50%);
    pointer-events: none;
    -webkit-user-drag: none;
    user-select: none;
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
  .controls button:hover { background: rgba(var(--hm-accent-rgb), 0.13); color: var(--hm-accent); }
  .controls button:active { transform: scale(0.92); }
  .controls button:focus-visible {
    outline: 2px solid rgba(var(--hm-accent-rgb), 0.8);
    outline-offset: 2px;
  }
  .controls button[disabled] { opacity: 0.38; cursor: default; }
  .controls .toggle {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    color: var(--hm-accent);
    background: rgba(var(--hm-accent-rgb), 0.15);
  }
  .controls .toggle:hover { background: rgba(var(--hm-accent-rgb), 0.24); }
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
      top: 4px;
      left: 8px;
      right: auto;
      width: calc(100vw - 16px);
      height: 44px;
    }
    .mini[data-mode="sidebar"] {
      width: 236px;
      right: auto;
    }
    .mini[data-mode="fab"] {
      right: max(12px, env(safe-area-inset-right, 0px));
      bottom: calc(env(safe-area-inset-bottom, 0px) + 14px);
      width: min(300px, calc(100vw - 24px));
    }
  }
  /* 右下角悬浮播放器：参考站内左下角 APlayer 的圆盘 + 玻璃面板 */
  .mini[data-mode="fab"] {
    right: max(24px, env(safe-area-inset-right, 0px));
    bottom: calc(env(safe-area-inset-bottom, 0px) + 24px);
    left: auto;
    top: auto;
    cursor: grab;
    touch-action: none;
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
    border: 1px solid rgba(var(--hm-accent-2-rgb), 0.36);
    border-radius: 18px;
    background:
      linear-gradient(104deg, rgba(var(--hm-base-rgb), 0.6) 0%, rgba(var(--hm-base-rgb), 0.5) 48%, rgba(var(--hm-accent-2-rgb), 0.16) 100%),
      rgba(var(--hm-base-rgb), 0.66);
    box-shadow:
      0 16px 40px rgba(2, 6, 18, 0.62),
      0 0 0 1px rgba(255, 255, 255, 0.04) inset,
      0 0 28px rgba(var(--hm-accent-2-rgb), 0.2);
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
  /* rockjesus.cn 左下角播放器的环形音频律动：36 根柱围绕唱片，12 点低频、6 点高频。 */
  .fab-eq {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 4;
    width: 104px;
    height: 104px;
    margin: -52px 0 0 -52px;
    display: none;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.45s ease;
  }
  .mini[data-mode="fab"][data-open="false"] .fab-eq { display: block; }
  .mini[data-mode="fab"][data-open="false"][data-playing="true"] .fab-eq { opacity: 1; }
  .fab-disc {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: rgba(var(--hm-base-rgb), 0.9);
    color: var(--hm-accent);
    cursor: pointer;
    overflow: visible;
    transform: scale(var(--fab-beat, 1));
    transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: 0 10px 26px rgba(2, 6, 18, 0.46);
    -webkit-tap-highlight-color: transparent;
  }
  .mini[data-mode="fab"][data-playing="true"] .fab-disc {
    transition: none;
    will-change: transform;
  }
  .fab-disc .art {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    clip-path: circle(50% at 50% 50%);
    box-shadow: 0 10px 26px rgba(2, 6, 18, 0.48), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
    background: linear-gradient(135deg, rgba(46, 230, 197, 0.2), rgba(123, 92, 255, 0.26));
  }
  .fab-disc .art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    clip-path: circle(50% at 50% 50%);
    display: none;
  }
  .fab-disc .art img[src] { display: block; }
  .fab-disc .art .fallback { display: grid; place-items: center; }
  .fab-glow {
    position: absolute;
    inset: -5px;
    z-index: -1;
    border-radius: 50%;
    background: conic-gradient(from 30deg, rgba(var(--hm-accent-rgb), 0.85), rgba(var(--hm-accent-2-rgb), 0.9), rgba(var(--hm-accent-rgb), 0.55), rgba(var(--hm-accent-rgb), 0.85));
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
    outline: 2px solid rgba(var(--hm-accent-rgb), 0.8);
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
    border: 1px solid rgba(var(--hm-accent-2-rgb), 0.5);
    border-radius: 7px;
    display: grid;
    place-items: center;
    background: rgba(var(--hm-base-rgb), 0.78);
    color: var(--hm-accent-2);
    box-shadow: 0 4px 12px rgba(2, 6, 18, 0.46);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .fab-quick:hover { background: rgba(var(--hm-accent-2-rgb), 0.42); color: #fff; }
  .fab-quick:active { transform: scale(0.92); }
  .fab-quick:focus-visible { outline: 2px solid rgba(var(--hm-accent-rgb), 0.8); outline-offset: 2px; }
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
  .fab-collapse:hover { color: var(--hm-accent); background: rgba(var(--hm-accent-rgb), 0.12); }
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
  .fab-panel .progress span { box-shadow: 0 0 8px rgba(var(--hm-accent-rgb), 0.55); }
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
    const themes = normalizeDockThemes(pref?.themes);
    const updated = Number(pref?.updated) || 0;
    const disabled = pref?.disabled === true;
    const legacyEntity = normalizeEntity(pref?.entity);
    if (legacyEntity && modes[0] && !entities[modes[0]]) entities[modes[0]] = legacyEntity;
    const cleanModes = modes.filter((mode) => entities[mode]);
    if (!cleanModes.length) {
      // 显式停用是一个全局状态：没有它，其他仪表盘里旧卡片的本地 dock 配置
      // 会在切页时把播放器重新装回来。
      if (!disabled) return null;
      return { modes: [], entities, themes, disabled: true, updated };
    }
    return { modes: cleanModes, entities, themes, disabled: false, updated };
  } catch {
    return null;
  }
}

export function saveDockPref(input = {}) {
  try {
    const modes = normalizeDockModes(input.modes ?? input.mode);
    const entities = normalizeDockEntities(input.entities);
    const themes = normalizeDockThemes(input.themes);
    const updated = Number(input.updated) || Date.now();
    const legacyEntity = normalizeEntity(input.entity);
    if (legacyEntity && modes[0] && !entities[modes[0]]) entities[modes[0]] = legacyEntity;
    const cleanModes = modes.filter((mode) => entities[mode]);
    if (!cleanModes.length) {
      const next = JSON.stringify({
        modes: [],
        entities,
        themes,
        disabled: true,
        updated,
      });
      window.localStorage.setItem(PREF_KEY, next);
      return;
    }
    const next = JSON.stringify({
      modes: cleanModes,
      entities,
      themes,
      disabled: false,
      updated,
    });
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
    configs.push({
      mode,
      entity,
      hass: input?.hass || null,
      theme: normalizeTheme(input?.theme),
    });
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
    this._theme = DEFAULT_THEME;
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
    this._onDragStart = (event) => {
      // 防止长按拖动时浏览器把封面 img 当成原生拖拽对象。
      event.preventDefault();
      event.stopPropagation();
    };
    this._onResize = () => {
      this._applySavedPosition();
      this._watchDockBounds();
    };
    this._boundsObserver = null;
    this._boundsRaf = null;
    this._boundsNodes = 0;
    this._sync = this._sync.bind(this);
  }

  update(config = {}) {
    const mode = normalizeMode(config.mode);
    const entity = normalizeEntity(config.entity);
    const theme = normalizeTheme(config.theme);
    const changedMode = mode !== this._mode;
    this._mode = mode;
    this._theme = theme;
    if (changedMode) {
      this._open = false;
      this._folded = false;
    }
    this._entity = entity;
    if (config.hass?.states) this._hass = config.hass;
    if (!this.shadowRoot.childElementCount || changedMode) this._render();
    this._sync();
    this._applySavedPosition();
    this._watchDockBounds();
  }

  connectedCallback() {
    if (!this.shadowRoot.childElementCount) this._render();
    this.shadowRoot.addEventListener("click", this._onClick);
    this.shadowRoot.addEventListener("pointerdown", this._onPointerDown);
    this.shadowRoot.addEventListener("pointermove", this._onPointerMove);
    this.shadowRoot.addEventListener("pointerup", this._onPointerUp);
    this.shadowRoot.addEventListener("pointercancel", this._onPointerCancel);
    this.shadowRoot.addEventListener("contextmenu", this._onContextMenu);
    this.shadowRoot.addEventListener("dragstart", this._onDragStart, true);
    window.addEventListener("resize", this._onResize);
    window.addEventListener("location-changed", this._onRoute);
    this._startPolling();
    this._sync();
    window.requestAnimationFrame(() => {
      this._applySavedPosition();
      this._watchDockBounds();
    });
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener("click", this._onClick);
    this.shadowRoot.removeEventListener("pointerdown", this._onPointerDown);
    this.shadowRoot.removeEventListener("pointermove", this._onPointerMove);
    this.shadowRoot.removeEventListener("pointerup", this._onPointerUp);
    this.shadowRoot.removeEventListener("pointercancel", this._onPointerCancel);
    this.shadowRoot.removeEventListener("contextmenu", this._onContextMenu);
    this.shadowRoot.removeEventListener("dragstart", this._onDragStart, true);
    window.removeEventListener("resize", this._onResize);
    window.removeEventListener("location-changed", this._onRoute);
    if (this._boundsObserver) {
      this._boundsObserver.disconnect();
      this._boundsObserver = null;
    }
    if (this._boundsRaf) {
      cancelAnimationFrame(this._boundsRaf);
      this._boundsRaf = null;
    }
    this._boundsNodes = 0;
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
      if (!this._boundsNodes) this._watchDockBounds();
    }, 1000);
  }

  _watchDockBounds() {
    if (typeof ResizeObserver === "undefined") return;
    let nodes = [];
    if (this._mode === "top") {
      nodes = [findTopBarNode()].filter(Boolean);
    } else if (this._mode === "sidebar") {
      nodes = [findSidebarNode()].filter(Boolean);
    } else if (this._mode === "fab") {
      nodes = [findTopBarNode(), findSidebarNode()].filter(Boolean);
    }
    if (!nodes.length) {
      this._boundsNodes = 0;
      return;
    }
    if (this._boundsObserver) this._boundsObserver.disconnect();
    this._boundsNodes = nodes.length;
    this._boundsObserver = new ResizeObserver(() => {
      if (this._dragging || this._boundsRaf) return;
      this._boundsRaf = window.requestAnimationFrame(() => {
        this._boundsRaf = null;
        this._applySavedPosition();
      });
    });
    for (const node of nodes) this._boundsObserver.observe(node);
  }

  _render() {
    this._eq = null;
    if (this._mode === "fab") return this._renderFab();
    this.shadowRoot.innerHTML = `
      <style>${STYLE}</style>
      <div class="mini" data-mode="${this._mode}" role="region" aria-label="HA Music 迷你播放器">
        <div class="art">
          <img alt="" draggable="false" />
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
              <img alt="" draggable="false" />
              <span class="fallback">${NOTE_ICON}</span>
            </div>
            <span class="fab-glow"></span>
          </button>
          <canvas class="fab-eq" aria-hidden="true"></canvas>
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
    this._eq = this.shadowRoot.querySelector(".fab-eq");
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

  _clearDockInlineStyles() {
    if (!this._mini) return;
    for (const prop of ["left", "top", "right", "bottom", "width", "height", "max-height"]) {
      this._mini.style.removeProperty(prop);
    }
    this._mini.style.removeProperty("--hm-sidebar-compact-size");
    delete this._mini.dataset.compact;
  }

  _applySavedPosition() {
    if (!this._mini || !this._mini.isConnected) return;
    if (this._mode === "fab") {
      const mini = this._mini;
      const rect = mini.getBoundingClientRect();
      const width = rect.width || 64;
      const height = rect.height || 64;
      const constraints = getFabConstraints();
      const positions = loadDockPositions();
      const pos = positions.fab;
      const defaultX = constraints.vw - width - 24;
      const defaultY = constraints.vh / 2 - height / 2;
      const target = clampFabPosition(
        pos && Number.isFinite(pos.x) ? pos.x * window.innerWidth : defaultX,
        pos && Number.isFinite(pos.y) ? pos.y * window.innerHeight : defaultY,
        width,
        height,
        constraints,
      );
      mini.style.left = `${Math.round(target.x)}px`;
      mini.style.top = `${Math.round(target.y)}px`;
      mini.style.right = "auto";
      mini.style.bottom = "auto";
      return;
    }
    const bounds = getDockBounds(this._mode);
    if (!bounds) return;
    const positions = loadDockPositions();
    const pos = positions[this._mode];
    const margin = dockMargin(this._mode);
    const mini = this._mini;

    if (this._mode === "top") {
      const h = Math.round(Math.min(44, Math.max(38, bounds.height - 8)));
      const maxW = Math.max(150, bounds.width - margin * 2);
      const w = Math.round(Math.min(300, Math.max(200, bounds.width - 140), maxW));
      mini.style.width = `${w}px`;
      mini.style.height = `${h}px`;
      mini.style.removeProperty("max-height");
      delete mini.dataset.compact;
      const addRect = findTopBarAddRect(bounds);
      const defaultX = addRect
        ? addRect.left - 8 - w
        : bounds.right - w - 80;
      const x = clampNumber(
        pos && Number.isFinite(pos.x) ? pos.x * window.innerWidth : defaultX,
        bounds.left + margin,
        bounds.right - w - margin,
      );
      mini.style.left = `${Math.round(x)}px`;
      mini.style.top = `${Math.round(bounds.top + Math.max(2, (bounds.height - h) / 2))}px`;
      mini.style.right = "auto";
      mini.style.bottom = "auto";
      return;
    }

    // 侧边栏：宽度贴合侧栏，X 固定，只允许上下移动，不能进入主内容区。
    const w = Math.round(Math.max(56, Math.min(236, bounds.width - 16)));
    const compact = w < 170;
    const compactSize = Math.round(Math.max(40, Math.min(56, bounds.width - 4)));
    if (compact) {
      mini.style.setProperty("--hm-sidebar-compact-size", `${compactSize}px`);
      mini.style.width = `${compactSize}px`;
      mini.style.height = `${compactSize}px`;
      mini.dataset.compact = "true";
    } else {
      mini.style.removeProperty("--hm-sidebar-compact-size");
      mini.style.width = `${w}px`;
      mini.style.height = "auto";
      mini.dataset.compact = "false";
    }
    mini.style.maxHeight = `${Math.max(56, bounds.height - 16)}px`;
    const left = Math.round(bounds.left + (compact ? 4 : margin));
    mini.style.left = `${left}px`;
    mini.style.right = "auto";
    mini.style.bottom = "auto";
    const height = mini.getBoundingClientRect().height || 58;
    const settingsRect = findSidebarSettingsRect(bounds);
    const defaultY = settingsRect
      ? settingsRect.top - 8 - height
      : bounds.bottom - height - 148;
    const y = clampNumber(
      pos && Number.isFinite(pos.y) ? pos.y * window.innerHeight : defaultY,
      bounds.top + margin,
      bounds.bottom - height - margin,
    );
    mini.style.top = `${Math.round(y)}px`;
  }

  _saveCurrentPosition() {
    if (!this._mini) return;
    const rect = this._mini.getBoundingClientRect();
    if (this._mode === "fab") {
      saveDockPosition(
        "fab",
        clampNumber(rect.left / Math.max(1, window.innerWidth), 0, 1),
        clampNumber(rect.top / Math.max(1, window.innerHeight), 0, 1),
      );
      return;
    }
    if (this._mode === "top") {
      saveDockPosition(
        this._mode,
        clampNumber(rect.left / Math.max(1, window.innerWidth), 0, 1),
        0,
      );
      return;
    }
    saveDockPosition(
      this._mode,
      0,
      clampNumber(rect.top / Math.max(1, window.innerHeight), 0, 1),
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
      bounds: this._mode === "fab" ? getFabConstraints() : getDockBounds(this._mode),
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
    const bounds = this._drag.bounds;
    if (!bounds) return;
    const margin = dockMargin(this._mode);
    let x = this._drag.left;
    let y = this._drag.top;
    if (this._mode === "top") {
      // 顶部只允许左右移动，并且始终留在导航栏内。
      x = clampNumber(
        this._drag.left + dx,
        bounds.left + margin,
        bounds.right - this._drag.width - margin,
      );
    } else if (this._mode === "sidebar") {
      // 侧边栏只允许上下移动，X 固定在侧栏内。
      y = clampNumber(
        this._drag.top + dy,
        bounds.top + margin,
        bounds.bottom - this._drag.height - margin,
      );
    } else if (this._mode === "fab") {
      // 右下角可任意拖动，但不能进入顶部导航栏和侧边栏。
      const safe = clampFabPosition(
        this._drag.left + dx,
        this._drag.top + dy,
        this._drag.width,
        this._drag.height,
        bounds,
      );
      x = safe.x;
      y = safe.y;
    }
    this._mini.style.left = `${Math.round(x)}px`;
    this._mini.style.top = `${Math.round(y)}px`;
    this._mini.style.right = "auto";
    this._mini.style.bottom = "auto";
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
    applyMiniTheme(this._mini, this._theme);
    this._mini.dataset.mode = this._mode;
    this._mini.dataset.folded = this._mode !== "fab" && this._folded ? "true" : "false";
    if (this._mode === "fab") this._mini.dataset.open = this._open ? "true" : "false";
    this._mini.dataset.playing = "false";
    if (!this._entity) {
      this._title.textContent = "选择播放器";
      this._sub.textContent = "在卡片编辑器中选择位置";
      this._setDisabled(true);
      this._progress.style.width = "0%";
      this._setArt(null);
      syncCoverSpin(this._art, false);
      this._syncFabEq(false, {}, 0);
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
      this._syncFabEq(false, {}, 0);
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
    this._mini.dataset.playing = playing ? "true" : "false";
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
    this._syncFabEq(playing, a, position);
    const percent = duration > 0 ? Math.min(100, Math.max(0, (position / duration) * 100)) : 0;
    this._progress.style.width = `${percent}%`;
  }

  _syncFabEq(playing, attrs = {}, position = 0) {
    if (!this._eq) return;
    syncFabEq(this._eq, this._mini, {
      playing,
      visible: !this._open,
      position,
      title: attrs.media_title,
      artist: attrs.media_artist,
      album: attrs.media_album_name,
      accent: THEMES[this._theme]?.accent,
    });
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
    this._sync();
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
