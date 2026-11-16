import assert from "node:assert/strict";
import test from "node:test";
import { cleanLyricText, lyricIndex, lyricProgress, parseLyrics, pickLrclibResult } from "../src/lyrics.js";

test("parseLyrics 解析 LRC 时间轴并忽略元信息", () => {
  const parsed = parseLyrics(
    "[ar:AURORA LAB]\n[00:12.40]城市在呼吸\n[00:26.200]我们沿着光走\n[00:41]纯文本行"
  );
  assert.equal(parsed.lines.length, 3);
  assert.equal(parsed.lines[0].time, 12.4);
  assert.equal(parsed.lines[1].time, 26.2);
  assert.equal(parsed.lines[2].time, 41);
  assert.equal(parsed.lines[0].text, "城市在呼吸");
});

test("parseLyrics 支持同一行多个时间戳并按时间排序", () => {
  const parsed = parseLyrics("[00:20.00][00:40.00]副歌\n[00:10.00]主歌");
  assert.deepEqual(parsed.lines.map((line) => line.time), [10, 20, 40]);
  assert.deepEqual(parsed.lines.map((line) => line.text), ["主歌", "副歌", "副歌"]);
});

test("parseLyrics 无时间轴时退化为纯文本", () => {
  const parsed = parseLyrics("第一行\n第二行");
  assert.equal(parsed.lines.length, 0);
  assert.deepEqual(parsed.plain, ["第一行", "第二行"]);
});

test("lyricIndex 返回当前时间对应的歌词行", () => {
  const lines = [{ time: 10 }, { time: 20 }, { time: 30 }];
  assert.equal(lyricIndex(lines, 0), -1);
  assert.equal(lyricIndex(lines, 10), 0);
  assert.equal(lyricIndex(lines, 19.99), 0);
  assert.equal(lyricIndex(lines, 20.01), 1);
  assert.equal(lyricIndex(lines, 99), 2);
});


test("cleanLyricText 去掉现场版/括号说明和分隔符", () => {
  assert.equal(cleanLyricText("Shape of You (Live) [Remix]"), "Shape of You");
  assert.equal(cleanLyricText("A/B - C_D"), "A B C D");
  assert.equal(cleanLyricText("  "), "");
});

test("lyricProgress 计算当前行卡拉OK进度", () => {
  const lines = [{ time: 10 }, { time: 20 }, { time: 30 }];
  assert.deepEqual(lyricProgress(lines, 5), { index: -1, progress: 0 });
  assert.equal(lyricProgress(lines, 10).index, 0);
  assert.ok(Math.abs(lyricProgress(lines, 15).progress - 0.5) < 0.001);
  assert.ok(Math.abs(lyricProgress(lines, 25, 40).progress - 0.5) < 0.001);
  assert.ok(Math.abs(lyricProgress(lines, 35, 40).progress - 0.5) < 0.001);
});

test("pickLrclibResult 按歌名/歌手/时长挑同步歌词，拒绝无关曲目", () => {
  const results = [
    {
      trackName: "7 Years (Live)",
      artistName: "Lukas Graham",
      duration: 260,
      syncedLyrics: "[00:10]live",
      plainLyrics: "live",
    },
    {
      trackName: "7 Years",
      artistName: "Lukas Graham",
      duration: 237,
      syncedLyrics: "[00:12]studio",
      plainLyrics: "studio",
    },
    {
      trackName: "Sorry",
      artistName: "Justin Bieber",
      duration: 237,
      syncedLyrics: "[00:12]wrong",
      plainLyrics: "wrong",
    },
  ];
  const best = pickLrclibResult(results, {
    title: "7 Years",
    artist: "Lukas Graham",
    duration: 237,
  });
  assert.equal(best.trackName, "7 Years");
  assert.equal(pickLrclibResult(results, { title: "Blinding Lights", artist: "The Weeknd", duration: 200 }), null);
});
