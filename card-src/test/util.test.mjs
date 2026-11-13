import test from "node:test";
import assert from "node:assert/strict";
import {
  clamp,
  formatTime,
  hasFeature,
  hexToHsl,
  mixHsl,
  normalizeArt,
  readMedia,
  readQueue,
  visualizerFrame,
} from "../src/util.js";
import { mediaClassLabel } from "../src/const.js";

test("formatTime 处理常规与异常值", () => {
  assert.equal(formatTime(0), "0:00");
  assert.equal(formatTime(65), "1:05");
  assert.equal(formatTime(3725), "1:02:05");
  assert.equal(formatTime(-1), "--:--");
  assert.equal(formatTime(Number.NaN), "--:--");
  assert.equal(formatTime(undefined), "--:--");
});

test("clamp 限定区间", () => {
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(-5, 0, 10), 0);
  assert.equal(clamp(15, 0, 10), 10);
});

test("hasFeature 依据位掩码判断能力", () => {
  const state = { attributes: { supported_features: 1 + 2 + 32 } };
  assert.equal(hasFeature(state, 2), true);
  assert.equal(hasFeature(state, 32), true);
  assert.equal(hasFeature(state, 4), false);
  assert.equal(hasFeature({ attributes: {} }, 1), false);
  assert.equal(hasFeature(state, 0), false);
});

test("readMedia 兼容新版 media_metadata", () => {
  const media = readMedia({
    state: "paused",
    attributes: {
      media_metadata: {
        title: "Neon River",
        artist: "Aurora Lab",
        album_name: "Signals",
        duration: 257,
        entity_picture: "/api/media_proxy/1",
      },
      media_duration: 257,
      media_position: 85,
    },
  });
  assert.equal(media.title, "Neon River");
  assert.equal(media.artist, "Aurora Lab");
  assert.equal(media.album, "Signals");
  assert.equal(media.duration, 257);
  assert.equal(media.position, 85);
  assert.equal(media.art, "/api/media_proxy/1");
});

test("readMedia 回退到扁平字段并裁剪位置", () => {
  const media = readMedia({
    state: "paused",
    attributes: {
      media_title: "Legacy",
      media_artist: "Old Player",
      media_duration: 100,
      media_position: 130,
      entity_picture: "/local/x.jpg",
      volume_level: 0.35,
      is_volume_muted: true,
      shuffle: true,
      repeat: "one",
    },
  });
  assert.equal(media.title, "Legacy");
  assert.equal(media.position, 100);
  assert.equal(media.volume, 0.35);
  assert.equal(media.muted, true);
  assert.equal(media.shuffle, true);
  assert.equal(media.repeat, "one");
  assert.equal(media.art, "/local/x.jpg");
});

test("readQueue 归一化队列并遵守上限", () => {
  const queue = readQueue(
    {
      attributes: {
        queue: [
          { title: "A", artist: "a", duration: 10, active: true },
          { name: "B", subtitle: "b", duration: 20, is_active: false },
          { media_title: "C", media_artist: "c" },
        ],
      },
    },
    2
  );
  assert.equal(queue.length, 2);
  assert.equal(queue[0].title, "A");
  assert.equal(queue[0].active, true);
  assert.equal(queue[1].title, "B");
  assert.equal(readQueue({ attributes: {} }).length, 0);
});

test("normalizeArt 处理相对路径与绝对地址", () => {
  const hass = { hassUrl: (p) => `https://ha.local${p}` };
  assert.equal(normalizeArt(hass, "/local/a.jpg"), "https://ha.local/local/a.jpg");
  assert.equal(normalizeArt(hass, "https://cdn/a.jpg"), "https://cdn/a.jpg");
  assert.equal(normalizeArt(hass, "data:image/png;base64,xx"), "data:image/png;base64,xx");
  assert.equal(normalizeArt(hass, ""), "");
});

test("hexToHsl 与 mixHsl 输出可用色值", () => {
  const hsl = hexToHsl("#2ee6c5");
  assert.ok(hsl.h >= 0 && hsl.h < 360);
  assert.ok(hsl.s > 50);
  const mixed = mixHsl(hsl, hexToHsl("#7b5cff"), 0.5);
  assert.ok(Number.isFinite(mixed.h) && Number.isFinite(mixed.s));
  assert.match(mixed.css, /^hsl\(\d+ \d+% \d+%\)$/);
  assert.equal(mixed.rgb.split(",").length, 3);
});

test("mediaClassLabel 中英输出", () => {
  assert.equal(mediaClassLabel("playlist", "zh-Hans"), "播放列表");
  assert.equal(mediaClassLabel("album", "en"), "Album");
  assert.equal(mediaClassLabel("custom", "zh"), "custom");
  assert.equal(mediaClassLabel("", "zh"), "");
});

test("visualizerFrame 用歌名+歌手+专辑做种子", () => {
  const a = visualizerFrame({ title: "Neon", artist: "Lab", album: "Signals" });
  const b = visualizerFrame({ title: "Neon", artist: "Lab", album: "Signals" });
  assert.equal(a.seed, "Neon|Lab|Signals");
  assert.equal(a.hash, b.hash);
  assert.equal(a.pulse, b.pulse);
  const other = visualizerFrame({ title: "Neon", artist: "Lab", album: "Other" });
  assert.notEqual(other.seed, a.seed);
  assert.ok(other.period >= 1.7 && other.period <= 2.69);
  assert.ok(a.energy >= 0.55 && a.energy <= 1);
});

test("visualizerFrame 随 media_position 改变脉冲", () => {
  const base = { title: "Neon", artist: "Lab", album: "Signals" };
  const p0 = visualizerFrame({ ...base, position: 0 });
  const p1 = visualizerFrame({ ...base, position: 0.85 });
  const p2 = visualizerFrame({ ...base, position: 1.7 });
  assert.ok(Math.abs(p1.pulse - p0.pulse) > 0.05);
  assert.ok(Math.abs(p2.pulse - p1.pulse) > 0.05);
  assert.ok(p0.pulse >= 0 && p0.pulse <= 1);
  assert.ok(p0.low >= 0 && p0.low <= 1);
});
