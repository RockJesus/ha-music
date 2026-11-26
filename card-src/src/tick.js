// 统一的动画帧调度。
// Chrome 在窗口被遮挡、最小化或不在前台时，会把 requestAnimationFrame 节流到约 1fps：
// 进度条变成一秒跳一格、频谱和环灯定格、封面不转，看起来就是“卡顿不丝滑”。
// 这里给同一帧同时挂一个 rAF 和一个 20ms 定时器，谁先到谁执行：
// 窗口可见时照旧走 rAF（与合成帧对齐），被遮挡时由定时器兜底，仍然约 50fps。
const FALLBACK_MS = 20;

export function nextFrame(callback) {
  const handle = { raf: 0, timer: 0, done: false };
  const fire = (now) => {
    if (handle.done) return;
    handle.done = true;
    if (handle.raf) cancelAnimationFrame(handle.raf);
    if (handle.timer) clearTimeout(handle.timer);
    handle.raf = 0;
    handle.timer = 0;
    callback(now);
  };
  if (typeof requestAnimationFrame === "function") {
    handle.raf = requestAnimationFrame((now) => fire(now));
  }
  handle.timer = setTimeout(() => fire(performance.now()), FALLBACK_MS);
  return handle;
}

export function cancelFrame(handle) {
  if (!handle || handle.done) return;
  handle.done = true;
  if (handle.raf) cancelAnimationFrame(handle.raf);
  if (handle.timer) clearTimeout(handle.timer);
  handle.raf = 0;
  handle.timer = 0;
}
