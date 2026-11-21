import test from "node:test";
import assert from "node:assert/strict";
import { coverMonogram, fallbackCover } from "../src/fallback-cover.js";

test("coverMonogram 提取拉丁、数字与中文首字", () => {
  assert.equal(coverMonogram("Lovefool", "twocolors"), "LO");
  assert.equal(coverMonogram("7 Years", "Lukas Graham"), "7Y");
  assert.equal(coverMonogram("晴天", "周杰伦"), "晴");
  assert.equal(coverMonogram("", "Adele"), "AD");
  assert.equal(coverMonogram("", ""), "");
});

test("fallbackCover 生成稳定的自包含 SVG 封面", () => {
  const media = { title: "7 Years", artist: "Lukas Graham", album: "Lukas Graham" };
  const first = fallbackCover(media);
  const second = fallbackCover(media);
  assert.match(first, /^data:image\/svg\+xml;charset=utf-8,/);
  assert.equal(first, second);
  assert.notEqual(first, fallbackCover({ title: "Lovefool", artist: "twocolors" }));
  assert.match(decodeURIComponent(first), />7Y</);
  assert.match(decodeURIComponent(first), /Lukas Graham/);
});

test("fallbackCover 对 XML 特殊字符做转义", () => {
  const svg = decodeURIComponent(
    fallbackCover({ title: "A & B", artist: "<Local> 'Mix'" })
  );
  assert.match(svg, /&lt;Local&gt; &apos;Mix&apos;/);
});

test("fallbackCover 没有标题和歌手时不生成封面", () => {
  assert.equal(fallbackCover({}), "");
  assert.equal(fallbackCover({ title: " ", artist: "" }), "");
});
