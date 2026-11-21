// 右下角悬浮唱片的环形音频律动。
// 参考公开的 rj-pl-eq 环形律动：36 根镜像柱围绕唱片的 12 点低频 / 6 点高频分布，
// 颜色从紫色过渡到青色，并叠加唱片轻微脉冲与外圈辉光。
// HA 的音频由服务端播放，页面拿不到原始采样，因此以歌曲元数据和 media_position 驱动。
import { clamp, hashString } from "./util.js";

const SIZE = 104;
const BARS = 36;
const MAX_BARS = 192;
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
  const dpr = state.dpr || DPR;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, size, size);
  const R = size / 2;
  const maxLen = Math.max(4, R - r0 - 8);
  const accent = state.accent || FALLBACK_ACCENT;
  const barCount = state.barCount || BARS;
  const half = barCount / 2;
  const glowOn = state.applyShadow !== false;
  const progress = Number.isFinite(state.progress) ? state.progress : -1;
  ctx.lineCap = state.cap || "round";
  ctx.shadowBlur = glowOn ? 5 + glow * 7 : 0;

  for (let i = 0; i < barCount; i += 1) {
    const v = clamp(bars[i] || 0, 0, 1);
    // 环形频谱进度：已播放的一侧保持彩色律动，未播放一侧压暗成轮廓。
    // 进度从 12 点方向顺时针增长，与圆形拖动方向一致。
    const played = progress < 0 || i / barCount <= progress + 0.0008;
    ctx.shadowBlur = played && glowOn ? 5 + glow * 7 : 0;
    const angle = (i / barCount) * Math.PI * 2 - Math.PI / 2;
    const len = 3.2 + Math.pow(v, 1.05) * maxLen;
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const t = Math.abs(Math.sin(angle));
    const color = blend(accent[0], accent[1], t);
    const alpha = (0.5 + v * 0.48) * (played ? 1 : 0.26);
    // 柱底保留少量 alpha，让每一根柱都从根部可见；若从 0 渐入，
    // 短柱只剩外端几个像素，整圈会退化成虚线，看起来像音柱缺失。
    const x0 = R + c * r0;
    const y0 = R + s * r0;
    const x1 = R + c * (r0 + len);
    const y1 = R + s * (r0 + len);
    const grad = ctx.createLinearGradient(x0, y0, x1, y1);
    grad.addColorStop(0, rgba(color, alpha * 0.22));
    grad.addColorStop(0.18, rgba(color, alpha * 0.28));
    grad.addColorStop(0.46, rgba(color, alpha * 0.62));
    grad.addColorStop(1, rgba(color, alpha));
    ctx.strokeStyle = grad;
    ctx.shadowColor = played
      ? rgba(color, 0.12 + glow * 0.26)
      : "rgba(0, 0, 0, 0)";
    ctx.lineWidth = state.lineWidth || 3;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();

    // 上半环加一道近白亮芯，让紫色一端在深色背景上仍能读出柱长。
    const core = played ? clamp((t - 0.3) / 0.45, 0, 1) : 0;
    if (core > 0.01) {
      ctx.shadowBlur = 0;
      ctx.strokeStyle = `rgba(255, 255, 255, ${((0.05 + v * 0.24) * core).toFixed(2)})`;
      ctx.lineWidth = 1.1;
      ctx.stroke();
      ctx.shadowBlur = glowOn ? 5 + glow * 7 : 0;
    }
  }
  ctx.shadowBlur = 0;
  ctx.shadowColor = "transparent";
  // 细进度弧压在音柱内侧：柱子负责实时频谱，弧负责精确读数与拖动反馈。
  if (progress >= 0) {
    const arcR = Math.max(8, r0 - 5);
    const start = -Math.PI / 2;
    const end = start + Math.PI * 2 * clamp(progress, 0, 1);
    const arcGrad = ctx.createLinearGradient(0, 0, size, size);
    arcGrad.addColorStop(0, accent[0]);
    arcGrad.addColorStop(1, accent[1]);
    ctx.strokeStyle = arcGrad;
    ctx.lineWidth = Math.max(1.6, (state.lineWidth || 3) * 0.8);
    ctx.globalAlpha = 0.95;
    ctx.shadowColor = rgba(parseHex(accent[1]), 0.5);
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(R, R, arcR, start, end);
    ctx.stroke();
    // 弧尾加一颗亮点，拖动时能明确看到当前播放位置。
    if (progress > 0.002) {
      const ax = R + Math.cos(end) * arcR;
      const ay = R + Math.sin(end) * arcR;
      ctx.fillStyle = "#ffffff";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(ax, ay, Math.max(1.6, ctx.lineWidth * 0.9), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }
}

function clear(canvas) {
  const state = states.get(canvas);
  if (!state?.ctx) return;
  const size = state.size || SIZE;
  const dpr = state.dpr || DPR;
  state.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
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
  // 手机 WebView 上按 30fps 出帧即可，省掉一半合成开销；桌面保持原刷新率。
  const minGap = state.maxFps ? 1000 / state.maxFps : 0;
  if (minGap && state.lastPaint && now - state.lastPaint < minGap) {
    state.raf = requestAnimationFrame((ts) => frame(canvas, ts));
    return;
  }
  state.lastPaint = now;

  const t = state.position + Math.max(0, now - state.since) / 1000;
  const angle = (t / state.period) * Math.PI * 2 + state.phase;
  const pulse = 0.5 + 0.5 * Math.sin(angle);
  const low = 0.5 + 0.5 * Math.sin(angle + 0.55);
  const kick = Math.pow(0.5 + 0.5 * Math.sin(angle * 2.15 + state.phase * 1.7), 3);
  const bars = [];

  const barCount = state.barCount || BARS;
  const half = barCount / 2;
  for (let i = 0; i < barCount; i += 1) {
    const angle = (i / barCount) * Math.PI * 2 - Math.PI / 2;
    // 以纵向位置决定频段：12 点与 6 点同为低频，左右两侧为高频。
    // 这样上下半圈天然镜像，不会出现上半圈长、下半圈短。
    const vertical = Math.abs(Math.sin(angle));
    const d = 1 - vertical;
    const wobble = Math.sin(t * (4.6 + (state.hash % 9) * 0.25) + i * 1.1 + state.phase);
    const shimmer = Math.sin(t * (11.4 + (state.hash % 5) * 0.4) + i * 2.3);
    const transient = 0.18 * kick * Math.pow(vertical, 2.2);
    let base;
    if (state.bands?.length && state.bands.live) {
      const bandIndex = d < 0.28 ? 0 : d < 0.55 ? 1 : 2;
      const drive = clamp(state.bands[bandIndex] || 0, 0, 1);
      base =
        (0.1 + 0.86 * drive) *
        (0.58 + 0.42 * (0.5 + 0.5 * wobble)) *
        (0.62 + 0.38 * (0.5 + 0.5 * shimmer));
    } else {
      const band = Math.pow(1 - d, 1.05);
      base = (0.16 + 0.68 * band) * (0.62 + 0.38 * (0.5 + 0.5 * wobble));
      base *= 0.55 + 0.45 * (0.5 + 0.5 * shimmer);
    }
    bars[i] = clamp(base + transient + 0.04 * state.energy, 0, 1);
  }

  for (let i = 0; i < barCount; i += 1) {
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

function stop(canvas, { clearNow = false, persist = false } = {}) {
  const state = states.get(canvas);
  if (!state) return;
  if (state.raf) {
    cancelAnimationFrame(state.raf);
    state.raf = 0;
  }
  setBeat(state.root, 1, 0, state.accent, state.target, state.applyShadow);
  const levels = state.smooth.slice(0, state.barCount || BARS);
  // 暂停时环形频谱不能整圈消失：没有历史波形（刚刷新/刚切换）时用一组
  // 静态的镜像柱高兜底，进度弧和已播放色带仍然可读。
  if (persist && !levels.some((value) => value > 0.02)) {
    for (let i = 0; i < levels.length; i += 1) {
      const vertical = Math.abs(Math.sin((i / levels.length) * Math.PI * 2));
      levels[i] = 0.1 + 0.15 * (1 - vertical) + 0.03 * Math.abs(Math.sin(i * 1.7));
    }
  }
  state.smooth.fill(0);
  if (persist) {
    paint(canvas, levels, 0.28);
    return;
  }
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
      cap: "round",
      dpr: DPR,
      maxFps: 0,
      lastPaint: 0,
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
      bands: null,
      progress: -1,
      persist: false,
      accent: FALLBACK_ACCENT,
      smooth: new Array(MAX_BARS).fill(0),
      barCount: BARS,
      raf: 0,
      clearTimer: 0,
    };
    states.set(canvas, state);
  }
  const accent = Array.isArray(media.accent) && media.accent.length >= 2
    ? [media.accent[0], media.accent[1]]
    : FALLBACK_ACCENT;
  const maxSize = Math.max(104, Number(media.maxSize) || 360);
  const size = Math.max(72, Math.min(maxSize, Math.round(Number(media.size) || SIZE)));
  const innerRadius = Number(media.innerRadius);
  state.accent = accent;
  state.root = root;
  state.size = size;
  state.r0 = Number.isFinite(innerRadius) ? innerRadius : size * 0.322;
  state.lineWidth = Math.max(1.6, Math.min(5, Number(media.lineWidth) || 3));
  state.cap = media.cap === "butt" ? "butt" : "round";
  const requestedBars = Math.round(Number(media.bars) || BARS);
  const nextBars = Math.max(24, Math.min(MAX_BARS, requestedBars - (requestedBars % 2)));
  if (state.barCount !== nextBars) {
    state.barCount = nextBars;
    state.smooth.fill(0);
  }
  state.target = media.target || null;
  state.bands = Array.isArray(media.bands) && media.bands.length ? media.bands : null;
  const progress = Number(media.progress);
  state.progress = Number.isFinite(progress) ? clamp(progress, 0, 1) : -1;
  state.persist = media.persist === true;
  state.applyShadow = media.applyShadow !== false;
  state.maxFps = Math.max(0, Number(media.maxFps) || 0);
  const dpr = Math.min(2, Math.max(1, Number(media.dpr) || DPR));
  state.dpr = dpr;
  if (canvas.width !== Math.round(size * dpr)) {
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
  }

  if (state.clearTimer) {
    window.clearTimeout(state.clearTimer);
    state.clearTimer = 0;
  }
  state.root = root || state.root;

  const playing = !!media.playing;
  // 手机端 FAB 被 CSS 隐藏后组件仍会收到 hass 更新；这里以真实盒尺寸判定，
  // 避免隐藏的 300px 画布继续逐帧做 shadowBlur 描边。
  const domVisible =
    typeof canvas.getClientRects === "function" ? canvas.getClientRects().length > 0 : true;
  const visible = media.visible !== false && domVisible;
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
    stop(canvas, { clearNow: !visible, persist: state.persist && visible });
    return;
  }
  if (!state.raf) {
    setBeat(state.root, 1, 0, state.accent, state.target, state.applyShadow);
    state.since = performance.now();
    state.lastPaint = 0;
    state.raf = requestAnimationFrame((ts) => frame(canvas, ts));
  }
}
