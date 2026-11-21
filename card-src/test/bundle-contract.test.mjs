import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const bundle = readFileSync(new URL("../../ha-music.js", import.meta.url), "utf8");

test("bundle subscribes to both backend commands", () => {
  assert.ok(bundle.includes("ha_music_studio/subscribe_lyrics"));
  assert.ok(bundle.includes("ha_music_studio/subscribe"));
});

test("bundle carries the protocol version", () => {
  assert.ok(bundle.includes("Backend protocol mismatch"));
});

test("bundle has no retired analysis or external lyric sources", () => {
  for (const token of ["ha_music_analysis", "netease_lyrics", "lyrics.ovh", "lrclib", "kugou"]) {
    assert.equal(bundle.includes(token), false, token);
  }
});
