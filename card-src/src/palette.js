// 封面取色：同源代理图可用 canvas 取主色，跨域/失败时回退到确定性配色
import { hslToRgb, clamp, hashString } from "./util.js";

const cache = new Map();
const MAX_ENTRIES = 40;

function analyze(image, seed) {
  const size = 36;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.drawImage(image, 0, 0, size, size);
  const data = ctx.getImageData(0, 0, size, size).data;

  const buckets = new Map();
  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3];
    if (alpha < 180) continue;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const light = (max + min) / 510;
    const sat = max === 0 ? 0 : (max - min) / max;
    // 过滤近黑、近白和灰阶，音乐封面里这两种占比很高
    if (light < 0.12 || light > 0.9 || sat < 0.14) continue;
    let hue = 0;
    const delta = max - min;
    if (delta !== 0) {
      if (max === r) hue = ((g - b) / delta) % 6;
      else if (max === g) hue = (b - r) / delta + 2;
      else hue = (r - g) / delta + 4;
      hue = (hue * 60 + 360) % 360;
    }
    const key = Math.floor(hue / 18);
    const entry = buckets.get(key) || { count: 0, sat: 0, light: 0 };
    entry.count += 1;
    entry.sat += sat;
    entry.light += light;
    buckets.set(key, entry);
  }

  if (!buckets.size) return null;
  const sorted = [...buckets.entries()]
    .map(([key, entry]) => ({
      hue: key * 18 + 9,
      score: entry.count * (0.45 + entry.sat / entry.count),
      sat: entry.sat / entry.count,
      light: entry.light / entry.count,
    }))
    .sort((a, b) => b.score - a.score);

  const primary = sorted[0];
  const secondary =
    sorted.find((item) => {
      const gap = Math.abs(item.hue - primary.hue);
      return Math.min(gap, 360 - gap) > 28;
    }) || {
      hue: (primary.hue + 44) % 360,
      sat: primary.sat,
      light: primary.light,
    };

  const sat = (value) => clamp(Math.round(value * 100), 42, 88);
  const hue1 = Math.round(primary.hue);
  const hue2 = Math.round(secondary.hue);
  const s1 = sat(primary.sat + 0.08);
  const s2 = sat(secondary.sat + 0.05);
  const l1 = clamp(Math.round(primary.light * 100) + 12, 46, 66);
  const l2 = clamp(Math.round(secondary.light * 100) + 8, 40, 60);

  return {
    a1: `hsl(${hue1} ${s1}% ${l1}%)`,
    a2: `hsl(${hue2} ${s2}% ${l2}%)`,
    rgb1: hslToRgb(hue1, s1, l1).join(","),
    rgb2: hslToRgb(hue2, s2, l2).join(","),
    h1: hue1,
    s1,
    l1,
    h2: hue2,
    s2,
    l2,
    seed: hashString(seed || ""),
  };
}

export function paletteFor(url, seed = "") {
  if (!url) return Promise.resolve(null);
  if (cache.has(url)) return cache.get(url);
  const promise = new Promise((resolve) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.decoding = "async";
    image.onload = () => {
      try {
        resolve(analyze(image, seed));
      } catch (err) {
        resolve(null);
      }
    };
    image.onerror = () => resolve(null);
    image.src = url;
  });
  if (cache.size > MAX_ENTRIES) cache.clear();
  cache.set(url, promise);
  return promise;
}
