// 歌曲封面旋转：播放时顺时针匀速旋转，暂停时平滑回正。
import { nextFrame, cancelFrame } from "./tick.js";
const DURATION = 16000;
const states = new WeakMap();

function reducedMotion() {
  return typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function stop(state) {
  if (state.raf) {
    cancelFrame(state.raf);
    state.raf = null;
  }
  state.last = 0;
}

function start(element, state) {
  if (state.raf) return;
  element.style.transition = "none";
  element.style.willChange = "transform";
  state.last = 0;
  const tick = (now) => {
    if (!element.isConnected) {
      state.raf = null;
      return;
    }
    // 手机端封面旋转降到 30fps，避免每帧都写 transform 触发样式重算。
    const minGap = window.innerWidth <= 700 ? 32 : 0;
    if (minGap && state.lastPaint && now - state.lastPaint < minGap) {
      state.raf = nextFrame(tick);
      return;
    }
    state.lastPaint = now;
    if (!state.last) state.last = now;
    const delta = Math.min(0.1, (now - state.last) / 1000);
    state.last = now;
    state.angle = (state.angle + (delta * 360) / (DURATION / 1000)) % 360;
    element.style.transform = `rotate(${state.angle}deg)`;
    state.raf = nextFrame(tick);
  };
  state.raf = nextFrame(tick);
}

function reset(element, state) {
  stop(state);
  if (state.resetTimer) {
    window.clearTimeout(state.resetTimer);
    state.resetTimer = null;
  }
  if (!element.isConnected) return;
  if (!state.angle) {
    element.style.transform = "rotate(0deg)";
    return;
  }
  const angle = state.angle;
  element.style.transition = "none";
  element.style.transform = `rotate(${angle}deg)`;
  nextFrame(() => {
    if (!element.isConnected || state.playing) return;
    element.style.transition = "transform 1.15s cubic-bezier(0.22, 1, 0.36, 1)";
    element.style.transform = "rotate(0deg)";
    state.resetTimer = window.setTimeout(() => {
      state.resetTimer = null;
      if (!state.playing) {
        element.style.transition = "none";
        element.style.willChange = "auto";
        element.style.transform = "rotate(0deg)";
      }
    }, 1250);
  });
  state.angle = 0;
}

export function syncCoverSpin(element, playing) {
  if (!element) return;
  let state = states.get(element);
  if (!state) {
    state = { angle: 0, playing: false, raf: null, last: 0, lastPaint: 0, resetTimer: null };
    states.set(element, state);
  }
  if (reducedMotion()) {
    stop(state);
    element.style.transition = "none";
    element.style.willChange = "auto";
    element.style.transform = "rotate(0deg)";
    state.playing = false;
    return;
  }
  const next = Boolean(playing);
  if (state.playing === next) {
    if (next) start(element, state);
    return;
  }
  state.playing = next;
  if (next) {
    if (state.resetTimer) {
      window.clearTimeout(state.resetTimer);
      state.resetTimer = null;
    }
    start(element, state);
  } else {
    reset(element, state);
  }
}
