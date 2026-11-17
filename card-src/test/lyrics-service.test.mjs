import assert from "node:assert/strict";
import test from "node:test";
import {
  globalTrackKey,
  lyricsQueryVariants,
  pickGlobalLyricsEntity,
} from "../src/lyrics-service.js";

test("lyricsQueryVariants 清洗标题并保留原始查询", () => {
  const queries = lyricsQueryVariants({
    title: "Alors on danse (Radio Edit)",
    artist: "Stromae (Live)",
  });
  assert.equal(queries[0].title, "Alors on danse");
  assert.equal(queries[0].artist, "Stromae");
  assert.ok(queries.some((item) => item.title === "Alors on danse (Radio Edit)"));
});

test("globalTrackKey 对同一曲目稳定、换曲目变化", () => {
  const state = {
    attributes: {
      media_title: "Neon River",
      media_artist: "Aurora Lab",
      media_album_name: "Signals",
      media_duration: 257,
      media_content_id: "library://track/1",
    },
  };
  assert.equal(globalTrackKey("media_player.a", state), globalTrackKey("media_player.a", state));
  assert.notEqual(
    globalTrackKey("media_player.a", state),
    globalTrackKey("media_player.b", state)
  );
});

test("pickGlobalLyricsEntity 优先正在播放的媒体播放器", () => {
  const hass = {
    states: {
      "media_player.idle": {
        state: "idle",
        attributes: { media_title: "Idle Track" },
      },
      "media_player.paused": {
        state: "paused",
        attributes: { media_title: "Paused Track" },
      },
      "media_player.playing": {
        state: "playing",
        attributes: { media_title: "Playing Track", mass_player_type: "player" },
      },
    },
  };
  assert.equal(pickGlobalLyricsEntity(hass, "media_player.idle"), "media_player.playing");
});

test("pickGlobalLyricsEntity 当前播放器已在播放时不被抢走", () => {
  const hass = {
    states: {
      "media_player.current": {
        state: "playing",
        attributes: { media_title: "Current", mass_player_type: "player" },
      },
      "media_player.other": {
        state: "playing",
        attributes: { media_title: "Other" },
      },
    },
  };
  assert.equal(pickGlobalLyricsEntity(hass, "media_player.current"), "media_player.current");
});

test("pickGlobalLyricsEntity 忽略无曲目元数据的待机实体", () => {
  const hass = {
    states: {
      "media_player.box": { state: "unknown", attributes: {} },
      "media_player.paused": {
        state: "paused",
        attributes: { media_title: "Remembered" },
      },
    },
  };
  assert.equal(pickGlobalLyricsEntity(hass, "media_player.box"), "media_player.paused");
});
