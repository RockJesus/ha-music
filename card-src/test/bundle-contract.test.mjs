import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const bundle = readFileSync(new URL("../../ha-music.js", import.meta.url), "utf8");

test("bundle subscribes to all backend streams", () => {
  assert.ok(bundle.includes("ha_music_studio/subscribe_lyrics"));
  assert.ok(bundle.includes("ha_music_studio/subscribe_queue"));
  assert.ok(bundle.includes("ha_music_studio/queue_command"));
  assert.ok(bundle.includes("ha_music_studio/subscribe"));
});

test("bundle has no deprecated queue or local audio paths", () => {
  for (const token of [
    "mass_queue",
    "ingress_session",
    "player_queues/get",
    "spectrum_audio_url",
  ]) {
    assert.equal(bundle.includes(token), false, token);
  }
});

test("bundle carries the protocol version", () => {
  assert.ok(bundle.includes("Backend protocol mismatch"));
});

test("bundle has no retired analysis or external lyric sources", () => {
  for (const token of ["ha_music_analysis", "netease_lyrics", "lyrics.ovh", "lrclib", "kugou"]) {
    assert.equal(bundle.includes(token), false, token);
  }
});

test("bundle ships theme, sound and fullscreen controls", () => {
  for (const token of ["ha-music-sfx", "requestFullscreen", "exitFullscreen", "sfxLaser"]) {
    assert.ok(bundle.includes(token), token);
  }
});
