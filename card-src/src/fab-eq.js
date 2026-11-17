// 右下角悬浮唱片的环形音频律动。
// 参考公开的 rj-pl-eq 环形律动：36 根镜像柱围绕唱片的 12 点低频 / 6 点高频分布，
// 颜色从紫色过渡到青色，并叠加唱片轻微脉冲与外圈辉光。
// HA 的音频由服务端播放，页面拿不到原始采样，因此以歌曲元数据和 media_position 驱动。
import { clamp, hashString } from "./util.js";

const SIZE = 104;
const BARS = 36;
const HALF = BARS / 2;
const DPR = Math.min(2, typeof window === "undefined" ? 1 : window.devicePixelRatio || 1);
const states = new WeakMap();
const FALLBACK_ACCENT = ["#7b5cff", "#2ee6c5"];

function parseHex(value) {
  const text = String(value || "").replace("#", "");
  if (text.length === 3) {
    return [0, 1, 2].map((i) => parseInt(text[i] + text[i], 16));
  }
  if (text.length === 6) {
    return [0, 2, 4].map((i) => parseInt(text.slice(i, i + 2), 16));
  }
  return [123, 92, 255];
}

function blend(a, b, t) {
  const ca = parseHex(a);
  const cb = parseHex(b);
  return ca.map((value, i) => Math.round(value + (cb[i] - value) * t));
}

function rgba(color, alpha) {
  const [r, g, b] = color;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function paint(canvas, bars, glow) {
  const state = states.get(canvas);
  if (!state?.ctx) return;
  const { ctx } = state;
  const size = state.size || SIZE;
  const r0 = state.r0 || 33.5;
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.clearRect(0, 0, size, size);
  const R = size / 2;
  const maxLen = Math.max(4, R - r0 - 3);
  const accent = state.accent || FALLBACK_ACCENT;
  ctx.lineCap = "round";
  ctx.shadowBlur = 5 + glow * 7;

  for (let i = 0; i < BARS; i += 1) {
    const v = clamp(bars[i] || 0, 0, 1);
    const angle = (i / BARS) * Math.PI * 2 - Math.PI / 2;
    const len = 2.2 + Math.pow(v, 1.05) * maxLen;
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const t = Math.abs(i - HALF) / HALF;
    const color = blend(accent[0], accent[1], t);
    const alpha = 0.5 + v * 0.48;
    ctx.strokeStyle = rgba(color, alpha);
    ctx.shadowColor = rgba(color, 0.12 + glow * 0.26);
    ctx.lineWidth = state.lineWidth || 3;
    ctx.beginPath();
    ctx.moveTo(R + c * r0, R + s * r0);
    ctx.lineTo(R + c * (r0 + len), R + s * (r0 + len));
    ctx.stroke();

    // 上半环加一道近白亮芯，让紫色一端在深色背景上仍能读出柱长。
    const core = clamp((t - 0.3) / 0.45, 0, 1);
    if (core > 0.01) {
      ctx.shadowBlur = 0;
      ctx.strokeStyle = `rgba(255, 255, 255, ${((0.05 + v * 0.24) * core).toFixed(2)})`;
      ctx.lineWidth = 1.1;
      ctx.stroke();
      ctx.shadowBlur = 5 + glow * 7;
    }
  }
  ctx.shadowBlur = 0;
  ctx.shadowColor = "transparent";
}

function clear(canvas) {
  const state = states.get(canvas);
  if (!state?.ctx) return;
  const size = state.size || SIZE;
  state.ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  state.ctx.clearRect(0, 0, size, size);
}

function setBeat(root, scale, glow, accent, target, applyShadow = true) {
  if (!root?.style) return;
  root.style.setProperty("--fab-beat", scale.toFixed(4));
  root.style.setProperty("--fab-beat-glow", glow.toFixed(3));
  const disc = target || root.querySelector?.(".fab-disc");
  if (disc && applyShadow) {
    const colors = accent || FALLBACK_ACCENT;
    const [r, g, b] = parseHex(colors[0]);
    const [r2, g2, b2] = parseHex(colors[1]);
    disc.style.boxShadow = [
      "0 10px 26px rgba(2, 6, 18, 0.46)",
      `0 0 26px rgba(${r}, ${g}, ${b}, ${(glow * 0.92).toFixed(3)})`,
      `0 0 52px rgba(${r2}, ${g2}, ${b2}, ${(glow * 0.55).toFixed(3)})`,
    ].join(", ");
  }
}

function frame(canvas, now) {
  const state = states.get(canvas);
  if (!state) return;
  state.raf = 0;
  if (!state.playing || !state.visible) return;
  if (!canvas.isConnected) {
    state.playing = false;
    return;
  }

  const t = state.position + Math.max(0, now - state.since) / 1000;
  const angle = (t / state.period) * Math.PI * 2 + state.phase;
  const pulse = 0.5 + 0.5 * Math.sin(angle);
  const low = 0.5 + 0.5 * Math.sin(angle + 0.55);
  const kick = Math.pow(0.5 + 0.5 * Math.sin(angle * 2.15 + state.phase * 1.7), 3);
  const bars = [];

  for (let h = 0; h < HALF; h += 1) {
    const d = h / (HALF - 1); // 0 = 12 点低频，1 = 6 点高频
    const band = Math.pow(1 - d, 1.05);
    const wobble = Math.sin(t * (4.6 + (state.hash % 9) * 0.25) + h * 1.1 + state.phase);
    const shimmer = Math.sin(t * (11.4 + (state.hash % 5) * 0.4) + h * 2.3);
    const base = (0.16 + 0.68 * band) * (0.62 + 0.38 * (0.5 + 0.5 * wobble));
    const transient = 0.18 * kick * Math.pow(1 - d, 2.2);
    const value = clamp(
      base * (0.55 + 0.45 * (0.5 + 0.5 * shimmer)) + transient + 0.04 * state.energy,
      0,
      1,
    );
    bars[h] = value;
    bars[BARS - 1 - h] = value;
  }

  for (let i = 0; i < BARS; i += 1) {
    const prev = state.smooth[i] || 0;
    const target = bars[i] || 0;
    state.smooth[i] = target > prev ? prev + (target - prev) * 0.72 : prev + (target - prev) * 0.24;
  }

  const glow = Math.min(1, low * 1.05 + kick * 0.4);
  paint(canvas, state.smooth, glow);
  const scale = 1 + Math.min(0.085, low * 0.05 + kick * 0.05);
  setBeat(
    state.root,
    scale,
    0.16 + Math.min(0.46, low * 0.5 + kick * 0.26),
    state.accent,
    state.target,
    state.applyShadow,
  );
  state.raf = requestAnimationFrame((ts) => frame(canvas, ts));
}

function stop(canvas, { clearNow = false } = {}) {
  const state = states.get(canvas);
  if (!state) return;
  if (state.raf) {
    cancelAnimationFrame(state.raf);
    state.raf = 0;
  }
  setBeat(state.root, 1, 0, state.accent, state.target, state.applyShadow);
  state.smooth.fill(0);
  if (clearNow) {
    clear(canvas);
    return;
  }
  state.clearTimer = window.setTimeout(() => {
    const current = states.get(canvas);
    if (current && !current.playing) clear(canvas);
  }, 460);
}

/**
 * 更新右下角悬浮唱片的音频律动。
 * @param {HTMLCanvasElement|null} canvas
 * @param {HTMLElement|null} root
 * @param {{playing?: boolean, visible?: boolean, position?: number, title?: string, artist?: string, album?: string}} media
 */
export function syncFabEq(canvas, root, media = {}) {
  if (!canvas || typeof canvas.getContext !== "function") return;
  let state = states.get(canvas);
  if (!state) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = Math.round(SIZE * DPR);
    canvas.height = Math.round(SIZE * DPR);
    state = {
      ctx,
      root,
      size: SIZE,
      r0: 33.5,
      lineWidth: 3,
      target: null,
      applyShadow: true,
      playing: false,
      visible: true,
      position: 0,
      lastPosition: null,
      since: 0,
      hash: 0,
      period: 2,
      phase: 0,
      energy: 0.6,
      accent: FALLBACK_ACCENT,
      smooth: new Array(BARS).fill(0),
      raf: 0,
      clearTimer: 0,
    };
    states.set(canvas, state);
  }
  const accent = Array.isArray(media.accent) && media.accent.length >= 2
    ? [media.accent[0], media.accent[1]]
    : FALLBACK_ACCENT;
  const size = Math.max(72, Math.min(360, Math.round(Number(media.size) || SIZE)));
  const innerRadius = Number(media.innerRadius);
  state.accent = accent;
  state.root = root;
  state.size = size;
  state.r0 = Number.isFinite(innerRadius) ? innerRadius : size * 0.322;
  state.lineWidth = Math.max(2, Math.min(5, Number(media.lineWidth) || 3));
  state.target = media.target || null;
  state.applyShadow = media.applyShadow !== false;
  if (canvas.width !== Math.round(size * DPR)) {
    canvas.width = Math.round(size * DPR);
    canvas.height = Math.round(size * DPR);
  }

  if (state.clearTimer) {
    window.clearTimeout(state.clearTimer);
    state.clearTimer = 0;
  }
  state.root = root || state.root;

  const playing = !!media.playing;
  const visible = media.visible !== false;
  const wasPlaying = state.playing;
  const position = Number(media.position);
  if (Number.isFinite(position) && position >= 0) {
    const moved = state.lastPosition == null || Math.abs(position - state.lastPosition) > 0.25;
    if (moved || (!wasPlaying && playing)) {
      state.position = position;
      state.since = performance.now();
    }
    state.lastPosition = position;
  }

  const seed = [media.title, media.artist, media.album].filter(Boolean).join("|") || "ha-music";
  state.hash = hashString(seed);
  state.period = 1.7 + ((state.hash >>> 8) % 90) / 100;
  state.phase = ((state.hash % 360) / 360) * Math.PI * 2;
  state.energy = 0.55 + ((state.hash >>> 16) % 100) / 220;
  state.playing = playing;
  state.visible = visible;

  if (!playing || !visible) {
    stop(canvas, { clearNow: !visible });
    return;
  }
  if (!state.raf) {
    setBeat(state.root, 1, 0, state.accent, state.target, state.applyShadow);
    state.since = performance.now();
    state.raf = requestAnimationFrame((ts) => frame(canvas, ts));
  }
}
