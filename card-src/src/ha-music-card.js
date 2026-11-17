import { LitElement, html, nothing } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { cardStyles } from "./styles.js";
import { icon } from "./icons.js";
import {
  CARD_NAME,
  CARD_TYPE,
  CARD_VERSION,
  FEATURES,
  THEMES,
  DEFAULT_THEME,
  translator,
  mediaClassLabel,
} from "./const.js";
import {
  clamp,
  formatTime,
  readMedia,
  readQueue,
  readMassQueueItems,
  readMaQueueDetails,
  hasFeature,
  normalizeArt,
  resolveArtUrl,
  friendlyName,
  colorTriplet,
  deterministicPalette,
  hexToHsl,
  mixHsl,
  hashString,
  visualizerFrame,
  canTapSpectrumAudio,
  normalizeSpectrumPlaylist,
  findSpectrumTrack,
  pickPlayingEntity,
  pickAutoFollowEntity,
} from "./util.js";
import { paletteFor } from "./palette.js";
import { installDocks, loadDockPref, saveDockPref, subscribeDockPref, uninstallDock, normalizeDockModes, normalizeDockEntities, normalizeDockThemes } from "./dock.js";
import { installLyricDock, uninstallLyricDock, loadLyricDockPref, saveLyricDockPref } from "./lyric-dock.js";
import { syncCoverSpin } from "./cover-spin.js";
import { syncFabEq } from "./fab-eq.js";
import { lyricIndex, lyricProgress, parseLyrics, pickLrclibResult } from "./lyrics.js";

const LYRICS_API = "/api/netease_lyrics/lyrics";
const LRCLIB_API = "https://lrclib.net/api";
const MOBILE_MEDIA =
  "(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (max-height: 500px)";

function isMobileUi() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return Boolean(window.matchMedia(MOBILE_MEDIA).matches);
}

// HA 的 media_position 是采样值，media_position_updated_at 才是采样时刻。
// 进度必须以采样时刻为锚点，否则状态更新延迟会被当成“歌曲还没播到那里”。
function positionAnchor(stamp, now = Date.now()) {
  const parsed = typeof stamp === "number" ? stamp : Date.parse(String(stamp || ""));
  if (!Number.isFinite(parsed)) return now;
  return Math.min(parsed, now);
}

const REPEAT_CYCLE = ["off", "all", "one"];
const DRAWER_ANIM_MS = 260;

function fireEvent(node, type, detail) {
  const event = new CustomEvent(type, {
    bubbles: true,
    composed: true,
    cancelable: false,
    detail,
  });
  node.dispatchEvent(event);
  return event;
}

function wavePath(width, height, wavelength, amplitude, phase) {
  const points = [];
  for (let x = 0; x <= width; x += 4) {
    const y =
      height / 2 +
      Math.sin((x / wavelength) * Math.PI * 2 + phase) * amplitude +
      Math.sin((x / (wavelength / 2)) * Math.PI * 2 + phase * 1.7) *
        (amplitude * 0.32);
    points.push(`${x.toFixed(1)},${y.toFixed(2)}`);
  }
  return `M${points.join(" L")}`;
}

function formatEntityState(state) {
  switch (state) {
    case "playing":
      return "playing";
    case "buffering":
      return "buffering";
    case "paused":
      return "paused";
    case "idle":
      return "idle";
    case "off":
      return "off";
    default:
      return "idle";
  }
}

class HaMusicCard extends LitElement {
  static get styles() {
    return cardStyles;
  }

  static get properties() {
    return {
      _config: { state: true },
      _width: { state: false },
      preview: { type: Boolean, attribute: false },
      editMode: { type: Boolean, attribute: false },
    };
  }

  constructor() {
    super();
    this._config = {};
    this._hass = undefined;
    this._activeEntity = "";
    this._sig = "";
    this._width = 0;
    this._height = 0;
    this._panel = false;
    this._autoPrevStates = null;
    this._manualSwitchAt = 0;
    this._fitPanelRaf = null;
    this._panelHeight = 0;
    this._tickTimer = null;
    this._toast = "";
    this._toastTimer = null;
    this._menu = null;
    this._seekPreview = null;
    this._seekPending = null;
    this._volumePreview = null;
    this._showRemaining = false;
    this._drawer = this._emptyDrawer();
    this._queueLoadToken = 0;
    this._artUrl = "";
    this._artSource = "";
    this._artApplied = "";
    this._artFailedSource = "";
    this._artSeq = 0;
    this._artSlot = 0;
    this._dockOwner = false;
    this._unsubscribeDockPref = null;
    this._lyricDockOwner = false;
    this._palette = null;
    this._paletteKey = "";
    this._resizeObserver = null;
    this._thumbPreview = false;
    this.preview = false;
    this.editMode = false;
    this._lyricsOpen = false;
    this._lyricsKey = "";
    this._lyrics = { status: "idle", lines: [], plain: [], instrumental: false, source: "" };
    this._lyricsActive = -1;
    this._lyricsScrolled = -2;
    this._lyricsAbort = null;
    this._lyricsOffset = this._loadLyricsOffset();
    this._lyricsCache = this._loadLyricsCache();
    this._lyricsBackendMissingAt = 0;
    this._coverPress = null;
    this._coverGesture = "";
    this._coverGestureTimer = null;
    this._coverSuppressClick = false;
    this._coverSuppressTimer = null;
    this._spectrumRaf = null;
    this._spectrumBars = [];
    this._spectrumLevels = [];
    this._spectrumLast = 0;
    this._spectrumKey = "";
    this._spectrumAudioUrl = "";
    this._spectrumPlaylistUrl = "";
    this._spectrumPlaylist = null;
    this._spectrumPlaylistAt = 0;
    this._spectrumPlaylistLoading = false;
    this._spectrumPlaylistAbort = null;
    this._spectrumPlaylistErrorAt = 0;
    this._spectrumResolvedUrl = "";
    this._spectrumTrack = null;
    this._audioShape = null;
    this._audioEl = null;
    this._audioCtx = null;
    this._audioAnalyser = null;
    this._audioSource = null;
    this._audioMute = null;
    this._audioBins = null;
    this._audioFailedUrl = "";
    this._audioZeroFrames = 0;
    this._audioPeak = 0;
    this._audioStartedAt = 0;
    this._audioGestureArmed = false;
    this._positionClock = null;
    // Music Assistant 音频分析（wave_form RMS 能量包络 + BPM）。
    // 通过 HA 侧 ha_music_analysis.get_track_analysis 服务取数；
    // 服务不可用时退回原来的程序化律动，不影响卡片加载。
    this._maAnalysis = null;
    this._maAnalysisKey = "";
    this._maAnalysisLoadingKey = "";
    this._maAnalysisFailedKey = "";
    this._maAnalysisFailedAt = 0;
    this._maAnalysisAt = 0;
  }

  /* ---------------- 生命周期 ---------------- */

  set hass(hass) {
    const previous = this._hass;
    this._hass = hass;
    if (!hass) return;
    this._autoSwitchToPlaying(hass);
    const entityId = this._eid();
    const state = hass.states?.[entityId];
    const attrs = state?.attributes || {};
    const trackKey = this._trackKey(state);
    const prior = this._positionClock;
    const trackChanged = Boolean(prior && prior.trackKey !== trackKey);
    // 换歌时播放器有时仍 report 上一首的 media_position；
    // 新曲目一律从 0 建立本地播放时钟，避免进度条/歌词跳到中段。
    const base = trackChanged ? 0 : Number(attrs.media_position) || 0;
    const stamp = attrs.media_position_updated_at || "";
    const now = Date.now();
    const resumed = Boolean(prior && prior.state !== state?.state);
    // 同一首播放中把采样时刻作为时钟起点，补上 HA 状态上报的延迟；
    // 换歌、恢复播放或没有时间戳时则从当前时刻开始。
    const anchor = trackChanged || resumed || !stamp ? now : positionAnchor(stamp, now);
    if (
      !prior ||
      trackChanged ||
      prior.entityId !== entityId ||
      prior.state !== state?.state ||
      prior.base !== base ||
      prior.stamp !== stamp
    ) {
      this._positionClock = {
        entityId,
        state: state?.state,
        trackKey,
        base,
        stamp,
        at: anchor,
      };
    }
    if (this._settleSeekPending(state, attrs, trackChanged)) this.requestUpdate();
    const sig = this._computeSig(hass);
    if (sig !== this._sig || previous === undefined) {
      this._sig = sig;
      this.requestUpdate();
    }
    this._syncTimer();
  }

  get hass() {
    return this._hass;
  }

  setConfig(config) {
    if (!config) throw new Error("ha-music: 配置不能为空");
    const list =
      Array.isArray(config.entities) && config.entities.length
        ? config.entities.filter(Boolean)
        : config.entity
          ? [config.entity]
          : [];
    if (!list.length) {
      throw new Error("ha-music: 需要配置 entity（media_player.*）或 entities 列表");
    }
    this._config = { ...config };
    const spectrumAudioUrl =
      typeof config.spectrum_audio_url === "string"
        ? config.spectrum_audio_url.trim()
        : "";
    const spectrumPlaylistUrl =
      typeof config.spectrum_playlist_url === "string"
        ? config.spectrum_playlist_url.trim()
        : "";
    if (
      spectrumAudioUrl !== this._spectrumAudioUrl ||
      spectrumPlaylistUrl !== this._spectrumPlaylistUrl
    ) {
      this._spectrumAudioUrl = spectrumAudioUrl;
      this._spectrumPlaylistUrl = spectrumPlaylistUrl;
      this._spectrumPlaylist = null;
      this._spectrumPlaylistAt = 0;
      this._spectrumPlaylistErrorAt = 0;
      this._spectrumPlaylistAbort?.abort?.();
      this._spectrumPlaylistAbort = null;
      this._spectrumResolvedUrl = "";
      this._spectrumTrack = null;
      this._audioFailedUrl = "";
      this._resetAudioShape();
      this._teardownAudioSpectrum();
    }
    if (!list.includes(this._activeEntity)) {
      this._activeEntity = list[0];
      this._palette = null;
      this._paletteKey = "";
      this._artUrl = "";
      this._artSource = "";
      this._artFailedSource = "";
      this._resetLyrics();
    }
    if (this._config.show_lyrics === false) this._lyricsOpen = false;
    this._sig = "";
    if (this._hass) this._sig = this._computeSig(this._hass);
    this._syncTimer();
    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();
    this._thumbPreview = this._isThumbnailPreview();
    this._onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      if (this._drawer.open) this._closeDrawer();
      else if (this._menu) {
        this._menu = null;
        this.requestUpdate();
      }
    };
    window.addEventListener("keydown", this._onKeyDown);
    // 手机/平板判定随时可能随旋转或窗口变化；变化时重新挂载全局悬浮层，
    // 只影响粗指针窄屏，桌面与平板仍保持原 UI。
    this._mobileMq =
      typeof window.matchMedia === "function" ? window.matchMedia(MOBILE_MEDIA) : null;
    this._onMobileChange = () => {
      this._installDock();
      this._installLyricDock();
    };
    if (this._mobileMq?.addEventListener) {
      this._mobileMq.addEventListener("change", this._onMobileChange);
    } else {
      this._mobileMq?.addListener?.(this._onMobileChange);
    }
    this._onSpectrumGesture = () => {
      if (this._spectrumPlaying() && (this._config?.visualizer || "bars") === "bars") {
        this._primeAudioSpectrum();
      }
    };
    this.addEventListener("pointerdown", this._onSpectrumGesture, { passive: true });
    this._unsubscribeDockPref?.();
    this._unsubscribeDockPref = subscribeDockPref(() => {
      // 任意一张卡片的编辑器改动都会广播到这里；重装全局迷你播放器，
      // 让同一页面/其他仪表盘里的卡片立即使用同一份开关、实体和主题。
      this._dockOwner = false;
      this._installDock();
      this.requestUpdate();
    });
    this._onViewportResize = () => this._queuePanelFit();
    window.addEventListener("resize", this._onViewportResize);
    window.visualViewport?.addEventListener("resize", this._onViewportResize);
    if (typeof ResizeObserver !== "undefined") {
      this._resizeObserver = new ResizeObserver((entries) => {
        const width = entries[0]?.contentRect?.width || 0;
        const height = entries[0]?.contentRect?.height || 0;
        const widthChanged = Math.abs(width - this._width) >= 1;
        const heightChanged = Math.abs(height - this._height) >= 1;
        this._width = width;
        this._height = height;
        const layout = this._config?.layout || "adaptive";
        if (widthChanged || (heightChanged && layout === "adaptive")) {
          if (layout === "adaptive") this.requestUpdate();
          else this._queuePanelFit();
        } else if (heightChanged) {
          this._queuePanelFit();
        }
      });
      this._resizeObserver.observe(this);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubscribeDockPref?.();
    this._unsubscribeDockPref = null;
    if (this._onMobileChange) {
      if (this._mobileMq?.removeEventListener) {
        this._mobileMq.removeEventListener("change", this._onMobileChange);
      } else {
        this._mobileMq?.removeListener?.(this._onMobileChange);
      }
      this._onMobileChange = null;
      this._mobileMq = null;
    }
    if (this._onKeyDown) {
      window.removeEventListener("keydown", this._onKeyDown);
      this._onKeyDown = null;
    }
    if (this._onViewportResize) {
      window.removeEventListener("resize", this._onViewportResize);
      window.visualViewport?.removeEventListener("resize", this._onViewportResize);
      this._onViewportResize = null;
    }
    if (this._onSpectrumGesture) {
      this.removeEventListener("pointerdown", this._onSpectrumGesture);
      this._onSpectrumGesture = null;
    }
    this._stopTimer();
    if (this._coverGestureTimer) clearTimeout(this._coverGestureTimer);
    if (this._coverSuppressTimer) clearTimeout(this._coverSuppressTimer);
    this._stopSpectrum();
    this._teardownAudioSpectrum();
    this._coverGestureTimer = null;
    this._coverSuppressTimer = null;
    this._coverPress = null;
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;
    if (this._fitPanelRaf) cancelAnimationFrame(this._fitPanelRaf);
    this._fitPanelRaf = null;
    if (this._toastTimer) clearTimeout(this._toastTimer);
    if (this._lyricsAbort) {
      this._lyricsAbort.abort();
      this._lyricsAbort = null;
    }
  }

  /* ---------------- 状态推导 ---------------- */

  _entities() {
    const config = this._config || {};
    const list =
      Array.isArray(config.entities) && config.entities.length
        ? config.entities
        : config.entity
          ? [config.entity]
          : [];
    return list.filter(Boolean);
  }

  _eid() {
    const list = this._entities();
    return this._activeEntity || list[0] || "";
  }

  _state(entityId = this._eid()) {
    return this._hass?.states?.[entityId];
  }

  _trackKey(state) {
    const attrs = state?.attributes || {};
    return [
      this._eid(),
      attrs.media_title || "",
      attrs.media_artist || "",
      attrs.media_album_name || "",
      attrs.media_duration || 0,
      attrs.media_content_id || "",
    ]
      .map((value) => String(value))
      .join("|");
  }

  _readMedia() {
    const state = this._state();
    const media = readMedia(state);
    if (state?.state === "playing") {
      const clock = this._positionClock;
      // 播放中以本地时钟为准：既处理没有 media_position_updated_at 的播放器，
      // 也避免换歌后沿用上一首的时间戳把进度算到中段。
      if (clock && clock.entityId === this._eid()) {
        const elapsed = Math.max(0, (Date.now() - clock.at) / 1000);
        const position = clock.base + elapsed;
        media.position = media.duration
          ? clamp(position, 0, media.duration)
          : Math.max(0, position);
      }
    }
    return media;
  }

  _computeSig(hass) {
    const entityId = this._eid();
    const state = hass.states?.[entityId];
    const attrs = state?.attributes || {};
    const keys = [
      "media_title",
      "media_artist",
      "media_album_name",
      "media_series_title",
      "entity_picture",
      "media_duration",
      "media_position",
      "media_position_updated_at",
      "media_metadata",
      "media_content_id",
      "volume_level",
      "is_volume_muted",
      "shuffle",
      "repeat",
      "source",
      "source_list",
      "sound_mode",
      "sound_mode_list",
      "supported_features",
      "group_members",
      "app_name",
      "queue",
      "media_track",
    ];
    const picked = {};
    for (const key of keys) {
      if (key in attrs) picked[key] = attrs[key];
    }
    const volumeEntity = this._config?.volume_entity;
    const volumeState = volumeEntity ? hass.states?.[volumeEntity]?.state : null;
    const others = this._entities().map((id) => {
      const item = hass.states?.[id];
      return [id, item?.state, item?.attributes?.entity_picture];
    });
    return JSON.stringify([
      entityId,
      state?.state,
      picked,
      volumeState,
      others,
      hass.language,
      this._config,
      this._menu,
      this._drawer.open,
      this._drawer.mode,
      this._drawer.cursor,
      this._drawer.items.length,
      this._drawer.loading,
      this._drawer.error,
      this._showRemaining,
      this._layoutKey(),
    ]);
  }

  _syncTimer() {
    const state = this._state()?.state;
    const shouldTick = state === "playing" || state === "buffering";
    if (shouldTick && !this._tickTimer) {
      this._tickTimer = setInterval(() => this.requestUpdate(), 500);
    } else if (!shouldTick) {
      this._stopTimer();
    }
  }

  _stopTimer() {
    if (this._tickTimer) {
      clearInterval(this._tickTimer);
      this._tickTimer = null;
    }
  }

  /* ---------------- 歌词 ---------------- */

  _lyricsEnabled() {
    return this._config?.show_lyrics !== false;
  }

  _resetLyrics() {
    if (this._lyricsAbort) {
      this._lyricsAbort.abort();
      this._lyricsAbort = null;
    }
    this._lyricsKey = "";
    this._lyricsOpen = false;
    this._lyricsActive = -1;
    this._lyricsScrolled = -2;
    this._lyrics = { status: "idle", lines: [], plain: [], instrumental: false, source: "" };
  }

  _loadLyricsOffset() {
    try {
      const raw = localStorage.getItem("ha-music-lyrics-offset");
      const value = Number(raw);
      return Number.isFinite(value) ? clamp(value, -5, 5) : 0;
    } catch (error) {
      return 0;
    }
  }

  _saveLyricsOffset() {
    try {
      localStorage.setItem(
        "ha-music-lyrics-offset",
        String(Number(this._lyricsOffset.toFixed(1)))
      );
    } catch (error) {
      /* localStorage 不可用时只保留当前会话 */
    }
  }

  _bumpLyricsOffset(delta) {
    this._lyricsOffset = clamp(
      Math.round((this._lyricsOffset + delta) * 10) / 10,
      -5,
      5
    );
    this._saveLyricsOffset();
    this._lyricsScrolled = -2;
    this.requestUpdate();
  }

  _loadLyricsCache() {
    const cache = new Map();
    try {
      localStorage.removeItem("ha-music-lyrics-cache-v3");
      localStorage.removeItem("ha-music-lyrics-cache-v4");
      const list = JSON.parse(
        localStorage.getItem("ha-music-lyrics-cache-v5") || "[]"
      );
      if (!Array.isArray(list)) return cache;
      for (const item of list) {
        if (!Array.isArray(item) || item.length !== 2) continue;
        const [key, value] = item;
        if (typeof key !== "string" || !value || value.status !== "ready") continue;
        cache.set(key, {
          status: "ready",
          lines: Array.isArray(value.lines) ? value.lines : [],
          plain: Array.isArray(value.plain) ? value.plain : [],
          instrumental: Boolean(value.instrumental),
          source: String(value.source || "歌词接口"),
        });
      }
    } catch (error) {
      return cache;
    }
    return cache;
  }

  _saveLyricsCache() {
    try {
      const list = [...this._lyricsCache.entries()].slice(-24);
      localStorage.setItem("ha-music-lyrics-cache-v5", JSON.stringify(list));
    } catch (error) {
      /* 忽略配额或隐私模式错误 */
    }
  }

  _lyricsPosition(position) {
    return Math.max(0, (Number(position) || 0) + this._lyricsOffset);
  }

  _cleanLyricsQuery(value) {
    return String(value || "")
      .replace(/\(.*?\)|\[.*?\]|（.*?）/g, "")
      .replace(/[\s\-_～〜]+/g, " ")
      .trim();
  }

  _lyricsSource() {
    const source = this._config?.lyrics_source;
    return source === "qq" || source === "wy" || source === "lrclib"
      ? source
      : "auto";
  }

  _lyricsQueries(media) {
    const rawTitle = Array.isArray(media.title) ? media.title[0] || "" : media.title || "";
    const rawArtist = Array.isArray(media.artist) ? media.artist[0] || "" : media.artist || "";
    const cleanTitle = this._cleanLyricsQuery(rawTitle);
    const cleanArtist = this._cleanLyricsQuery(rawArtist);
    const list = [
      { title: cleanTitle || rawTitle, artist: cleanArtist },
      { title: cleanTitle || rawTitle, artist: "" },
      { title: rawTitle, artist: rawArtist },
    ];
    const seen = new Set();
    return list.filter((item) => {
      if (!item.title) return false;
      const key = `${item.title}|${item.artist}`.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  async _refreshLyricsToken() {
    const auth = this._hass?.auth;
    if (typeof auth?.refreshAccessToken !== "function") return;
    try {
      await auth.refreshAccessToken();
    } catch (error) {
      /* 刷新失败时由下一次请求继续处理 */
    }
  }

  async _requestNeteaseLyrics(query, signal) {
    let lastError = null;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const token = this._hass?.auth?.data?.access_token;
        if (!token) throw new Error("歌词接口未认证");
        const url = new URL(LYRICS_API, window.location.origin);
        url.searchParams.set("title", query.title);
        url.searchParams.set("artist", query.artist || "");
        const lyricSource = this._lyricsSource();
        if (lyricSource !== "auto") url.searchParams.set("source", lyricSource);
        const response = await fetch(url.toString(), {
          signal,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
        });
        if (response.status === 401 && attempt < 2) {
          await this._refreshLyricsToken();
          await new Promise((resolve) => setTimeout(resolve, 500));
          continue;
        }
        // 后端集成缺失时接口是 404；不必对同一查询重复打三次。
        if (response.status === 404) {
          this._lyricsBackendMissingAt = Date.now();
          return null;
        }
        if (!response.ok) {
          lastError = new Error(`lyrics HTTP ${response.status}`);
          if (attempt < 2) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            continue;
          }
          break;
        }
        const data = await response.json();
        const raw = data?.lyrics;
        if (!raw || typeof raw !== "string") return null;
        const parsed = parseLyrics(raw);
        if (!parsed.lines.length && !parsed.plain.length && !parsed.instrumental) {
          return null;
        }
        const source =
          data?.source === "qq"
            ? "QQ音乐"
            : data?.source === "netease"
              ? "网易云"
              : "歌词接口";
        return { parsed, source };
      } catch (error) {
        if (error?.name === "AbortError") throw error;
        lastError = error;
        if (attempt < 2) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
    }
    throw lastError || new Error("歌词接口请求失败");
  }

  async _lrclibJson(path, params, signal) {
    const url = new URL(`${LRCLIB_API}/${path}`);
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && String(value).trim()) {
        url.searchParams.set(key, String(value));
      }
    }
    const local = new AbortController();
    const onAbort = () => local.abort();
    if (signal) {
      if (signal.aborted) throw new DOMException("Aborted", "AbortError");
      signal.addEventListener("abort", onAbort, { once: true });
    }
    const timer = setTimeout(() => local.abort(), 3000);
    try {
      const response = await fetch(url.toString(), {
        signal: local.signal,
        mode: "cors",
        headers: { Accept: "application/json" },
      });
      if (response.status === 404) return null;
      if (!response.ok) throw new Error(`lrclib HTTP ${response.status}`);
      return response.json();
    } catch (error) {
      if (error?.name === "AbortError") {
        if (signal?.aborted) throw error;
        return null; // 单次请求超时：让上层继续尝试下一个查询
      }
      throw error;
    } finally {
      clearTimeout(timer);
      if (signal) signal.removeEventListener("abort", onAbort);
    }
  }

  // LRCLIB 是纯在线同步歌词源，不需要 HA 后端集成；后端缺失/归档时作为兜底。
  async _requestLrclibLyrics(media, query, signal) {
    const rawTitle = Array.isArray(media.title) ? media.title[0] || "" : media.title || "";
    const rawArtist = Array.isArray(media.artist) ? media.artist[0] || "" : media.artist || "";
    const cleanTitle = this._cleanLyricsQuery(rawTitle) || rawTitle;
    const cleanArtist = this._cleanLyricsQuery(rawArtist) || rawArtist;
    const duration = Math.round(Number(media.duration) || 0);
    const exact = [];
    if (duration && cleanArtist) {
      exact.push({
        track_name: cleanTitle,
        artist_name: cleanArtist,
        ...(media.album ? { album_name: media.album } : {}),
        duration,
      });
      if (rawArtist !== cleanArtist) {
        exact.push({
          track_name: rawTitle,
          artist_name: rawArtist,
          ...(media.album ? { album_name: media.album } : {}),
          duration,
        });
      }
    }
    const searches = [];
    if (query.title) {
      searches.push({
        track_name: query.title,
        artist_name: query.artist || cleanArtist,
      });
    }
    searches.push({
      q: [rawTitle, cleanArtist || rawArtist].filter(Boolean).join(" "),
    });
    let lastError = null;
    for (const params of searches) {
      try {
        const results = await this._lrclibJson("search", params, signal);
        const match = pickLrclibResult(results, {
          title: query.title || rawTitle,
          artist: query.artist || rawArtist,
          duration: media.duration,
        });
        if (!match) continue;
        const parsed = this._lrclibParsed(match);
        if (parsed) return { parsed, source: "LRCLIB" };
      } catch (error) {
        if (error?.name === "AbortError") throw error;
        lastError = error;
      }
    }

    // 精确接口返回单曲且命中率最高；放在搜索之后，避免 CORS/限流时阻塞首屏。
    for (const params of exact) {
      try {
        const item = await this._lrclibJson("get", params, signal);
        if (!item) continue;
        const parsed = this._lrclibParsed(item);
        if (parsed) return { parsed, source: "LRCLIB" };
      } catch (error) {
        if (error?.name === "AbortError") throw error;
        lastError = error;
      }
    }
    if (lastError) throw lastError;
    return null;
  }

  async _requestLyricsOvh(media, query, signal) {
    const rawTitle = Array.isArray(media.title) ? media.title[0] || "" : media.title || "";
    const rawArtist = Array.isArray(media.artist) ? media.artist[0] || "" : media.artist || "";
    const artist = this._cleanLyricsQuery(query?.artist || rawArtist) || rawArtist;
    const title = this._cleanLyricsQuery(query?.title || rawTitle) || rawTitle;
    if (!artist || !title) return null;
    const local = new AbortController();
    const onAbort = () => local.abort();
    if (signal) {
      if (signal.aborted) throw new DOMException("Aborted", "AbortError");
      signal.addEventListener("abort", onAbort, { once: true });
    }
    const timer = setTimeout(() => local.abort(), 4500);
    try {
      const response = await fetch(
        `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`,
        {
          signal: local.signal,
          mode: "cors",
          headers: { Accept: "application/json" },
        }
      );
      if (response.status === 404) return null;
      if (!response.ok) throw new Error(`lyrics.ovh HTTP ${response.status}`);
      const data = await response.json();
      const parsed = parseLyrics(data?.lyrics || "");
      if (!parsed.lines.length && !parsed.plain.length) return null;
      return { parsed, source: "Lyrics.ovh" };
    } catch (error) {
      if (error?.name === "AbortError") {
        if (signal?.aborted) throw error;
        return null;
      }
      throw error;
    } finally {
      clearTimeout(timer);
      if (signal) signal.removeEventListener("abort", onAbort);
    }
  }

  _lrclibParsed(item) {
    if (!item) return null;
    if (item.instrumental && !item.syncedLyrics && !item.plainLyrics) {
      return { lines: [], plain: [], instrumental: true };
    }
    const raw = item.syncedLyrics || item.plainLyrics;
    if (typeof raw !== "string" || !raw.trim()) return null;
    const parsed = parseLyrics(raw);
    if (!parsed.lines.length && !parsed.plain.length && !parsed.instrumental) {
      return null;
    }
    return parsed;
  }

  _lyricsKeyFor(media) {
    return [
      this._cleanLyricsQuery(Array.isArray(media.title) ? media.title[0] : media.title),
      this._cleanLyricsQuery(Array.isArray(media.artist) ? media.artist[0] : media.artist),
      this._lyricsSource(),
    ]
      .join("|")
      .toLowerCase();
  }

  _setLyrics(key, lyrics, source) {
    if (key !== this._lyricsKey) return;
    this._lyrics = {
      status: "ready",
      lines: lyrics.lines || [],
      plain: lyrics.plain || [],
      instrumental: Boolean(lyrics.instrumental),
      source,
    };
    if (this._lyricsCache.size > 32) {
      this._lyricsCache.delete(this._lyricsCache.keys().next().value);
    }
    this._lyricsCache.set(key, this._lyrics);
    this._saveLyricsCache();
    this.requestUpdate();
  }

  _syncCoverEq() {
    const canvas = this.renderRoot?.querySelector?.(".hm-cover-eq");
    const cover = this.renderRoot?.querySelector?.(".hm-cover");
    if (!canvas || !cover) return;
    const state = this._state();
    const media = this._readMedia();
    const width = Math.max(
      72,
      Math.round(cover.getBoundingClientRect().width || this._coverPx(this._layoutKey())),
    );
    const size = Math.min(360, width + 48);
    if (canvas.style.width !== `${size}px`) canvas.style.width = `${size}px`;
    if (canvas.style.height !== `${size}px`) canvas.style.height = `${size}px`;
    const glow = this.renderRoot?.querySelector?.(".hm-cover-eq-glow");
    if (glow) {
      const ring = Math.round(width + 18);
      if (glow.style.width !== `${ring}px`) glow.style.width = `${ring}px`;
      if (glow.style.height !== `${ring}px`) glow.style.height = `${ring}px`;
      glow.style.aspectRatio = "1 / 1";
    }
    const theme = THEMES[this._themeKey()];
    const customAccent = String(this._config?.accent || "");
    const accent = [
      /^#[0-9a-f]{3,8}$/i.test(customAccent) ? customAccent : theme.accent[0],
      theme.accent[1],
    ];
    const reduceMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const first = (value) => (Array.isArray(value) ? value[0] || "" : value || "");
    const active = state?.state === "playing" && !reduceMotion;
    const wrap = cover.parentElement;
    if (wrap) wrap.dataset.eq = active ? "true" : "false";
    syncFabEq(canvas, wrap, {
      playing: active,
      visible: true,
      position: this._seekPreview ?? media.position,
      size,
      innerRadius: width / 2 + 3,
      lineWidth: size >= 220 ? 2.2 : 2,
      bars: width >= 150 ? 64 : 48,
      target: cover,
      applyShadow: false,
      accent,
      title: first(media.title),
      artist: first(media.artist),
      album: first(media.album),
    });
  }

  _maybeLoadLyrics() {
    if (!this._lyricsEnabled() || this._thumbMode()) return;
    const media = this._readMedia();
    if (!media.title) {
      if (this._lyrics.status !== "idle") {
        this._lyrics = { status: "idle", lines: [], plain: [], instrumental: false, source: "" };
        this._lyricsKey = "";
        this.requestUpdate();
      }
      return;
    }
    const key = this._lyricsKeyFor(media);
    if (key === this._lyricsKey) return;

    if (this._lyricsAbort) {
      this._lyricsAbort.abort();
      this._lyricsAbort = null;
    }
    this._lyricsKey = key;

    const cached = this._lyricsCache.get(key);
    if (cached) {
      this._lyrics = { ...cached };
      this.requestUpdate();
      return;
    }

    this._lyrics = {
      status: "loading",
      lines: [],
      plain: [],
      instrumental: false,
      source: "歌词接口",
    };
    this.requestUpdate();
    this._fetchLyrics(media, key);
  }

  async _fetchLyrics(media, key) {
    const controller = new AbortController();
    this._lyricsAbort = controller;
    const timer = setTimeout(() => controller.abort(), 20000);
    let lastError = null;
    try {
      const source = this._lyricsSource();
      const backendMissing =
        this._lyricsBackendMissingAt &&
        Date.now() - this._lyricsBackendMissingAt < 10 * 60 * 1000;
      if (source !== "lrclib" && !backendMissing) {
        for (const query of this._lyricsQueries(media)) {
          if (controller.signal.aborted || key !== this._lyricsKey) return;
          try {
            const result = await this._requestNeteaseLyrics(query, controller.signal);
            if (controller.signal.aborted || key !== this._lyricsKey) return;
            if (result) {
              this._setLyrics(key, result.parsed, result.source);
              return;
            }
            if (this._lyricsBackendMissingAt) break;
          } catch (error) {
            if (error?.name === "AbortError") throw error;
            lastError = error;
          }
        }
      }

      // QQ/网易云后端不可用（例如 netease_lyrics 集成缺失）时回退到 LRCLIB。
      // 只跑一次：LRCLIB 内部已带清洗标题/原始标题/歌手三种检索策略。
      const lrQuery = this._lyricsQueries(media)[0];
      if (lrQuery) {
        try {
          const result = await this._requestLrclibLyrics(media, lrQuery, controller.signal);
          if (controller.signal.aborted || key !== this._lyricsKey) return;
          if (result) {
            this._setLyrics(key, result.parsed, result.source);
            return;
          }
        } catch (error) {
          if (error?.name === "AbortError") throw error;
          lastError = error;
        }
      }

      // LRCLIB 没有收录时，再用 Lyrics.ovh 的纯文本歌词兜底；自动模式才启用。
      if (source === "auto" || source === "") {
        try {
          const result = await this._requestLyricsOvh(media, lrQuery, controller.signal);
          if (controller.signal.aborted || key !== this._lyricsKey) return;
          if (result) {
            this._setLyrics(key, result.parsed, result.source);
            return;
          }
        } catch (error) {
          if (error?.name === "AbortError") throw error;
          lastError = error;
        }
      }
      if (key !== this._lyricsKey) return;
      this._lyrics = {
        status: lastError ? "error" : "none",
        lines: [],
        plain: [],
        instrumental: false,
        source: "歌词接口",
      };
      this.requestUpdate();
    } catch (error) {
      if (key !== this._lyricsKey) return;
      if (error?.name === "AbortError") {
        this._lyrics = {
          status: "error",
          lines: [],
          plain: [],
          instrumental: false,
          source: "歌词接口",
        };
        this.requestUpdate();
        return;
      }
      this._lyrics = {
        status: "error",
        lines: [],
        plain: [],
        instrumental: false,
        source: "歌词接口",
      };
      this.requestUpdate();
    } finally {
      clearTimeout(timer);
      if (this._lyricsAbort === controller) this._lyricsAbort = null;
    }
  }

  _sideLyricsVisible() {
    if (!this._lyricsEnabled() || this._thumbMode() || this._lyricsOpen) return false;
    if (this._layoutKey() !== "full") return false;
    return (this._width || 0) >= 640 && (this._height || 0) >= 480;
  }

  _toggleLyrics() {
    this._lyricsOpen = !this._lyricsOpen;
    this._lyricsScrolled = -2;
    if (this._lyricsOpen) {
      this._lyricsActive = -1;
      this._maybeLoadLyrics();
    }
    this.requestUpdate();
  }

  _retryLyrics() {
    this._lyricsKey = "";
    this._lyricsAbort?.abort();
    this._lyricsAbort = null;
    this._lyricsOpen = true;
    this._maybeLoadLyrics();
    this.requestUpdate();
  }

  _layoutKey() {
    if (this._thumbMode()) return "full";
    if (this._panel) return "full";
    const requested = this._config?.layout || "adaptive";
    if (requested === "adaptive") {
      const width = this._width;
      const height = this._height;
      if (!width) return "full";
      // 网格卡片可能很矮（例如 6 列 × 2 行）：只按宽度判断会把大卡片
      // 塞进矮格子里，导致封面/控制条被裁掉。这里同时看可用高度。
      // 卡片选择器可能是 280×600 这种窄高比例：此时不能用 mini，
      // 否则只剩中间一行控制、上下大片空白；宽度够且高度富余时走纵向 full。
      if (width >= 240 && height >= 520 && width < 520) return "full";
      if (width < 340 && (!height || height < 190)) return "mini";
      if (width < 460 || (height && height < 300)) return "compact";
      return "full";
    }
    return ["full", "compact", "mini"].includes(requested) ? requested : "full";
  }

  _coverPx(layout) {
    const height = this._height || 0;
    if (this._thumbMode()) {
      const tier = this._thumbTier();
      if (tier === "lg") return Math.round(Math.min(260, Math.max(160, height * 0.34)));
      if (tier === "md") {
        const width = this._width || 0;
        return Math.round(
          Math.min(180, width ? width * 0.45 : 180, Math.max(96, height * 0.32))
        );
      }
      return Math.round(Math.min(120, Math.max(64, height * 0.30)));
    }
    if (layout === "mini") return 44;
    if (layout === "compact") {
      return Math.round(Math.min(88, Math.max(52, height * 0.26)));
    }
    return Math.round(Math.min(178, Math.max(76, height * 0.22)));
  }

  _tight() {
    if (this._thumbMode()) return false;
    return this._layoutKey() === "compact" && (this._height || 0) < 270;
  }

  _styleVars() {
    return {
      ...this._themeVars(),
      "--hm-cover-size": `${this._coverPx(this._layoutKey())}px`,
    };
  }

  _themeKey() {
    const theme = this._config?.theme;
    return theme && THEMES[theme] ? theme : DEFAULT_THEME;
  }

  _themeVars() {
    const theme = THEMES[this._themeKey()];
    const seed = this._paletteKey || this._eid() || "ha-music";
    const fallback = deterministicPalette(seed);
    const palette = this._palette;
    const customAccent = this._config?.accent;
    const usePalette = this._config?.palette !== false;

    // 主色锁定主题（保证五种主题辨识度），次色与氛围光混入封面取色
    let a1 = theme.accent[0];
    let a2 = theme.accent[1];
    let rgb1 = colorTriplet(a1);
    let rgb2 = colorTriplet(a2);
    let glowRgb = rgb1;
    const base2 = hexToHsl(theme.accent[1]);
    const fallback2 = hexToHsl(fallback.a2);

    if (usePalette) {
      if (palette) {
        const mixed = mixHsl(base2, { h: palette.h2, s: palette.s2, l: palette.l2 }, 0.5);
        a2 = mixed.css;
        rgb2 = mixed.rgb;
        glowRgb = palette.rgb1;
      } else if (fallback2) {
        const mixed = mixHsl(base2, fallback2, 0.35);
        a2 = mixed.css;
        rgb2 = mixed.rgb;
      }
    }

    if (customAccent) {
      a1 = customAccent;
      rgb1 = colorTriplet(customAccent, rgb1);
      if (!usePalette) glowRgb = rgb1;
    }

    return {
      "--hm-base": theme.base,
      "--hm-a1": a1,
      "--hm-a2": a2,
      "--hm-a1-rgb": rgb1,
      "--hm-a2-rgb": rgb2,
      "--hm-glow-rgb": glowRgb,
    };
  }

  _volumeInfo(media) {
    const volumeEntity = this._config?.volume_entity;
    const state = volumeEntity ? this._hass?.states?.[volumeEntity] : undefined;
    if (state) {
      const id = state.entity_id;
      if (id.startsWith("media_player.")) {
        return {
          domain: "media_player",
          entityId: id,
          level: Number(state.attributes?.volume_level ?? 0),
          muted: Boolean(state.attributes?.is_volume_muted),
          supported: true,
          external: true,
        };
      }
      if (id.startsWith("number.")) {
        const value = Number(state.state);
        if (Number.isFinite(value)) {
          return {
            domain: "number",
            entityId: id,
            level: clamp(value / (state.attributes?.max || 100), 0, 1),
            muted: false,
            supported: true,
            external: true,
          };
        }
      }
      if (id.startsWith("input_number.")) {
        const value = Number(state.state);
        if (Number.isFinite(value)) {
          return {
            domain: "input_number",
            entityId: id,
            level: clamp(value / (state.attributes?.max || 100), 0, 1),
            muted: false,
            supported: true,
            external: true,
          };
        }
      }
    }
    const state0 = this._state();
    const native =
      Number.isFinite(media.volume) ||
      hasFeature(state0, FEATURES.VOLUME_SET) ||
      hasFeature(state0, FEATURES.VOLUME_MUTE);
    return {
      domain: "media_player",
      entityId: this._eid(),
      level: Number.isFinite(media.volume) ? media.volume : 0,
      muted: media.muted,
      supported: native,
      external: false,
    };
  }

  _repeatValue() {
    const raw = this._state()?.attributes?.repeat;
    return ["off", "all", "one"].includes(raw) ? raw : "off";
  }

  /* ---------------- 交互 ---------------- */

  _call(service, data, domain = "media_player", entityId) {
    const hass = this._hass;
    if (!hass?.callService) return Promise.resolve();
    const target = entityId ?? this._eid();
    try {
      const result = hass.callService(domain, service, {
        entity_id: target,
        ...data,
      });
      return Promise.resolve(result);
    } catch (err) {
      this._notify(err?.message || String(err));
      return Promise.reject(err);
    }
  }

  _guard(promise) {
    Promise.resolve(promise).catch((err) => {
      const message = err?.message || String(err);
      this._notify(message.length > 60 ? message.slice(0, 60) : message);
    });
  }

  _notify(message) {
    this._toast = message || "";
    this.requestUpdate();
    if (this._toastTimer) clearTimeout(this._toastTimer);
    if (message) {
      this._toastTimer = setTimeout(() => {
        this._toast = "";
        this.requestUpdate();
      }, 3600);
    }
  }

  _togglePlay() {
    const state = this._state()?.state;
    const playing = state === "playing" || state === "buffering";
    if (playing) this._pauseAudioSpectrum();
    else this._primeAudioSpectrum();
    this._guard(this._call(playing ? "media_pause" : "media_play"));
  }

  _skip(direction) {
    this._primeAudioSpectrum();
    this._guard(this._call(direction === "next" ? "media_next_track" : "media_previous_track"));
  }

  _coverCue(gesture) {
    this._coverGesture = gesture;
    if (this._coverGestureTimer) clearTimeout(this._coverGestureTimer);
    this._coverGestureTimer = setTimeout(() => {
      if (this._coverGesture === gesture) {
        this._coverGesture = "";
        this.requestUpdate();
      }
    }, 420);
    this.requestUpdate();
  }

  _coverSwipe(direction) {
    this._coverCue(direction);
    this._skip(direction);
  }

  _onCoverPointerDown(event) {
    if (this._thumbMode() || (event.pointerType === "mouse" && event.button !== 0)) return;
    this._coverSuppressClick = false;
    if (this._coverSuppressTimer) clearTimeout(this._coverSuppressTimer);
    this._coverPress = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      at: Date.now(),
      moved: false,
      captured: false,
    };
  }

  _onCoverPointerMove(event) {
    const press = this._coverPress;
    if (!press || press.id !== event.pointerId) return;
    const dx = event.clientX - press.x;
    const dy = event.clientY - press.y;
    if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      press.moved = true;
      if (!press.captured) {
        press.captured = true;
        try {
          event.currentTarget.setPointerCapture(event.pointerId);
        } catch (error) {
          /* 忽略不支持 pointer capture 的浏览器 */
        }
      }
      if (event.cancelable) event.preventDefault();
    }
  }

  _onCoverPointerUp(event) {
    const press = this._coverPress;
    if (!press || press.id !== event.pointerId) return;
    this._coverPress = null;
    const dx = event.clientX - press.x;
    const dy = event.clientY - press.y;
    const horizontal = Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy) * 1.25;
    if (horizontal) {
      this._coverSuppressClick = true;
      if (this._coverSuppressTimer) clearTimeout(this._coverSuppressTimer);
      this._coverSuppressTimer = setTimeout(() => {
        this._coverSuppressClick = false;
      }, 450);
      this._coverSwipe(dx < 0 ? "next" : "prev");
      return;
    }
    if (press.moved || Math.hypot(dx, dy) > 12) {
      this._coverSuppressClick = true;
      if (this._coverSuppressTimer) clearTimeout(this._coverSuppressTimer);
      this._coverSuppressTimer = setTimeout(() => {
        this._coverSuppressClick = false;
      }, 450);
    }
  }

  _onCoverPointerCancel() {
    this._coverPress = null;
  }

  _onCoverClick() {
    if (this._thumbMode()) return;
    if (this._coverSuppressClick) {
      this._coverSuppressClick = false;
      return;
    }
    this._coverCue("tap");
    this._togglePlay();
  }

  _power() {
    const state = this._state()?.state;
    const off = state === "off" || state === "standby";
    this._guard(this._call(off ? "turn_on" : "turn_off"));
  }

  _shuffle() {
    const shuffle = Boolean(this._state()?.attributes?.shuffle);
    this._guard(this._call("shuffle_set", { shuffle: !shuffle }));
  }

  _repeat() {
    const current = this._repeatValue();
    const index = REPEAT_CYCLE.indexOf(current);
    const next = REPEAT_CYCLE[(index + 1) % REPEAT_CYCLE.length];
    this._guard(this._call("repeat_set", { repeat: next }));
  }

  _seekTo(seconds) {
    if (!Number.isFinite(seconds)) return Promise.resolve(false);
    const promise = this._call("media_seek", { seek_position: seconds });
    this._guard(promise);
    return promise;
  }

  _settleSeekPending(state, attrs, trackChanged) {
    const pending = this._seekPending;
    if (!pending) return false;
    const position = Number(attrs?.media_position);
    const stampChanged =
      String(attrs?.media_position_updated_at || "") !== pending.stamp;
    const moved = Number.isFinite(position) && Math.abs(position - pending.from) > 1;
    const reached = Number.isFinite(position) && Math.abs(position - pending.value) <= 2;
    const expired = Date.now() - pending.at > 8000;
    if (!state || trackChanged || expired || (reached && (stampChanged || moved))) {
      this._seekPending = null;
      this._seekPreview = null;
      return true;
    }
    return false;
  }

  _onSeekInput(event) {
    if (!hasFeature(this._state(), FEATURES.SEEK)) return;
    const input = event.target;
    const value = Number(input.value);
    this._seekPreview = value;
    const duration = this._readMedia().duration;
    input.style.setProperty(
      "--pct",
      `${duration ? clamp((value / duration) * 100, 0, 100) : 0}%`
    );
  }

  _onSeekCommit(event) {
    if (!hasFeature(this._state(), FEATURES.SEEK)) {
      this.requestUpdate();
      return;
    }
    const value = Number(event.target.value);
    const state = this._state();
    const attrs = state?.attributes || {};
    this._seekPreview = value;
    this._seekPending = {
      value,
      from: Number(attrs.media_position) || 0,
      stamp: String(attrs.media_position_updated_at || ""),
      trackKey: this._trackKey(state),
      at: Date.now(),
    };
    const pending = this._seekPending;
    this._seekTo(value).catch(() => {
      if (this._seekPending !== pending) return;
      this._seekPending = null;
      this._seekPreview = null;
      this.requestUpdate();
    });
    this.requestUpdate();
  }

  _onVolumeInput(event) {
    const value = Number(event.target.value) / 100;
    this._volumePreview = value;
    event.target.style.setProperty("--pct", `${value * 100}%`);
  }

  _onVolumeCommit(event) {
    const volume = clamp(Number(event.target.value) / 100, 0, 1);
    this._volumePreview = null;
    const info = this._volumeInfo(this._readMedia());
    if (info.domain === "media_player") {
      this._guard(
        this._call("volume_set", { volume_level: volume }, "media_player", info.entityId)
      );
    } else {
      const state = this._hass?.states?.[info.entityId];
      const max = Number(state?.attributes?.max ?? 100);
      const min = Number(state?.attributes?.min ?? 0);
      this._guard(
        this._call(
          "set_value",
          { value: Math.round(min + volume * (max - min)) },
          info.domain,
          info.entityId
        )
      );
    }
    this.requestUpdate();
  }

  _toggleMute() {
    const media = this._readMedia();
    const info = this._volumeInfo(media);
    if (info.external) {
      if (info.domain === "media_player") {
        this._guard(
          this._call("volume_mute", { is_volume_muted: !info.muted }, "media_player", info.entityId)
        );
      } else {
        this._notify(translator(this._hass?.language)("volumeEntityMissing"));
      }
      return;
    }
    this._guard(this._call("volume_mute", { is_volume_muted: !media.muted }));
  }

  _selectSource(source) {
    this._menu = null;
    this._guard(this._call("select_source", { source }));
    this.requestUpdate();
  }

  _selectSoundMode(mode) {
    this._menu = null;
    this._guard(this._call("select_sound_mode", { sound_mode: mode }));
    this.requestUpdate();
  }

  _leaveGroup() {
    this._guard(this._call("unjoin"));
  }

  _callMassQueue(service, data) {
    const hass = this._hass;
    if (!hass?.callService) return Promise.resolve();
    try {
      const result = hass.callService("mass_queue", service, {
        entity: this._eid(),
        ...data,
      });
      return Promise.resolve(result);
    } catch (error) {
      this._notify(error?.message || String(error));
      return Promise.reject(error);
    }
  }

  async _playQueueItem(item) {
    const queueId =
      this._queueQueueId || this._state()?.attributes?.active_queue || "";
    if (item?.queueItemId && queueId) {
      const played = await this._playMaApiItem(queueId, item.queueItemId);
      if (played) {
        this._drawer = {
          ...this._drawer,
          items: (this._drawer?.items || []).map((entry) => ({
            ...entry,
            active: entry.queueItemId === item.queueItemId,
          })),
        };
        this.requestUpdate();
        return;
      }
    }
    const massQueueReady = Boolean(
      this._hass?.services?.mass_queue?.play_queue_item
    );
    if (item?.queueItemId && massQueueReady) {
      this._guard(
        this._callMassQueue("play_queue_item", { queue_item_id: item.queueItemId })
      );
      this._drawer = {
        ...this._drawer,
        items: (this._drawer.items || []).map((entry) => ({
          ...entry,
          active: entry.queueItemId === item.queueItemId,
        })),
      };
      this.requestUpdate();
      return;
    }
    if (!item?.contentId) {
      this._notify(translator(this._hass?.language)("queueEmpty"));
      return;
    }
    this._guard(
      this._call("play_media", {
        media_content_id: item.contentId,
        media_content_type: item.contentType || "music",
      })
    );
  }

  _playBrowseItem(item) {
    if (!item?.contentId) return;
    this._guard(
      this._call("play_media", {
        media_content_id: item.contentId,
        media_content_type: item.contentType || "music",
      })
    );
  }

  _autoSwitchToPlaying(hass) {
    const list = this._entities();
    if (list.length < 2) return;
    const first = !this._autoPrevStates;
    const snapshot = {};
    for (const entityId of list) {
      snapshot[entityId] = hass?.states?.[entityId]?.state || "";
    }
    const target = pickAutoFollowEntity(
      hass,
      list,
      this._eid(),
      this._autoPrevStates
    );
    this._autoPrevStates = snapshot;
    if (!target) return;
    // 手动切换后的短暂保护：避免点完待机播放器又被播放事件立刻抢回。
    if (!first && Date.now() - this._manualSwitchAt < 15000) return;
    this._switchEntity(target, false);
  }

  _switchEntity(entityId, manual = false) {
    if (entityId === this._activeEntity) return;
    if (manual) this._manualSwitchAt = Date.now();
    this._activeEntity = entityId;
    this._palette = null;
    this._paletteKey = "";
    this._artUrl = "";
    this._artSource = "";
    this._artFailedSource = "";
    this._menu = null;
    this._seekPreview = null;
    this._seekPending = null;
    this._resetLyrics();
    this._syncTimer();
    this._sig = this._computeSig(this._hass);
    this.requestUpdate();
  }

  _moreInfo() {
    fireEvent(this, "hass-more-info", { entityId: this._eid() });
  }

  _maEnabled() {
    const value = this._config?.music_assistant;
    if (value === false) return false;
    if (value === true || (typeof value === "string" && value.trim())) return true;
    if (this._hass?.services?.music_assistant?.play_media) return true;
    const hasMassAttr = this._entities().some((id) => {
      const attrs = this._hass?.states?.[id]?.attributes || {};
      return Object.keys(attrs).some((key) => key.startsWith("mass_"));
    });
    if (hasMassAttr) return true;
    const panels = this._hass?.panels || {};
    return Object.keys(panels).some((key) => {
      const panel = panels[key] || {};
      return (
        panel.component_name === "music_assistant" ||
        /music[-_ ]?assistant/i.test(panel.url_path || key) ||
        /music\s*assistant/i.test(panel.title || "")
      );
    });
  }

  _isMaPlayer(entityId = this._eid()) {
    const attrs = this._state(entityId)?.attributes || {};
    return Object.keys(attrs).some((key) => key.startsWith("mass_"));
  }

  _maUrl() {
    const value = this._config?.music_assistant;
    if (value === false) return "";
    if (typeof value === "string" && value.trim()) return value.trim();

    // 优先用 HA 实际注册的面板路径（加载项 ingress 的前缀因实例而异）
    const panels = this._hass?.panels || {};
    for (const key of Object.keys(panels)) {
      const panel = panels[key] || {};
      const path = panel.url_path || key;
      if (
        panel.component_name === "music_assistant" ||
        /music[-_ ]?assistant/i.test(path) ||
        /music\s*assistant/i.test(panel.title || "")
      ) {
        return `/${path}`;
      }
    }

    const looksLikeMA = this._entities().some((id) => {
      const attrs = this._hass?.states?.[id]?.attributes || {};
      return Object.keys(attrs).some((key) => key.startsWith("mass_"));
    });
    if (looksLikeMA || value === true) return "/music-assistant";
    return "";
  }

  _openAssistant() {
    if (this._drawer?.open) this._closeDrawer();
    const url = this._maUrl();
    if (!url) return;
    if (/^(https?:)?\/\//i.test(url)) {
      window.open(url, "_blank", "noopener");
      return;
    }
    const path = url.startsWith("/") ? url : `/${url}`;
    try {
      window.history.pushState(null, "", path);
      window.dispatchEvent(
        new Event("location-changed", { bubbles: true, composed: true })
      );
    } catch (error) {
      window.location.href = path;
    }
  }

  _onCardClick(event) {
    if (!this._menu) return;
    const path = event.composedPath?.() || [];
    const insideMenu = path.some(
      (node) =>
        node?.classList?.contains?.("hm-menu") ||
        node?.classList?.contains?.("hm-chip")
    );
    if (!insideMenu) {
      this._menu = null;
      this.requestUpdate();
    }
  }

  /* ---------------- 抽屉 ---------------- */

  _emptyDrawer() {
    return {
      open: false,
      mode: null,
      nodes: [],
      cursor: -1,
      items: [],
      title: "",
      loading: false,
      error: "",
    };
  }

  _scrollQueueToActive() {
    const root = this.shadowRoot;
    const body = root?.querySelector(".hm-drawer-body");
    const active = root?.querySelector('.hm-list-item[data-active="true"]');
    if (!body || !active) return;
    const top = active.offsetTop - body.offsetTop;
    body.scrollTop = Math.max(
      0,
      top - body.clientHeight / 2 + active.offsetHeight / 2
    );
  }

  _pickQueueResponse(response) {
    if (!response) return null;
    if (Array.isArray(response)) return response;
    const direct = response[this._eid()] ?? response.entity ?? response;
    if (Array.isArray(direct)) return direct;
    return direct && typeof direct === "object" ? direct : null;
  }

  async _serviceResponse(domain, service, data) {
    const hass = this._hass;
    if (!hass?.callWS) throw new Error("Service response unavailable");
    const result = await hass.callWS({
      type: "call_service",
      domain,
      service,
      service_data: data,
      return_response: true,
    });
    return result?.response ?? null;
  }

  async _fetchMassQueueItems() {
    const limit = clamp(Number(this._config?.max_queue) || 60, 20, 500);
    try {
      const response = await this._serviceResponse("mass_queue", "get_queue_items", {
        entity: this._eid(),
        limit,
        limit_before: Math.min(15, limit),
        limit_after: limit,
      });
      const items = this._pickQueueResponse(response);
      return Array.isArray(items) ? items : null;
    } catch {
      return null;
    }
  }

  async _fetchMaQueueDetails() {
    try {
      const response = await this._serviceResponse("music_assistant", "get_queue", {
        entity_id: this._eid(),
      });
      return this._pickQueueResponse(response);
    } catch {
      return null;
    }
  }

  // Music Assistant 的完整队列不在 HA 的 get_queue 响应里，但可以经
  // Supervisor Ingress 直接连 MA 的 websocket。这样无需安装 mass_queue，
  // 也能拿到完整队列并精确切歌；失败时再回退到 HA 服务。
  async _maIngressPath() {
    if (this._maIngressPathValue) return this._maIngressPathValue;
    if (this._maIngressPromise) return this._maIngressPromise;
    this._maIngressPromise = (async () => {
      const hass = this._hass;
      if (!hass?.callWS) return "";
      try {
        const list = await hass.callWS({
          type: "supervisor/api",
          endpoint: "/addons",
          method: "get",
        });
        const addons = Array.isArray(list?.addons) ? list.addons : [];
        const candidates = addons.filter(
          (addon) =>
            addon &&
            addon.state === "started" &&
            /music\s*assistant/i.test(`${addon.name || ""} ${addon.slug || ""}`)
        );
        for (const addon of candidates) {
          const info = await hass.callWS({
            type: "supervisor/api",
            endpoint: `/addons/${encodeURIComponent(addon.slug)}/info`,
            method: "get",
          });
          if (info?.ingress_url) {
            this._maIngressPathValue = String(info.ingress_url);
            await this._maGrantIngressSession(addon.slug, this._maIngressPathValue);
            return this._maIngressPathValue;
          }
        }
      } catch {
        // 非管理员、未安装加载项或旧版 HA 都可能没有 supervisor/api。
      }
      return "";
    })();
    try {
      return await this._maIngressPromise;
    } finally {
      this._maIngressPromise = null;
    }
  }

  async _maGrantIngressSession(slug, path) {
    if (!slug || !path || !this._hass?.callWS) return;
    try {
      const result = await this._hass.callWS({
        type: "supervisor/ingress/session",
        slug: String(slug),
      });
      const token = result?.session || result?.ingress_session || "";
      if (!token || typeof document === "undefined") return;
      const cookiePath = path.endsWith("/") ? path : `${path}/`;
      const secure = window.location.protocol === "https:" ? "; Secure" : "";
      document.cookie = `ingress_session=${token}; Path=${cookiePath}; SameSite=Strict${secure}`;
    } catch {
      // 没有 ingress 权限时继续尝试；失败后由 _fetchMaApiQueue 回退。
    }
  }

  _maOpenSocket(path) {
    return new Promise((resolve, reject) => {
      let socket;
      try {
        const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
        const base = path.startsWith("/") ? path : `/${path}`;
        const url = `${protocol}//${window.location.host}${base}${
          base.endsWith("/") ? "" : "/"
        }ws`;
        socket = new WebSocket(url);
      } catch (error) {
        reject(error);
        return;
      }
      const timer = setTimeout(() => {
        try {
          socket.close();
        } catch {
          // ignore
        }
        reject(new Error("Music Assistant websocket timeout"));
      }, 10000);
      socket.addEventListener("open", () => {
        clearTimeout(timer);
        resolve(socket);
      });
      socket.addEventListener("error", () => {
        clearTimeout(timer);
        reject(new Error("Music Assistant websocket failed"));
      });
      socket.addEventListener("close", () => {
        clearTimeout(timer);
      });
    });
  }

  _maSend(socket, command, args = {}, timeout = 15000) {
    return new Promise((resolve, reject) => {
      const messageId = `hm${(this._maMsgSeq = (this._maMsgSeq || 0) + 1)}`;
      let settled = false;
      const cleanup = () => {
        clearTimeout(timer);
        socket.removeEventListener("message", onMessage);
        socket.removeEventListener("close", onClose);
      };
      const fail = (error) => {
        if (settled) return;
        settled = true;
        cleanup();
        reject(error);
      };
      const timer = setTimeout(() => fail(new Error("Music Assistant API timeout")), timeout);
      const onMessage = (event) => {
        let message;
        try {
          message = JSON.parse(event.data);
        } catch {
          return;
        }
        if (!message || message.message_id !== messageId) return;
        if (message.error || message.error_code) {
          fail(
            new Error(
              message.details ||
                message.error?.message ||
                `Music Assistant error ${message.error_code || ""}`
            )
          );
          return;
        }
        settled = true;
        cleanup();
        resolve(message.result);
      };
      const onClose = () => fail(new Error("Music Assistant websocket closed"));
      socket.addEventListener("message", onMessage);
      socket.addEventListener("close", onClose);
      try {
        socket.send(JSON.stringify({ message_id: messageId, command, args }));
      } catch (error) {
        fail(error);
      }
    });
  }

  async _fetchMaApiQueue(queueId) {
    if (!queueId) return null;
    const path = await this._maIngressPath();
    if (!path) return null;
    let socket;
    try {
      socket = await this._maOpenSocket(path);
      const queue = await this._maSend(socket, "player_queues/get", {
        queue_id: queueId,
      });
      const total = Number(queue?.items) || 0;
      const activeItemId = queue?.current_item?.queue_item_id || "";
      const currentIndex = Number(queue?.current_index);
      const items = [];
      const pageSize = 500;
      let offset = 0;
      while (offset < (total || 5000)) {
        const page = await this._maSend(socket, "player_queues/items", {
          queue_id: queueId,
          limit: pageSize,
          offset,
        });
        if (!Array.isArray(page) || !page.length) break;
        items.push(...page);
        offset += page.length;
        if (page.length < pageSize) break;
      }
      if (!items.length) return null;
      return {
        items,
        total: total || items.length,
        activeItemId,
        currentIndex,
      };
    } catch {
      return null;
    } finally {
      try {
        socket?.close();
      } catch {
        // ignore
      }
    }
  }

  async _playMaApiItem(queueId, queueItemId) {
    if (!queueId || !queueItemId) return false;
    const path = await this._maIngressPath();
    if (!path) return false;
    let socket;
    try {
      socket = await this._maOpenSocket(path);
      await this._maSend(socket, "player_queues/play_index", {
        queue_id: queueId,
        index: queueItemId,
      });
      return true;
    } catch {
      return false;
    } finally {
      try {
        socket?.close();
      } catch {
        // ignore
      }
    }
  }

  async _loadQueue(token) {
    const attrs = this._state()?.attributes || {};
    const queueId = attrs.active_queue || "";
    const [massItems, details] = await Promise.all([
      this._fetchMassQueueItems(),
      this._fetchMaQueueDetails(),
    ]);
    if (
      token !== this._queueLoadToken ||
      !this._drawer?.open ||
      this._drawer.mode !== "queue"
    ) {
      return;
    }
    const t = translator(this._hass?.language);
    const direct = await this._fetchMaApiQueue(queueId || details?.queue_id || "");
    if (
      token !== this._queueLoadToken ||
      !this._drawer?.open ||
      this._drawer.mode !== "queue"
    ) {
      return;
    }
    this._queueQueueId = queueId || details?.queue_id || "";
    const currentId = direct?.activeItemId || details?.current_item?.queue_item_id || "";
    const contentId = attrs.media_content_id || "";
    let items = direct
      ? readMassQueueItems(direct.items, currentId, contentId)
      : massItems
        ? readMassQueueItems(massItems, currentId, contentId)
        : [];
    const fullQueue = items.length > 0;
    if (!items.length && details) {
      items = readMaQueueDetails(details, contentId);
    }
    const total = Number(direct?.total ?? details?.items);
    const index = Number(direct?.currentIndex ?? details?.current_index);
    const title = [t("queue")];
    if (Number.isFinite(total) && total > 0) {
      title.push(`${Number.isFinite(index) ? index + 1 : "?"}/${total}`);
    }
    this._drawer = {
      ...this._drawer,
      items,
      loading: false,
      error: "",
      title: title.join(" · "),
      note: !fullQueue && items.length ? t("queueLimited") : "",
      maUrl: this._maUrl(),
      fullQueue,
    };
    this.requestUpdate();
    this.updateComplete.then(() => this._scrollQueueToActive());
  }

  _openQueue() {
    const t = translator(this._hass?.language);
    const state = this._state();
    const items = readQueue(state, this._config?.max_queue ?? 40);
    const maPlayer = this._isMaPlayer();
    const token = ++this._queueLoadToken;
    this._queueQueueId = maPlayer ? state?.attributes?.active_queue || "" : "";
    this._drawer = {
      open: true,
      mode: "queue",
      nodes: [],
      cursor: -1,
      items,
      title: t("queue"),
      loading: !items.length && maPlayer,
      error: "",
      note: "",
      maUrl: maPlayer ? this._maUrl() : "",
      fullQueue: items.length > 0,
    };
    this.requestUpdate();
    if (items.length) this.updateComplete.then(() => this._scrollQueueToActive());
    if (items.length || !maPlayer) return;
    this._loadQueue(token).catch((error) => {
      if (token !== this._queueLoadToken) return;
      this._drawer = {
        ...this._drawer,
        loading: false,
        error: error?.message || t("queueEmpty"),
      };
      this.requestUpdate();
    });
  }

  _openLibrary() {
    const t = translator(this._hass?.language);
    this._drawer = {
      open: true,
      mode: "library",
      nodes: [],
      cursor: -1,
      items: [],
      title: t("library"),
      loading: true,
      error: "",
      t,
    };
    this.requestUpdate();
    this._fetchBrowse();
  }

  _openPlaylists() {
    const t = translator(this._hass?.language);
    if (!this._isMaPlayer()) {
      // 非 MA 播放器也保留 MA 入口：直接打开 MA 面板，而不是只弹一句提示。
      if (this._maUrl()) {
        this._openAssistant();
        return;
      }
      this._notify(t("maPlayerRequired"));
      return;
    }
    this._drawer = {
      open: true,
      mode: "playlists",
      nodes: [],
      cursor: -1,
      items: [],
      title: t("playlists"),
      loading: true,
      error: "",
      maUrl: this._maUrl(),
    };
    this.requestUpdate();
    this._fetchPlaylists();
  }

  async _browseMedia(contentId, contentType) {
    const connection = this._hass?.connection;
    if (!connection?.sendMessagePromise) throw new Error("unsupported");
    const payload = {
      type: "media_player/browse_media",
      entity_id: this._eid(),
    };
    if (contentId) {
      payload.media_content_id = contentId;
      if (contentType) payload.media_content_type = contentType;
    }
    return connection.sendMessagePromise(payload);
  }

  async _fetchPlaylists() {
    const t = translator(this._hass?.language);
    try {
      const root = await this._browseMedia();
      const children = root?.children || [];
      const folder = children.find(
        (child) =>
          (child.can_expand &&
            (/playlist/i.test(child.media_class || "") ||
              /playlist/i.test(child.media_content_type || "") ||
              /播放列表|playlists?/i.test(child.title || ""))) ||
          false
      );
      let list = [];
      if (folder) {
        const result = await this._browseMedia(
          folder.media_content_id,
          folder.media_content_type
        );
        list = result?.children || [];
      }
      if (!list.length) {
        list = children.filter((child) =>
          /playlist/i.test(child.media_class || "")
        );
      }
      const items = list
        .map((child) => ({
          title: child.title || "",
          subtitle: (() => {
            const label = mediaClassLabel(child.media_class, this._hass?.language);
            return label && label !== t("playlists") ? label : "";
          })(),
          contentId: child.media_content_id || "",
          contentType: child.media_content_type || "playlist",
          thumb: child.thumbnail || "",
        }))
        .filter((item) => item.contentId);
      if (this._drawer.mode !== "playlists") return;
      this._drawer = { ...this._drawer, loading: false, items, error: "" };
    } catch (err) {
      if (this._drawer.mode !== "playlists") return;
      this._drawer = {
        ...this._drawer,
        loading: false,
        items: [],
        error: err?.message
          ? `${t("browseFailed")} · ${String(err.message).slice(0, 40)}`
          : t("browseFailed"),
      };
    }
    this.requestUpdate();
  }

  async _playPlaylistItem(item) {
    if (!item?.contentId) return;
    const t = translator(this._hass?.language);
    const entityId = this._eid();
    if (!this._isMaPlayer(entityId)) {
      this._notify(t("maPlayerRequired"));
      return;
    }
    const mediaType = item.contentType || "playlist";
    const notifyDone = () => {
      this._notify(`${t("playingPlaylist")} · ${item.title || ""}`);
      this._closeDrawer();
    };
    const useMA = Boolean(
      this._hass?.services?.music_assistant?.play_media
    );
    const describe = (err) => {
      const raw = err?.message || String(err);
      if (/nothing to play here/i.test(raw)) return t("playlistEmpty");
      return raw.length > 60 ? raw.slice(0, 60) : raw;
    };
    if (useMA) {
      try {
        await this._hass.callService("music_assistant", "play_media", {
          entity_id: entityId,
          media_id: item.contentId,
          media_type: "playlist",
          enqueue: "play",
        });
        notifyDone();
        return;
      } catch (err) {
        const raw = err?.message || String(err);
        // 歌单为空/曲目不可用时不再重复回退，直接给出可读提示
        if (/nothing to play here/i.test(raw)) {
          this._markPlaylistEmpty(item);
          this._notify(describe(err));
          return;
        }
        // 目标实体不属于 MA（例如切到了普通播放器）才回退标准服务
        if (!/match|target|not a valid|does not support|unsupported/i.test(raw)) {
          this._notify(describe(err));
          return;
        }
      }
    }
    try {
      await this._call("play_media", {
        media_content_id: item.contentId,
        media_content_type: mediaType,
      });
      notifyDone();
    } catch (err) {
      if (/nothing to play here/i.test(err?.message || "")) {
        this._markPlaylistEmpty(item);
      }
      this._notify(describe(err) || t("browseFailed"));
    }
  }

  _markPlaylistEmpty(item) {
    if (this._drawer.mode !== "playlists") return;
    this._drawer = {
      ...this._drawer,
      items: this._drawer.items.map((entry) =>
        entry.contentId === item.contentId ? { ...entry, empty: true } : entry
      ),
    };
    this.requestUpdate();
  }

  _closeDrawer() {
    this._drawer = { ...this._drawer, open: false };
    this.requestUpdate();
    setTimeout(() => {
      if (this._drawer.open) return;
      this._drawer = this._emptyDrawer();
      this._queueLoadToken += 1;
      this.requestUpdate();
    }, DRAWER_ANIM_MS);
  }

  async _fetchBrowse() {
    const hass = this._hass;
    const connection = hass?.connection;
    const t = translator(hass?.language);
    const node =
      this._drawer.cursor >= 0 ? this._drawer.nodes[this._drawer.cursor] : null;
    const payload = {
      type: "media_player/browse_media",
      entity_id: this._eid(),
    };
    if (node) {
      payload.media_content_id = node.contentId;
      if (node.contentType) payload.media_content_type = node.contentType;
    }
    this._drawer = { ...this._drawer, loading: true, error: "" };
    this.requestUpdate();
    if (!connection?.sendMessagePromise) {
      this._drawer = {
        ...this._drawer,
        loading: false,
        error: t("browseFailed"),
      };
      this.requestUpdate();
      return;
    }
    try {
      const result = await connection.sendMessagePromise(payload);
      const items = (result?.children || []).map((child) => ({
        title: child.title || "",
        subtitle:
          mediaClassLabel(child.media_class, this._hass?.language) ||
          child.media_content_type ||
          "",
        contentId: child.media_content_id || "",
        contentType: child.media_content_type || "",
        thumb: child.thumbnail || "",
        canPlay: Boolean(child.can_play),
        canExpand: Boolean(child.can_expand),
        cls: child.media_class || "",
      }));
      if (this._drawer.mode !== "library") return;
      this._drawer = {
        ...this._drawer,
        loading: false,
        items,
        title: node?.title || result?.title || t("library"),
        error: "",
      };
    } catch (err) {
      if (this._drawer.mode !== "library") return;
      this._drawer = {
        ...this._drawer,
        loading: false,
        items: [],
        error: err?.message
          ? `${t("browseFailed")} · ${String(err.message).slice(0, 40)}`
          : t("browseFailed"),
      };
    }
    this.requestUpdate();
  }

  _enterBrowseItem(item) {
    if (!item.canExpand) {
      if (item.canPlay) this._playBrowseItem(item);
      return;
    }
    const nodes = this._drawer.nodes.slice(0, this._drawer.cursor + 1);
    nodes.push({
      contentId: item.contentId,
      contentType: item.contentType,
      title: item.title,
    });
    this._drawer = {
      ...this._drawer,
      nodes,
      cursor: nodes.length - 1,
      title: item.title,
      items: [],
    };
    this.requestUpdate();
    this._fetchBrowse();
  }

  _browseBack() {
    if (this._drawer.cursor < 0) return;
    this._drawer = {
      ...this._drawer,
      cursor: this._drawer.cursor - 1,
      items: [],
    };
    this.requestUpdate();
    this._fetchBrowse();
  }

  /* ---------------- 渲染辅助 ---------------- */

  updated() {
    const card = this.renderRoot?.querySelector?.(".hm-card");
    if (!card) return;
    const media = this._readMedia();
    const state = this._state();
    const unavailable =
      !state || state.state === "unavailable" || state.state === "unknown";
    const artSource = unavailable ? "" : media.art || "";
    const entityId = this._eid();
    if (artSource !== this._artSource) {
      this._artSource = artSource;
      this._artFailedSource = "";
      const seq = ++this._artSeq;
      resolveArtUrl(this._hass, artSource, entityId).then((url) => {
        if (seq !== this._artSeq || url === this._artUrl) return;
        this._artUrl = url;
        this.requestUpdate();
      });
    }
    if (this._artUrl !== this._artApplied) {
      this._artApplied = this._artUrl;
      this._crossFadeArt(card, this._artUrl);
    }
    this._syncRangeValues();
    this._syncPanelFlag();
    this._queuePanelFit();
    this._installDock();
    this._installLyricDock();
    syncCoverSpin(
      this.renderRoot?.querySelector?.(".hm-cover img"),
      this._state()?.state === "playing",
    );
    this._syncCoverEq();
    this._maybeLoadLyrics();
    if (
      (this._lyricsOpen || this._sideLyricsVisible()) &&
      this._lyricsActive !== this._lyricsScrolled
    ) {
      this._lyricsScrolled = this._lyricsActive;
      if (typeof requestAnimationFrame !== "undefined") {
        requestAnimationFrame(() => {
          const scroll = this.renderRoot?.querySelector?.(".hm-lyrics-scroll");
          const line = this.renderRoot?.querySelector?.(
            '.hm-lyrics-line[data-active="true"]'
          );
          if (!scroll || !line) return;
          const scrollRect = scroll.getBoundingClientRect();
          const lineRect = line.getBoundingClientRect();
          const top =
            scroll.scrollTop +
            lineRect.top -
            scrollRect.top -
            scrollRect.height / 2 +
            lineRect.height / 2;
          scroll.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        });
      }
    }
    this._syncSpectrum();
  }

  _queuePanelFit() {
    if (this._fitPanelRaf) cancelAnimationFrame(this._fitPanelRaf);
    if (typeof requestAnimationFrame === "undefined") {
      this._fitPanel();
      return;
    }
    this._fitPanelRaf = requestAnimationFrame(() => {
      this._fitPanelRaf = null;
      this._fitPanel();
    });
  }

  _fitPanel() {
    if (!this._panel) {
      this.style.removeProperty("--hm-panel-cover");
      this.style.removeProperty("--hm-panel-height");
      this._panelHeight = 0;
      return;
    }
    const card = this.renderRoot?.querySelector?.(".hm-card");
    if (!card) return;
    const viewportH = Math.round(
      window.visualViewport?.height || window.innerHeight || 0
    );
    if (viewportH < 240) return;
    // 让卡片贴合当前视口底部，解决面板父容器高度未约束导致的下滑。
    const rect = card.getBoundingClientRect();
    const available = Math.max(
      240,
      Math.min(viewportH, Math.floor(viewportH - Math.max(0, rect.top)))
    );
    if (available !== this._panelHeight) {
      this._panelHeight = available;
      this.style.setProperty("--hm-panel-height", `${available}px`);
    }
    const main = this.renderRoot?.querySelector?.(".hm-main");
    if (!main) return;
    const mainH = Math.round(main.clientHeight || 0);
    const mainW = Math.round(main.clientWidth || 0);
    if (mainH < 80 || mainW < 80) return;
    const stack = card.clientWidth < 820;
    const cardH = Math.round(card.clientHeight || 0);
    let size;
    if (stack) {
      // 窄屏/竖屏：封面在上、信息在下。手机面板不再让封面吃掉大半屏，
      // 宽度上限约 58%，高度按整卡高度的 30% 封顶，给标题/频谱/进度留空间。
      const narrow = mainW < 560;
      const widthRatio = narrow ? 0.58 : 0.68;
      const heightBudget = cardH * (narrow ? 0.3 : 0.45);
      size = Math.max(120, Math.min(mainW * widthRatio, heightBudget));
    } else {
      // 宽屏：封面以主区可用高度为上限，同时保留 34% 宽度上限。
      size = Math.max(120, Math.min(mainH, mainW * 0.34));
    }
    this.style.setProperty("--hm-panel-cover", `${Math.round(size)}px`);
  }

  _isPanelContext() {
    if (this.closest?.("hui-panel-view")) return true;
    let root = this.getRootNode?.();
    while (root) {
      const host = root.host;
      if (!host) break;
      const tag = String(host.tagName || "").toLowerCase();
      if (tag === "hui-panel-view") return true;
      root = host.getRootNode?.();
    }
    return false;
  }

  _syncPanelFlag() {
    const panel = this._isPanelContext();
    if (panel === this._panel) return;
    this._panel = panel;
    this.setAttribute("data-panel", String(panel));
    this.renderRoot?.querySelector?.(".hm-card")?.setAttribute("data-panel", String(panel));
  }

  _isThumbnailPreview() {
    let root = this.getRootNode?.();
    while (root) {
      const host = root.host;
      if (!host) break;
      const tag = String(host.tagName || "").toLowerCase();
      if (tag === "hui-card-preview" || tag === "hui-suggestion-card") {
        return true;
      }
      // HA 2026.6 新卡片选择器用 <hui-card preview> 渲染缩略预览。
      if (tag === "hui-card" && host.preview === true) {
        return true;
      }
      root = host.getRootNode?.();
    }
    return Boolean(this.closest?.("hui-card-preview, hui-suggestion-card"));
  }

  _thumbMode() {
    return this.preview === true || this.editMode === true || this._thumbPreview;
  }

  _thumbTier() {
    const width = this._width || 0;
    const height = this._height || 0;
    if (width >= 700 && height >= 500) return "lg";
    if (width >= 440 || height >= 520) return "md";
    return "sm";
  }

  _isPreviewContext() {
    let root = this.getRootNode?.();
    while (root) {
      const host = root.host;
      if (!host) break;
      const tag = String(host.tagName || "").toLowerCase();
      if (
        tag === "hui-card-preview" ||
        tag === "hui-card-options" ||
        tag === "hui-dialog-edit-card" ||
        tag === "ha-dialog"
      ) {
        return true;
      }
      root = host.getRootNode?.();
    }
    return Boolean(this.closest?.("hui-card-preview, hui-card-options"));
  }

  _isMobileUi() {
    return this._mobileMq ? Boolean(this._mobileMq.matches) : isMobileUi();
  }

  _installDock() {
    if (this._isPreviewContext()) return;
    if (this._isMobileUi() && this._config?.mobile_hide_dock !== false) {
      uninstallDock();
      this._dockOwner = false;
      return;
    }
    const configDock = this._config?.dock;
    const configEntities = normalizeDockEntities(this._config?.dock_entities);
    const configThemes = normalizeDockThemes(this._config?.dock_themes);
    const pref = loadDockPref();
    // 全局设置一旦存在，所有卡片都以它为准：同一页面/不同仪表盘里
    // 复制出来的多张卡片不会再各自用本地 dock 配置互相覆盖。
    const modes = pref ? pref.modes : normalizeDockModes(configDock);
    const dockEntities = pref ? pref.entities : configEntities;
    const dockThemes = pref ? pref.themes : configThemes;
    const fallback =
      this._eid?.() ||
      this._config?.entity ||
      (Array.isArray(this._config?.entities) ? this._config.entities[0] : "");
    if (!modes.length) {
      if (pref && !this._isPreviewContext()) {
        uninstallDock();
        this._dockOwner = false;
      }
      return;
    }
    if (!this._hass || !this.isConnected || !fallback) return;
    const entities = {};
    for (const mode of modes) {
      const entity = dockEntities[mode] || fallback;
      if (entity) entities[mode] = entity;
    }
    const configs = Object.entries(entities).map(([mode, entity]) => ({
      mode,
      entity,
      hass: this._hass,
      theme: dockThemes[mode] || this._themeKey(),
    }));
    installDocks(configs);
    // 只有在还没有全局设置时才用当前卡片做一次初始化；之后一律由
    // 编辑器写入全局设置并广播，卡片本身不再回写，避免多卡片抢覆盖。
    if (!pref) {
      saveDockPref({
        modes: Object.keys(entities),
        entities,
        themes: Object.fromEntries(
          Object.keys(entities).map((mode) => [mode, dockThemes[mode] || this._themeKey()])
        ),
      });
    }
    this._dockOwner = true;
  }

  _installLyricDock() {
    if (this._isPreviewContext()) return;
    if (this._isMobileUi() && this._config?.mobile_hide_lyrics !== false) {
      uninstallLyricDock();
      this._lyricDockOwner = false;
      return;
    }
    const configOn = this._config?.floating_lyrics !== false;
    const editedAt = Number(this._config?.floating_lyrics_edited) || 0;
    const pref = loadLyricDockPref();
    // 与三个迷你播放器一致：只有最近在编辑器里改过开关的卡片能覆盖全局记忆。
    const useConfig = editedAt > 0 && editedAt >= (pref?.updated || 0);
    const enabled = useConfig ? configOn : pref ? pref.enabled : configOn;
    const fallback =
      this._eid?.() ||
      this._config?.entity ||
      (Array.isArray(this._config?.entities) ? this._config.entities[0] : "");
    if (!enabled) {
      if (!this._isPreviewContext() && (useConfig || this._lyricDockOwner)) {
        saveLyricDockPref({
          enabled: false,
          entity: fallback,
          updated: editedAt || Date.now(),
        });
        uninstallLyricDock();
        this._lyricDockOwner = false;
      }
      return;
    }
    if (!this._hass || !this.isConnected || !fallback) return;
    if (this._isPreviewContext()) return;
    const state = this._state(fallback);
    const trackKey = this._trackKeyFor(fallback, state);
    const lines = this._lyrics.status === "ready" ? this._lyrics.lines : [];
    installLyricDock({
      enabled: true,
      entity: fallback,
      preferredEntity: fallback,
      auto: this._config?.floating_lyrics_auto !== false,
      source: this._lyricsSource(),
      theme: this._themeKey(),
      hass: this._hass,
      lines,
      plain: this._lyrics.plain,
      trackKey,
      status: this._lyrics.status,
      offset: this._lyricsOffset,
    });
    saveLyricDockPref({
      enabled: true,
      entity: fallback,
      updated: editedAt || pref?.updated || Date.now(),
    });
    this._lyricDockOwner = true;
  }

  _trackKeyFor(entity, state) {
    const attrs = state?.attributes || {};
    return [
      entity,
      attrs.media_title || "",
      attrs.media_artist || "",
      attrs.media_album_name || "",
      attrs.media_duration || 0,
      attrs.media_content_id || "",
    ]
      .map((value) => String(value))
      .join("|");
  }

  _artUrlFor() {
    const media = this._readMedia();
    return normalizeArt(this._hass, media.art);
  }

  _onArtError() {
    if (!this._artSource) return;
    this._artFailedSource = this._artSource;
    this._artUrl = "";
    this._artApplied = "";
    const card = this.renderRoot?.querySelector?.(".hm-card");
    const layers = card?.querySelectorAll?.(".hm-bg-art") || [];
    layers.forEach((layer) => {
      layer.classList.remove("on");
      layer.style.backgroundImage = "";
    });
    this._artSlot = 0;
    this._maybePalette("");
    this.requestUpdate();
  }

  _crossFadeArt(card, url) {
    const layers = card.querySelectorAll(".hm-bg-art");
    if (!layers.length) return;
    const nextIndex = layers.length > 1 ? (this._artSlot + 1) % 2 : 0;
    const next = layers[nextIndex];
    const previous = layers[this._artSlot];
    if (!url) {
      layers.forEach((layer) => {
        layer.classList.remove("on");
        layer.style.backgroundImage = "";
      });
      this._artSlot = 0;
      this._maybePalette("");
      return;
    }
    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      next.style.backgroundImage = `url("${url}")`;
      next.classList.add("on");
      previous?.classList.remove("on");
      this._artSlot = nextIndex;
      this._maybePalette(url);
    };
    image.onerror = () => {
      this._onArtError();
    };
    image.src = url;
  }

  _maybePalette(url) {
    const media = this._readMedia();
    const key = url || `${media.title}|${media.artist}|${this._eid()}`;
    if (this._paletteKey === key) return;
    this._paletteKey = key;
    if (!url) {
      this._palette = null;
      this.requestUpdate();
      return;
    }
    paletteFor(url, key).then((palette) => {
      if (this._paletteKey !== key) return;
      this._palette = palette;
      this.requestUpdate();
    });
  }

  _syncRangeValues() {
    const root = this.renderRoot;
    if (!root) return;
    const seek = root.querySelector?.('input.hm-range[data-role="seek"]');
    const volume = root.querySelector?.('input.hm-range[data-role="volume"]');
    const media = this._readMedia();
    if (seek && this._seekPreview === null) {
      const max = media.duration || 0;
      const value = clamp(media.position, 0, max || media.position);
      seek.value = String(value);
      seek.max = String(max || 0);
      seek.style.setProperty(
        "--pct",
        `${max ? clamp((value / max) * 100, 0, 100) : 0}%`
      );
    }
    if (volume && this._volumePreview === null) {
      const info = this._volumeInfo(media);
      volume.value = String(Math.round(info.level * 100));
      volume.style.setProperty("--pct", `${info.level * 100}%`);
      volume.setAttribute("data-disabled", String(!info.supported));
    }
  }

  getCardSize() {
    const layout = this._layoutKey();
    if (layout === "mini") return 1;
    if (layout === "compact") return 3;
    return 6;
  }

  getGridOptions() {
    const rows = this.getCardSize();
    return {
      columns: this._panel ? "full" : 12,
      rows: this._panel ? Math.max(6, rows) : rows,
      min_columns: this._panel ? 12 : 4,
      min_rows: this._panel ? 4 : 2,
      max_columns: 24,
      max_rows: 24,
    };
  }

  getLayoutOptions() {
    const grid = this.getGridOptions();
    return {
      grid_columns: grid.columns === "full" ? 12 : grid.columns,
      grid_rows: grid.rows,
      grid_min_columns: grid.min_columns,
      grid_max_columns: grid.max_columns,
      grid_min_rows: grid.min_rows,
      grid_max_rows: grid.max_rows,
    };
  }

  /* ---------------- 渲染 ---------------- */

  _renderLyrics(media, position, inline = false) {
    const t = translator(this._hass?.language);
    const lyrics = this._lyrics;
    const timed = lyrics.lines.length > 0;
    const plain = lyrics.plain || [];
    const lyricPosition = this._lyricsPosition(position);
    const progress = timed
      ? lyricProgress(lyrics.lines, lyricPosition, media.duration)
      : { index: -1, progress: 0 };
    const active = timed ? Math.max(0, progress.index) : -1;
    const lineProgress = active >= 0 ? progress.progress : 0;
    this._lyricsActive = active;
    const canSeek = hasFeature(this._state(), FEATURES.SEEK);
    const offsetLabel = `${this._lyricsOffset > 0 ? "+" : ""}${this._lyricsOffset.toFixed(1)}s`;

    let body = nothing;
    if (lyrics.status === "loading") {
      // 歌词匹配期间不显示「正在匹配歌词」占位框，避免侧边歌词/完整面板出现空框。
      body = nothing;
    } else if (lyrics.status === "none") {
      body = html`<div class="hm-lyrics-empty">${t("lyricsNone")}</div>`;
    } else if (lyrics.status === "error") {
      body = html`<div class="hm-lyrics-empty hm-lyrics-error">
        <span>${t("lyricsError")}</span>
        <button
          class="hm-lyrics-retry"
          @click=${(event) => {
            event.stopPropagation();
            this._retryLyrics();
          }}
        >
          ${t("lyricsRetry")}
        </button>
      </div>`;
    } else if (lyrics.instrumental) {
      body = html`<div class="hm-lyrics-empty">${t("lyricsInstrumental")}</div>`;
    } else if (timed) {
      body = lyrics.lines.map(
        (line, index) => html`<button
          class="hm-lyrics-line"
          data-active=${index === active ? "true" : "false"}
          data-time=${line.time}
          style=${`--hm-line-progress:${index === active ? Math.round(lineProgress * 100) : 0}%`}
          @click=${() => {
            if (canSeek) {
              this._seekTo(Math.max(0, line.time - this._lyricsOffset));
            }
          }}
        >
          <span class="hm-lyrics-text">${line.text}</span>
        </button>`
      );
    } else if (plain.length) {
      body = plain.map(
        (line) => html`<div class="hm-lyrics-line" data-static="true">${line}</div>`
      );
    } else {
      body = html`<div class="hm-lyrics-empty">${t("lyricsNone")}</div>`;
    }

    return html`<section class="hm-lyrics ${inline ? "hm-lyrics-inline" : ""}" data-status=${lyrics.status}>
      <div class="hm-lyrics-head">
        <span class="hm-lyrics-title">${t("lyrics")}</span>
        ${lyrics.source
          ? html`<span class="hm-lyrics-source">${lyrics.source}</span>`
          : nothing}
        <div class="hm-lyrics-offset" title=${t("lyricsOffset")}>
          <button
            type="button"
            aria-label="-0.5s"
            @click=${(event) => {
              event.stopPropagation();
              this._bumpLyricsOffset(-0.5);
            }}
          >−</button>
          <span>${offsetLabel}</span>
          <button
            type="button"
            aria-label="+0.5s"
            @click=${(event) => {
              event.stopPropagation();
              this._bumpLyricsOffset(0.5);
            }}
          >+</button>
        </div>
        ${inline
          ? nothing
          : html`<button
              class="hm-lyrics-close"
              aria-label=${t("close")}
              title=${t("close")}
              @click=${(event) => {
                event.stopPropagation();
                this._toggleLyrics();
              }}
            >
              ${icon("close", 14)}
            </button>`}
      </div>
      <div class="hm-lyrics-scroll">${body}</div>
    </section>`;
  }

  render() {
    const hass = this._hass;
    const config = this._config || {};
    const t = translator(hass?.language);
    const layout = this._layoutKey();
    const themeKey = this._themeKey();

    if (!hass) {
      return html`
        <div class="hm-card" data-layout=${layout} data-panel=${this._panel ? "true" : "false"} data-thumb=${this._thumbMode() ? this._thumbTier() : "false"} data-theme=${themeKey} style=${styleMap(this._styleVars())}>
          <div class="hm-body">
            <div class="hm-empty">${t("loading")}</div>
          </div>
        </div>
      `;
    }

    const entityId = this._eid();
    const state = hass.states?.[entityId];
    if (!state) {
      return html`
        <div class="hm-card" data-layout=${layout} data-panel=${this._panel ? "true" : "false"} data-thumb=${this._thumbMode() ? this._thumbTier() : "false"} data-theme=${themeKey} style=${styleMap(this._styleVars())}>
          <div class="hm-body">
            <div class="hm-empty">
              ${entityId ? `实体未找到：${entityId}` : "ha-music: entity 未配置"}
            </div>
          </div>
        </div>
      `;
    }

    const media = this._readMedia();
    const queue = readQueue(state, config.max_queue ?? 40);
    const playing = state.state === "playing" || state.state === "buffering";
    const statusKey = formatEntityState(state.state);
    const statusText = t(statusKey);
    const subtitle =
      media.album ||
      media.series ||
      media.appName ||
      (statusKey === "playing" ? t("playing") : statusText);
    const volume = this._volumeInfo(media);
    const showVolume = config.show_volume !== false && volume.supported;
    const canShuffle = hasFeature(state, FEATURES.SHUFFLE_SET);
    const canRepeat = hasFeature(state, FEATURES.REPEAT_SET);
    const canPrev = hasFeature(state, FEATURES.PREVIOUS_TRACK);
    const canNext = hasFeature(state, FEATURES.NEXT_TRACK);
    const canPlay = hasFeature(state, FEATURES.PLAY) || hasFeature(state, FEATURES.PAUSE);
    const isOff = state.state === "off" || state.state === "standby";
    const canPower = isOff
      ? hasFeature(state, FEATURES.TURN_ON)
      : hasFeature(state, FEATURES.TURN_OFF);
    const canBrowse = hasFeature(state, FEATURES.BROWSE_MEDIA);
    const maPlayer = this._isMaPlayer(entityId);
    const maShow = this._maEnabled();
    const canSeek = hasFeature(state, FEATURES.SEEK);
    const sourceList = Array.isArray(state.attributes?.source_list)
      ? state.attributes.source_list
      : [];
    const soundModes = Array.isArray(state.attributes?.sound_mode_list)
      ? state.attributes.sound_mode_list
      : [];
    const showSource =
      config.show_source !== false &&
      sourceList.length > 0 &&
      hasFeature(state, FEATURES.SELECT_SOURCE);
    const showSoundMode =
      soundModes.length > 0 && hasFeature(state, FEATURES.SELECT_SOUND_MODE);
    const groupMembers = media.groupMembers.filter((id) => id && id !== entityId);
    const showGroup = config.show_group !== false && media.groupMembers.length > 1;
    const massQueueReady = Boolean(hass.services?.mass_queue?.get_queue_items);
    const showQueue =
      config.show_queue !== false &&
      (queue.length > 0 ||
        (maPlayer && (Boolean(state.attributes?.active_queue) || massQueueReady)));
    const showLibrary = config.show_library !== false && canBrowse;
    const visualizer = config.visualizer || "bars";
    const coverMode = config.cover || "ambient";
    const duration = media.duration;
    const position = this._seekPreview ?? media.position;
    const percent = duration ? clamp((position / duration) * 100, 0, 100) : 0;
    const volumePercent = Math.round(volume.level * 100);
    const repeat = this._repeatValue();
    const mediaTitle = media.title || (isOff ? "" : "");
    const entities = this._entities();
    const showLyrics =
      this._lyricsEnabled() &&
      !this._thumbMode() &&
      layout !== "mini" &&
      (this._lyrics.status === "ready" ||
        this._lyrics.status === "loading" ||
        this._lyrics.status === "error" ||
        this._lyricsOpen);
    const sideLyrics =
      showLyrics &&
      !this._lyricsOpen &&
      this._lyrics.status === "ready" &&
      this._sideLyricsVisible();

    const lyricLine =
      this._lyrics.status === "ready" && this._lyrics.lines.length
        ? this._lyrics.lines[
            Math.max(0, lyricIndex(this._lyrics.lines, this._lyricsPosition(position)))
          ]?.text || ""
        : "";
    const coverUrl =
      state.state === "unavailable" || state.state === "unknown"
        ? ""
        : this._artUrl;

    return html`
      <div
        class="hm-card"
        data-theme=${themeKey}
        data-layout=${layout}
        data-panel=${this._panel ? "true" : "false"}
        data-thumb=${this._thumbMode() ? this._thumbTier() : "false"}
        data-playing=${playing ? "true" : "false"}
        data-cover=${coverMode}
        data-tight=${this._tight() ? "true" : "false"}
        style=${styleMap(this._styleVars())}
        @click=${this._onCardClick}
      >
        <div class="hm-bg">
          <div class="hm-bg-art"></div>
          <div class="hm-bg-art"></div>
          <div class="hm-bg-grad"></div>
          <div class="hm-grid"></div>
          <div class="hm-noise"></div>
          <div class="hm-sheen"></div>
        </div>

        <div class="hm-body">
          <header class="hm-top">
            <div class="hm-status">
              <span class="hm-dot"></span>
              <span class="hm-status-text">${statusText}</span>
              <span class="hm-kicker-sep">·</span>
              <span class="hm-status-text hm-status-player">${config.name || friendlyName(hass, entityId, entityId)}</span>
            </div>
            <div class="hm-top-actions">
              ${showLyrics
                ? html`<button
                    class="hm-icon-btn hm-lyrics-btn"
                    data-role="lyrics"
                    data-active=${this._lyricsOpen || sideLyrics ? "true" : "false"}
                    aria-label=${t("lyrics")}
                    title=${t("lyrics")}
                    @click=${() => this._toggleLyrics()}
                  >
                    ${icon("lyrics", 16)}
                  </button>`
                : nothing}
              ${maShow
                ? html`<button
                    class="hm-icon-btn hm-ma"
                    aria-label=${maPlayer ? t("playlists") : t("openAssistant")}
                    title=${maPlayer ? t("playlists") : t("openAssistant")}
                    @click=${() => this._openPlaylists()}
                  >
                    ${icon(maPlayer ? "playlist" : "external", 16)}
                  </button>`
                : nothing}
              ${showQueue
                ? html`<button
                    class="hm-icon-btn"
                    aria-label=${t("queue")}
                    title=${t("queue")}
                    @click=${() => this._openQueue()}
                  >
                    ${icon("queue", 16)}
                  </button>`
                : nothing}
              ${showLibrary
                ? html`<button
                    class="hm-icon-btn"
                    aria-label=${t("library")}
                    title=${t("library")}
                    @click=${() => this._openLibrary()}
                  >
                    ${icon("library", 16)}
                  </button>`
                : nothing}
              ${canPower
                ? html`<button
                    class="hm-icon-btn"
                    data-role="power"
                    aria-label=${t("power")}
                    title=${t("power")}
                    @click=${() => this._power()}
                  >
                    ${icon("power", 16)}
                  </button>`
                : nothing}
              <button
                class="hm-icon-btn"
                data-role="more"
                aria-label=${t("more")}
                title=${t("more")}
                @click=${() => this._moreInfo()}
              >
                ${icon("more", 16)}
              </button>
            </div>
          </header>

          ${entities.length > 1
            ? html`
                <div class="hm-entities">
                  ${entities.map((id) => {
                    const item = hass.states?.[id];
                    const art = normalizeArt(hass, item?.attributes?.entity_picture);
                    const itemPlaying =
                      item?.state === "playing" || item?.state === "buffering";
                    return html`<button
                      class="hm-entity-chip"
                      data-active=${id === entityId ? "true" : "false"}
                      data-playing=${itemPlaying ? "true" : "false"}
                      aria-label=${itemPlaying
                        ? `${friendlyName(hass, id, id)} ${t("playing")}`
                        : friendlyName(hass, id, id)}
                      @click=${() => this._switchEntity(id, true)}
                    >
                      <span
                        class="hm-entity-dot"
                        style=${art ? `background-image:url("${art}")` : ""}
                      ></span>
                      <span class="hm-entity-name">${friendlyName(hass, id, id)}</span>
                      ${itemPlaying
                        ? html`<span class="hm-entity-eq" aria-hidden="true">
                            <i></i><i></i><i></i>
                          </span>`
                        : nothing}
                    </button>`;
                  })}
                </div>`
            : nothing}

          ${this._lyricsOpen
            ? this._renderLyrics(media, position)
            : html`<section class="hm-main">
            <div class="hm-cover-wrap">
              <span class="hm-cover-eq-glow" aria-hidden="true"></span>
              <canvas class="hm-cover-eq" aria-hidden="true"></canvas>
              <button
                class="hm-cover"
                data-playing=${playing ? "true" : "false"}
                data-gesture=${this._coverGesture || ""}
                aria-label=${playing ? t("pause") : t("play")}
                title=${mediaTitle || t("noMedia")}
                @pointerdown=${(event) => this._onCoverPointerDown(event)}
                @pointermove=${(event) => this._onCoverPointerMove(event)}
                @pointerup=${(event) => this._onCoverPointerUp(event)}
                @pointercancel=${() => this._onCoverPointerCancel()}
                @dragstart=${(event) => event.preventDefault()}
                @click=${() => this._onCoverClick()}
              >
                ${coverUrl
                  ? html`<img
                      src=${coverUrl}
                      alt=${mediaTitle || ""}
                      draggable="false"
                      @error=${() => this._onArtError()}
                    />`
                  : html`<span class="hm-cover-ph">${icon("music", 40)}</span>`}
              </button>
              <div class="hm-cover-halo"></div>
            </div>

            <div class="hm-info" data-side-lyrics=${sideLyrics ? "true" : "false"}>
            <div class="hm-meta">
              <div class="hm-kicker">
                ${subtitle || t("noMedia")}
                ${media.track
                  ? html`<span class="hm-kicker-sep">·</span>
                      <span>${t("track")} ${media.track}</span>`
                  : nothing}
              </div>
              <h2 class="hm-title ${mediaTitle ? "" : "placeholder"}">
                ${mediaTitle || t("noTitle")}
              </h2>
              <div class="hm-artist">
                ${media.artist || (media.album ? media.album : statusText)}
              </div>
              ${showSource || showSoundMode || showGroup
                ? html`<div class="hm-tags">
                    ${showSource
                      ? html`<button
                          class="hm-chip interactive"
                          @click=${() => {
                            this._menu = this._menu === "source" ? null : "source";
                            this.requestUpdate();
                          }}
                        >
                          <span class="hm-chip-label">${t("source")}</span>
                          <span class="hm-chip-value">${media.source || "—"}</span>
                        </button>`
                      : nothing}
                    ${showSoundMode
                      ? html`<button
                          class="hm-chip interactive"
                          @click=${() => {
                            this._menu = this._menu === "sound" ? null : "sound";
                            this.requestUpdate();
                          }}
                        >
                          <span class="hm-chip-label">${t("soundMode")}</span>
                          <span class="hm-chip-value">${media.soundMode || "—"}</span>
                        </button>`
                      : nothing}
                    ${showGroup
                      ? html`<span
                          class="hm-chip ${hasFeature(state, FEATURES.GROUPING) ? "interactive" : ""}"
                          title=${hasFeature(state, FEATURES.GROUPING)
                            ? `${t("group")} · ${t("groupLeave")}`
                            : t("group")}
                          @click=${() => {
                            if (hasFeature(state, FEATURES.GROUPING)) this._leaveGroup();
                          }}
                        >
                          ${icon("group", 13)}
                          <span class="hm-group">
                            ${groupMembers.slice(0, 3).map((id) => {
                              const item = hass.states?.[id];
                              const art = normalizeArt(
                                hass,
                                item?.attributes?.entity_picture
                              );
                              return html`<span
                                class="hm-group-avatar"
                                title=${friendlyName(hass, id, id)}
                                style=${art ? `background-image:url("${art}")` : ""}
                              ></span>`;
                            })}
                            ${groupMembers.length > 3
                              ? html`<span class="hm-group-more">+${groupMembers.length - 3}</span>`
                              : nothing}
                          </span>
                        </span>`
                      : nothing}
                  </div>`
                : nothing}
              ${lyricLine && !sideLyrics && layout === "full" && !this._thumbMode() && (this._panel || this._height >= 360)
                ? html`<div class="hm-now-lyric">
                    <span class="hm-now-lyric-mark">${icon("lyrics", 12)}</span>
                    <span>${lyricLine}</span>
                  </div>`
                : nothing}
            </div>
            ${sideLyrics ? this._renderLyrics(media, position, true) : nothing}
            </div>
          </section>`}

          ${visualizer !== "none" && !this._lyricsOpen
            ? html`<div
                class="hm-vis"
                data-playing=${playing ? "true" : "false"}
                data-style=${visualizer}
              >
                ${this._renderVisualizer(visualizer, media)}
              </div>`
            : nothing}

          ${duration > 0
            ? html`<section class="hm-progress">
                <span class="hm-time">${formatTime(position)}</span>
                <input
                  class="hm-range"
                  data-role="seek"
                  type="range"
                  min="0"
                  max=${duration}
                  step="0.5"
                  .value=${String(position)}
                  data-disabled=${!canSeek ? "true" : "false"}
                  style=${styleMap({ "--pct": `${percent}%` })}
                  @input=${this._onSeekInput}
                  @change=${this._onSeekCommit}
                  aria-label=${t("seek")}
                />
                <span
                  class="hm-time end hoverable"
                  title=${t("remaining")}
                  @click=${() => {
                    this._showRemaining = !this._showRemaining;
                    this.requestUpdate();
                  }}
                >
                  ${this._showRemaining
                    ? `-${formatTime(Math.max(duration - position, 0))}`
                    : formatTime(duration)}
                </span>
              </section>`
            : nothing}

          <section class="hm-controls">
            <div class="hm-transport">
              ${canShuffle
                ? html`<button
                    class="hm-btn"
                    data-role="shuffle"
                    data-on=${media.shuffle ? "true" : "false"}
                    aria-label=${t("shuffle")}
                    title=${t("shuffle")}
                    @click=${() => this._shuffle()}
                  >
                    ${icon("shuffle", 18)}
                  </button>`
                : nothing}
              ${canPrev
                ? html`<button
                    class="hm-btn"
                    data-role="previous"
                    aria-label=${t("previous")}
                    title=${t("previous")}
                    @click=${() => this._skip("prev")}
                  >
                    ${icon("previous", 18)}
                  </button>`
                : nothing}
              ${canPlay
                ? html`<button
                    class="hm-play ${playing ? "is-playing" : ""}"
                    aria-label=${playing ? t("pause") : t("play")}
                    title=${playing ? t("pause") : t("play")}
                    @click=${() => this._togglePlay()}
                  >
                    ${playing ? icon("pause", 26) : icon("play", 26)}
                  </button>`
                : nothing}
              ${canNext
                ? html`<button
                    class="hm-btn"
                    aria-label=${t("next")}
                    title=${t("next")}
                    @click=${() => this._skip("next")}
                  >
                    ${icon("next", 18)}
                  </button>`
                : nothing}
              ${canRepeat
                ? html`<button
                    class="hm-btn"
                    data-role="repeat"
                    data-on=${repeat !== "off" ? "true" : "false"}
                    aria-label=${repeat === "one"
                      ? t("repeatOne")
                      : repeat === "all"
                        ? t("repeatAll")
                        : t("repeatOff")}
                    title=${repeat === "one"
                      ? t("repeatOne")
                      : repeat === "all"
                        ? t("repeatAll")
                        : t("repeatOff")}
                    @click=${() => this._repeat()}
                  >
                    ${icon(repeat === "one" ? "repeatOne" : "repeat", 18)}
                  </button>`
                : nothing}
            </div>

            ${showVolume
              ? html`<div class="hm-volume">
                  <button
                    class="hm-icon-btn"
                    aria-label=${volume.muted ? t("unmute") : t("mute")}
                    title=${volume.muted ? t("unmute") : t("mute")}
                    @click=${() => this._toggleMute()}
                  >
                    ${icon(volume.muted ? "mute" : "volume", 16)}
                  </button>
                  <input
                    class="hm-range"
                    data-role="volume"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    .value=${String(volumePercent)}
                    style=${styleMap({ "--pct": `${volumePercent}%` })}
                    @input=${this._onVolumeInput}
                    @change=${this._onVolumeCommit}
                    aria-label=${t("volume")}
                  />
                  <span class="hm-vol-pct">${volumePercent}%</span>
                </div>`
              : nothing}
          </section>
        </div>

        ${this._menu
          ? html`<div class="hm-menu">
              <div class="hm-menu-head">
                ${this._menu === "source" ? t("source") : t("soundMode")}
              </div>
              ${(this._menu === "source" ? sourceList : soundModes).map((item) =>
                html`<button
                  class="hm-menu-item"
                  data-active=${(this._menu === "source" ? media.source : media.soundMode) ===
                  item
                    ? "true"
                    : "false"}
                  @click=${() =>
                    this._menu === "source"
                      ? this._selectSource(item)
                      : this._selectSoundMode(item)}
                >
                  <span>${item}</span>
                  <span class="hm-menu-check">${icon("check", 13)}</span>
                </button>`
              )}
            </div>`
          : nothing}

        ${this._renderDrawer()}

        <div class="hm-toast ${this._toast ? "show" : ""}">${this._toast}</div>
      </div>
    `;
  }

  _renderVisualizer(kind, media) {
    const frame = visualizerFrame(media);
    if (kind === "wave") {
      const amp1 = 7 + frame.energy * 6 + frame.low * 7;
      const amp2 = 4.5 + frame.pulse * 5.5;
      const amp3 = 2.2 + frame.pulse * 3.2;
      const phase = frame.phase;
      const duration = `${(frame.period * 2.4).toFixed(2)}s`;
      return html`<div class="hm-wave-wrap">
        <svg
          viewBox="0 0 600 40"
          preserveAspectRatio="none"
          aria-hidden="true"
          style=${styleMap({ animationDuration: duration })}
        >
          <path
            d=${wavePath(600, 40, 150, amp1, phase)}
            fill="none"
            stroke="rgba(var(--hm-a1-rgb), 0.85)"
            stroke-width="1.4"
          ></path>
          <path
            d=${wavePath(600, 40, 150, amp2, phase * 1.35 + 1.9)}
            fill="none"
            stroke="rgba(var(--hm-a2-rgb), 0.6)"
            stroke-width="1.2"
          ></path>
          <path
            d=${wavePath(600, 40, 75, amp3, phase * 1.7 + 3.2)}
            fill="none"
            stroke="rgba(var(--hm-a1-rgb), 0.35)"
            stroke-width="0.9"
          ></path>
        </svg>
      </div>`;
    }
    if (kind === "orbit") {
      const reactors = [1, 0.58, 0.34];
      return html`<div class="hm-orbit-wrap">
        ${reactors.map((react, index) => {
          const drive = index === 0 ? frame.low : frame.pulse;
          return html`<span
            class="hm-orbit-ring"
            style=${styleMap({
              "--react": String(react),
              "--drive": drive.toFixed(3),
              animationDuration: `${(frame.period * (1.8 + index * 0.25)).toFixed(2)}s`,
              animationDelay: `${(index * frame.period * 0.55).toFixed(2)}s`,
            })}
          ></span>`;
        })}
      </div>`;
    }
    const count = 36;
    return html`<div class="hm-bars">
      ${Array.from({ length: count }, (_, index) => {
        const h = hashString(`${frame.seed}#${index}`);
        const base = 0.14 + (h % 100) / 135;
        const band = index < 12 ? 0 : index < 24 ? 1 : 2;
        const react = [1, 0.62, 0.34][band];
        const drive = band === 0 ? frame.low : frame.pulse;
        const boost = band === 0 ? 1 + 0.12 * drive : 1;
        const height = clamp(
          base * (0.55 + react * 0.55 * drive) * boost,
          0.08,
          1
        );
        const duration = 0.9 + ((h >> 8) % 100) / 90;
        const delay = -(((h >> 16) % 100) / 45);
        return html`<span
          class="hm-bar"
          style=${styleMap({
            "--h": height.toFixed(3),
            "--dur": `${duration.toFixed(2)}s`,
            "--delay": `${delay.toFixed(2)}s`,
          })}
        ></span>`;
      })}
    </div>`;
  }

  _stopSpectrum() {
    if (this._spectrumRaf) cancelAnimationFrame(this._spectrumRaf);
    this._spectrumRaf = null;
    this._spectrumLast = 0;
  }

  _spectrumPlaying() {
    const state = this._state()?.state;
    return state === "playing" || state === "buffering";
  }

  _resetAudioShape() {
    this._audioShape = {
      bars: [],
      mean: [],
      prev: [],
      peak: 0,
      lowFast: 0,
      lowSlow: 0,
      fluxMean: 0.02,
      beatEnv: 0,
      punch: 0,
      low: 0,
    };
  }

  _ensureAudioShape(count) {
    if (!this._audioShape) this._resetAudioShape();
    const shape = this._audioShape;
    if (shape.mean.length !== count) {
      shape.mean = new Array(count).fill(0);
      shape.prev = new Array(count).fill(0);
      shape.bars = new Array(count).fill(0);
      shape.peak = 0;
      shape.lowFast = 0;
      shape.lowSlow = 0;
      shape.fluxMean = 0.02;
      shape.beatEnv = 0;
    }
    return shape;
  }

  _ensureSpectrumPlaylist() {
    const url = this._spectrumPlaylistUrl;
    if (!url || this._spectrumPlaylistLoading) return;
    const now = Date.now();
    if (
      this._spectrumPlaylist &&
      now - this._spectrumPlaylistAt < 10 * 60 * 1000
    ) {
      return;
    }
    if (
      !this._spectrumPlaylist &&
      this._spectrumPlaylistErrorAt &&
      now - this._spectrumPlaylistErrorAt < 60 * 1000
    ) {
      return;
    }

    this._spectrumPlaylistLoading = true;
    const controller =
      typeof AbortController !== "undefined" ? new AbortController() : null;
    this._spectrumPlaylistAbort = controller;
    fetch(url, { cache: "no-store", signal: controller?.signal })
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json();
      })
      .then((data) => {
        const tracks = normalizeSpectrumPlaylist(data);
        if (!tracks.length) throw new Error("empty playlist");
        this._spectrumPlaylist = tracks;
        this._spectrumPlaylistAt = Date.now();
        this._spectrumPlaylistErrorAt = 0;
        this._spectrumResolvedUrl = "";
        this._spectrumTrack = null;
        this._syncSpectrumTrack(this._readMedia());
        this._syncSpectrum();
      })
      .catch((error) => {
        if (error?.name === "AbortError") return;
        this._spectrumPlaylistErrorAt = Date.now();
      })
      .finally(() => {
        if (this._spectrumPlaylistAbort === controller) {
          this._spectrumPlaylistAbort = null;
        }
        this._spectrumPlaylistLoading = false;
      });
  }

  _syncSpectrumTrack(media = this._readMedia()) {
    let url = this._spectrumAudioUrl;
    let track = null;
    if (this._spectrumPlaylistUrl) {
      this._ensureSpectrumPlaylist();
      if (this._spectrumPlaylist) {
        track = findSpectrumTrack(this._spectrumPlaylist, media);
        if (track?.url) url = track.url;
      }
    }
    if (url === this._spectrumResolvedUrl && track === this._spectrumTrack) {
      return url;
    }
    this._spectrumResolvedUrl = url || "";
    this._spectrumTrack = track;
    this._audioFailedUrl = "";
    const wasArmed = this._audioGestureArmed;
    this._resetAudioShape();
    this._teardownAudioSpectrum();
    if (wasArmed && this._spectrumResolvedUrl) {
      this._audioGestureArmed = true;
      this._ensureAudioSpectrum();
      this._startAudioElement();
    }
    return this._spectrumResolvedUrl;
  }

  _primeAudioSpectrum() {
    if ((this._config?.visualizer || "bars") !== "bars") return;
    // 先记住这次用户手势：歌单可能还没拉完，等匹配到源后自动接着启动分析音频。
    this._audioGestureArmed = true;
    this._audioFailedUrl = "";
    this._audioZeroFrames = 0;
    if (!this._spectrumResolvedUrl) {
      this._syncSpectrumTrack(this._readMedia());
    }
    if (!this._spectrumResolvedUrl) return;
    this._ensureAudioSpectrum();
    this._resumeAudioContext();
    this._startAudioElement();
  }

  _ensureAudioSpectrum() {
    const url = this._spectrumResolvedUrl;
    if (!url || this._audioFailedUrl === url) {
      return null;
    }
    if (this._audioEl && this._audioAnalyser && this._audioBins) {
      return this._audioAnalyser;
    }
    if (this._audioEl) this._teardownAudioSpectrum();
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) {
        this._failAudioSpectrum();
        return null;
      }
      // 不是同源、也不在已知 CORS 白名单里的源不接 Web Audio：
      // 接进去浏览器会把音频输出置零，表现为“进度在走、完全没声”。
      if (
        !canTapSpectrumAudio(
          url,
          typeof location !== "undefined" ? location.href : ""
        )
      ) {
        this._audioFailedUrl = url;
        return null;
      }
      const audio = new Audio();
      audio.crossOrigin = "anonymous";
      audio.preload = "auto";
      audio.setAttribute("playsinline", "");
      audio.addEventListener("error", () => this._failAudioSpectrum());
      audio.src = url;
      audio.load();
      const ctx = new Ctx();
      const source = ctx.createMediaElementSource(audio);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.55;
      analyser.minDecibels = -84;
      analyser.maxDecibels = -30;
      source.connect(analyser);
      // 分析节点后接 0 增益再落到 destination：保持媒体时钟推进，但完全静音，
      // 不会和远程播放器重复出声。
      const mute = ctx.createGain();
      mute.gain.value = 0;
      analyser.connect(mute);
      mute.connect(ctx.destination);
      this._audioEl = audio;
      this._audioCtx = ctx;
      this._audioSource = source;
      this._audioAnalyser = analyser;
      this._audioMute = mute;
      this._audioBins = new Uint8Array(analyser.frequencyBinCount);
      this._resetAudioShape();
      return analyser;
    } catch {
      this._failAudioSpectrum();
      return null;
    }
  }

  _resumeAudioContext() {
    if (this._audioCtx?.state === "suspended") {
      this._audioCtx.resume().catch(() => {});
    }
  }

  _startAudioElement() {
    const audio = this._audioEl;
    if (!audio || !this._audioGestureArmed) return;
    this._resumeAudioContext();
    const attempt = audio.play();
    if (attempt?.catch) attempt.catch(() => {});
    this._audioStartedAt = performance.now();
  }

  _pauseAudioSpectrum() {
    this._audioEl?.pause();
  }

  _teardownAudioSpectrum() {
    const audio = this._audioEl;
    if (audio) {
      try {
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
      } catch {
        /* noop */
      }
    }
    try {
      this._audioSource?.disconnect();
      this._audioAnalyser?.disconnect();
      this._audioMute?.disconnect();
    } catch {
      /* noop */
    }
    if (this._audioCtx) {
      this._audioCtx.close().catch(() => {});
    }
    this._audioEl = null;
    this._audioCtx = null;
    this._audioSource = null;
    this._audioAnalyser = null;
    this._audioMute = null;
    this._audioBins = null;
    this._audioZeroFrames = 0;
    this._audioPeak = 0;
    this._audioStartedAt = 0;
    this._audioGestureArmed = false;
    this._resetAudioShape();
  }

  _failAudioSpectrum() {
    if (!this._spectrumResolvedUrl) return;
    this._audioFailedUrl = this._spectrumResolvedUrl;
    this._teardownAudioSpectrum();
  }

  _syncAudioPlayback(playing, media) {
    const audio = this._audioEl;
    if (!audio) return;
    if (!playing) {
      audio.pause();
      return;
    }
    if (this._audioGestureArmed && audio.paused) this._startAudioElement();
    const audioDuration = audio.duration;
    const remoteDuration = Number(media.duration);
    const comparable =
      Number.isFinite(audioDuration) &&
      audioDuration > 0 &&
      Number.isFinite(remoteDuration) &&
      remoteDuration > 0 &&
      Math.abs(audioDuration - remoteDuration) < 5;
    const canSeekByPosition =
      !comparable &&
      !remoteDuration &&
      Number.isFinite(audioDuration) &&
      audioDuration > 0 &&
      Number.isFinite(media.position) &&
      media.position > 0 &&
      media.position < audioDuration - 1;
    if (
      (comparable || canSeekByPosition) &&
      audio.readyState >= 1 &&
      Number.isFinite(audio.currentTime) &&
      Number.isFinite(media.position) &&
      Math.abs(audio.currentTime - media.position) > 2.5
    ) {
      try {
        audio.currentTime = media.position;
      } catch {
        /* 直播流可能不可 seek */
      }
    }
  }

  _audioSpectrumReady() {
    return Boolean(
      this._audioEl &&
        !this._audioEl.paused &&
        this._audioEl.readyState >= 2 &&
        this._audioAnalyser &&
        this._audioBins &&
        this._audioCtx?.state === "running" &&
        this._audioFailedUrl !== this._spectrumResolvedUrl
    );
  }

  _readAudioLevels(count) {
    const analyser = this._audioAnalyser;
    const bins = this._audioBins;
    const ctx = this._audioCtx;
    if (!analyser || !bins || !ctx) return null;
    analyser.getByteFrequencyData(bins);
    const nyquist = ctx.sampleRate / 2;
    const lowHz = 100;
    const highHz = Math.min(6500, nyquist);
    const binHz = ctx.sampleRate / analyser.fftSize;
    const lo = Math.max(1, Math.floor(lowHz / binHz));
    const hi = Math.min(bins.length - 1, Math.max(lo + 1, Math.ceil(highHz / binHz)));
    const ratio = hi / lo;
    const levels = new Array(count);
    let peak = 0;
    for (let index = 0; index < count; index += 1) {
      // 100–6500Hz 对数分频；越靠右的高频越弱，按站点方式做等响度补偿。
      const t0 = count > 1 ? index / (count - 1) : 0;
      const t1 = count > 1 ? (index + 1) / (count - 1) : 1;
      const b0 = clamp(Math.floor(lo * Math.pow(ratio, Math.pow(t0, 0.6))), lo, hi);
      const b1 = clamp(
        Math.max(b0 + 1, Math.ceil(lo * Math.pow(ratio, Math.pow(t1, 0.6)))),
        b0,
        hi
      );
      let sum = 0;
      let n = 0;
      let max = 0;
      for (let bin = b0; bin <= b1; bin += 1) {
        const value = bins[bin] || 0;
        if (value > max) max = value;
        sum += value;
        n += 1;
      }
      const avg = n ? sum / n : 0;
      const weight =
        0.7 + 3.5 * Math.pow(count > 1 ? index / (count - 1) : 0, 1.15);
      levels[index] = clamp((avg / 255) * weight, 0, 1.6);
      if (max > peak) peak = max;
    }
    this._audioPeak = peak;
    return levels;
  }

  _shapeAudioBars(raw) {
    const count = raw.length;
    const shape = this._ensureAudioShape(count);
    let peak = 0;
    let lowSum = 0;
    let lowCount = 0;
    for (let index = 0; index < count; index += 1) {
      const value = raw[index] || 0;
      if (value > peak) peak = value;
      if (index < Math.max(3, Math.floor(count / 12))) {
        lowSum += value;
        lowCount += 1;
      }
    }
    // 全局慢包络留住频段之间的相对差异；低频再走快/慢双包络做冲击检测。
    const gEnv = Math.max(peak, shape.peak * 0.978, 0.05);
    shape.peak = gEnv;
    const low = lowCount ? lowSum / lowCount : 0;
    shape.lowFast += (low - shape.lowFast) * 0.42;
    shape.lowSlow += (low - shape.lowSlow) * 0.052;
    let punch =
      shape.lowSlow > 0.001 ? (shape.lowFast - shape.lowSlow) / shape.lowSlow : 0;
    punch = clamp(punch, 0, 1.6);

    // 频谱通量（帧间正增量）检测鼓点/节拍，再压成快攻击、慢衰减的视觉包络。
    let flux = 0;
    for (let index = 0; index < count; index += 1) {
      const delta = raw[index] - (shape.prev[index] || 0);
      if (delta > 0) flux += delta;
      shape.prev[index] = raw[index] || 0;
    }
    shape.fluxMean += (flux - shape.fluxMean) * 0.04;
    let beat = shape.fluxMean > 0.004 ? flux / (shape.fluxMean * 2.6) - 0.4 : 0;
    beat = clamp(beat, 0, 1);
    shape.beatEnv = beat > shape.beatEnv ? beat : shape.beatEnv * 0.86;

    const bars = new Array(count);
    for (let index = 0; index < count; index += 1) {
      const value = raw[index] || 0;
      const d = count > 1 ? index / (count - 1) : 0; // 0 = 低频，1 = 高频
      const abs = Math.min(0.60, value / gEnv);
      const mean = shape.mean[index] || (value > 0 ? value : 0.02);
      const rel = value / Math.max(0.015, mean);
      shape.mean[index] = mean + (value - mean) * 0.035;
      const dd = Math.pow(d, 0.6);
      const span = 0.12 + (1.45 - 0.12) * dd;
      const mid = 0.94 + (0.45 - 0.94) * dd;
      const ag = clamp((rel - mid) / span, 0, 1);
      const weight = 0.72 + 0.22 * d;
      const mix = abs * (1 - weight) + ag * weight;
      const gain = 1.35 + 0.42 * (1 - d);
      const kickW = Math.pow(1 - d, 2);
      const puls =
        mix * (1 - 0.28 * kickW * (1 - shape.beatEnv)) + 0.65 * shape.beatEnv * kickW;
      bars[index] = clamp(puls * gain * (1 + 0.12 * punch), 0, 1);
    }
    shape.punch = punch;
    shape.low = clamp((bars[0] + bars[1] + bars[2]) / 3, 0, 1);
    return { bars, punch, low: shape.low };
  }

  _syncSpectrum() {
    const bars = Array.from(this.renderRoot?.querySelectorAll?.(".hm-bar") || []);
    if (
      !bars.length ||
      this._thumbPreview ||
      (this._config?.visualizer || "bars") !== "bars"
    ) {
      this._spectrumBars = [];
      this._stopSpectrum();
      this._teardownAudioSpectrum();
      return;
    }
    this._spectrumBars = bars;
    const reduceMotion =
      typeof matchMedia === "function" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!this._spectrumPlaying() || reduceMotion) {
      this._stopSpectrum();
      this._syncAudioPlayback(false, this._readMedia());
      this._applySpectrumIdle();
      return;
    }
    const media = this._readMedia();
    this._syncSpectrumTrack(media);
    this._ensureAudioSpectrum();
    this._syncAudioPlayback(true, media);
    if (this._spectrumRaf) return;
    this._spectrumLast = 0;
    this._spectrumRaf = requestAnimationFrame((now) => this._spectrumTick(now));
  }

  _applySpectrumIdle() {
    const frame = visualizerFrame(this._readMedia());
    const count = this._spectrumBars.length;
    for (let index = 0; index < count; index += 1) {
      const band = index < 12 ? 0 : index < 24 ? 1 : 2;
      const base = 0.12 + [0.1, 0.06, 0.03][band];
      const level = Math.min(0.24, base + frame.energy * 0.04);
      this._spectrumBars[index]?.style.setProperty("--h", level.toFixed(3));
    }
  }

  _maAnalysisAvailable() {
    const services = this._hass?.services;
    return Boolean(
      services?.ha_music_analysis?.get_track_analysis ||
        services?.["ha_music_analysis"]?.["get_track_analysis"]
    );
  }

  _ensureMaAnalysis(media, key) {
    if (!this._maAnalysisAvailable() || !key || !this._eid()) return;
    if (this._maAnalysis?.key === key || this._maAnalysisLoadingKey === key) {
      return;
    }
    if (
      this._maAnalysisFailedKey === key &&
      Date.now() - this._maAnalysisFailedAt < 60 * 1000
    ) {
      return;
    }
    this._maAnalysisLoadingKey = key;
    const entityId = this._eid();
    let request;
    try {
      request = this._hass.callService(
        "ha_music_analysis",
        "get_track_analysis",
        { entity_id: entityId },
        undefined,
        false,
        true
      );
    } catch {
      this._maAnalysisLoadingKey = "";
      this._maAnalysisFailedKey = key;
      this._maAnalysisFailedAt = Date.now();
      return;
    }
    Promise.resolve(request)
      .then((response) => {
        const payload =
          response?.service_response ?? response?.response ?? response;
        const record = payload?.[entityId] ?? payload;
        const wave = Array.isArray(record?.waveform)
          ? record.waveform
          : Array.isArray(record)
            ? record
            : null;
        if (!wave?.length) {
          this._maAnalysisFailedKey = key;
          this._maAnalysisFailedAt = Date.now();
          return;
        }
        this._maAnalysis = {
          key,
          waveform: wave,
          bpm: Number(record?.bpm) || 0,
          energy: Number(record?.energy) || 0,
          duration: Number(record?.duration) || Number(media.duration) || 0,
          title: record?.title || "",
          artist: record?.artist || "",
          source: record?.bpm_source || "",
        };
        this._maAnalysisKey = key;
        this._maAnalysisAt = Date.now();
        this._maAnalysisFailedKey = "";
        this._maAnalysisFailedAt = 0;
        this._resetAudioShape();
      })
      .catch(() => {
        this._maAnalysisFailedKey = key;
        this._maAnalysisFailedAt = Date.now();
      })
      .finally(() => {
        if (this._maAnalysisLoadingKey === key) {
          this._maAnalysisLoadingKey = "";
        }
      });
  }

  _maSpectrumShaped(count, media) {
    const data = this._maAnalysis;
    if (!data || data.key !== this._spectrumKey || !data.waveform?.length) {
      return null;
    }
    const wave = data.waveform;
    const duration = data.duration || Number(media.duration) || 0;
    const position = Number(media.position) || 0;
    const ratio = duration > 0 ? clamp(position / duration, 0, 0.999) : 0;
    const posIndex = ratio * (wave.length - 1);
    const binsPerSecond =
      duration > 0 ? wave.length / Math.max(1, duration) : wave.length / 180;
    const span = clamp(
      Math.round(binsPerSecond * 2.8),
      8,
      Math.min(wave.length, 240)
    );
    const step = Math.max(1, span / Math.max(1, count - 1));
    const raiseSpan = Math.max(1, Math.round(binsPerSecond * 0.14));
    const raw = new Array(count);
    const bpm = Number(data.bpm) || 0;
    const period = bpm > 20 ? 60 / bpm : 0;
    for (let index = 0; index < count; index += 1) {
      const d = count > 1 ? index / (count - 1) : 0;
      const sample = clamp(
        Math.round(posIndex - (count - 1 - index) * step),
        0,
        wave.length - 1
      );
      const previous = clamp(sample - raiseSpan, 0, wave.length - 1);
      const rms = Number(wave[sample]) || 0;
      const prev = Number(wave[previous]) || 0;
      const rise = Math.max(0, rms - prev);
      const profile = 1.0 - 0.52 * Math.pow(d, 0.85);
      const lowWeight = Math.pow(1 - d, 2);
      let beat = clamp(rise * 4.2, 0, 1);
      if (period > 0) {
        const phase = ((((position % period) + period) % period) / period);
        beat = Math.max(beat, Math.exp(-phase * 5.2));
      }
      raw[index] = clamp(
        rms * (1.42 * profile + 0.2) + beat * 0.56 * lowWeight,
        0,
        1.6
      );
    }
    return this._shapeAudioBars(raw);
  }

  _spectrumTick(now) {
    if (!this._spectrumBars.length) {
      this._stopSpectrum();
      return;
    }
    if (!this._spectrumPlaying()) {
      this._applySpectrumIdle();
      this._syncAudioPlayback(false, this._readMedia());
      this._stopSpectrum();
      return;
    }
    const dt = this._spectrumLast
      ? Math.min(0.05, Math.max(0.001, (now - this._spectrumLast) / 1000))
      : 0.016;
    this._spectrumLast = now;
    const media = this._readMedia();
    const frame = visualizerFrame(media);
    const key = this._trackKey(this._state());
    if (key !== this._spectrumKey) {
      this._spectrumKey = key;
      this._spectrumLevels = this._spectrumBars.map(() => 0.12);
      this._syncSpectrumTrack(media);
    }
    this._ensureMaAnalysis(media, key);
    const time = now / 1000;
    const levels = this._spectrumLevels;
    const count = this._spectrumBars.length;
    const audioReady = this._audioSpectrumReady();
    const audioRaw = audioReady ? this._readAudioLevels(count) : null;
    const shaped = audioRaw ? this._shapeAudioBars(audioRaw) : null;
    const audioTargets = shaped?.bars || null;
    const maShaped = audioTargets ? null : this._maSpectrumShaped(count, media);
    const maTargets = maShaped?.bars || null;
    if (audioReady) {
      if (
        !this._audioPeak &&
        now - this._audioStartedAt > 1500
      ) {
        this._audioZeroFrames += 1;
        if (this._audioZeroFrames > 90) {
          this._failAudioSpectrum();
        }
      } else if (this._audioPeak) {
        this._audioZeroFrames = 0;
      }
    }
    for (let index = 0; index < count; index += 1) {
      let target;
      if (audioTargets) {
        target = audioTargets[index];
      } else if (maTargets) {
        target = maTargets[index];
      } else {
        const band = index < 12 ? 0 : index < 24 ? 1 : 2;
        const seed = hashString(`${frame.seed}#${index}`);
        const phase = ((seed % 360) / 360) * Math.PI * 2;
        const x = index / Math.max(1, count - 1);
        const profile = 1.02 - x * 0.5 + Math.sin(index * 1.7 + phase) * 0.1;
        const slow = 0.5 + 0.5 * Math.sin(time * 2.35 + phase + index * 0.28);
        const fast = 0.5 + 0.5 * Math.sin(time * 7.6 + phase * 1.7 + index * 0.62);
        const beat =
          0.5 +
          0.5 *
            Math.sin(
              (media.position / (1.65 + (frame.hash % 45) / 100)) *
                Math.PI * 2 +
              phase
            );
        const bandDrive = band === 0 ? frame.low : band === 1 ? frame.pulse : 0.45;
        const transient = Math.sin(time * 3.3 + seed * 0.0007) > 0.88 ? 1.16 : 1;
        target = clamp(
          profile *
            (0.52 + slow * 0.54) *
            (0.76 + fast * 0.34) *
            (0.8 + beat * 0.4) *
            (0.86 + bandDrive * 0.24) *
            transient,
          0.1,
          1
        );
      }
      const current = Number.isFinite(levels[index]) ? levels[index] : 0.12;
      const realTargets = audioTargets || maTargets;
      const attack = target > current ? (realTargets ? 0.72 : 0.52) : realTargets ? 0.22 : 0.24;
      const next = current + (target - current) * (1 - Math.exp(-attack * dt * 60));
      levels[index] = next;
      this._spectrumBars[index]?.style.setProperty("--h", next.toFixed(3));
    }
    this._spectrumRaf = requestAnimationFrame((nextNow) => this._spectrumTick(nextNow));
  }

  _renderDrawer() {
    const drawer = this._drawer;
    const t = translator(this._hass?.language);
    const isLibrary = drawer.mode === "library";
    const isPlaylists = drawer.mode === "playlists";
    const isQueue = drawer.mode === "queue";
    return html`
      <div
        class="hm-drawer ${drawer.open ? "open" : ""}"
        role="dialog"
        aria-hidden=${drawer.open ? "false" : "true"}
      >
        <div class="hm-drawer-head">
          ${isLibrary && drawer.cursor >= 0
            ? html`<button
                class="hm-icon-btn"
                aria-label=${t("back")}
                title=${t("back")}
                @click=${() => this._browseBack()}
              >
                ${icon("chevronLeft", 16)}
              </button>`
            : nothing}
          <div class="hm-drawer-title">${drawer.title || (isLibrary ? t("library") : "")}</div>
          ${(isPlaylists || (isQueue && drawer.maUrl)) && drawer.maUrl
            ? html`<button
                class="hm-icon-btn hm-ma"
                aria-label=${t("openAssistant")}
                title=${t("openAssistant")}
                @click=${() => this._openAssistant()}
              >
                ${icon("external", 15)}
              </button>`
            : nothing}
          <button
            class="hm-icon-btn"
            aria-label=${t("close")}
            title=${t("close")}
            @click=${() => this._closeDrawer()}
          >
            ${icon("close", 16)}
          </button>
        </div>
        <div class="hm-drawer-body">
          ${isQueue && drawer.note
            ? html`<div class="hm-drawer-note">${drawer.note}</div>`
            : nothing}
          ${drawer.loading
            ? html`<div class="hm-empty"><span class="hm-spinner"></span></div>`
            : drawer.error
              ? html`<div class="hm-empty">${drawer.error}</div>`
              : drawer.items.length
                ? this._renderDrawerItems(drawer.items, drawer.mode)
                : html`<div class="hm-empty">
                    ${isLibrary
                      ? t("browseFailed")
                      : isPlaylists
                        ? t("playlistsEmpty")
                        : t("queueEmpty")}
                  </div>`}
        </div>
      </div>
    `;
  }

  _renderDrawerItems(items, mode) {
    const t = translator(this._hass?.language);
    const isLibrary = mode === "library";
    const isPlaylists = mode === "playlists";
    return items.map((item) => {
      if (isPlaylists) {
        const thumb = normalizeArt(this._hass, item.thumb);
        return html`<button
          class="hm-list-item"
          data-empty=${item.empty ? "true" : "false"}
          @click=${() => this._playPlaylistItem(item)}
        >
          <span
            class="hm-list-thumb"
            style=${thumb ? `background-image:url("${thumb}")` : ""}
          >
            ${thumb ? nothing : icon("playlist", 16)}
          </span>
          <span class="hm-list-text">
            <span class="hm-list-name">${item.title || "—"}</span>
            <span class="hm-list-sub">${item.empty ? t("playlistUnavailable") : item.subtitle}</span>
          </span>
          <span class="hm-list-tail">${icon("play", 14)}</span>
        </button>`;
      }
      if (isLibrary) {
        const thumb = normalizeArt(this._hass, item.thumb);
        return html`<button
          class="hm-list-item"
          @click=${() => this._enterBrowseItem(item)}
        >
          <span
            class="hm-list-thumb"
            style=${thumb ? `background-image:url("${thumb}")` : ""}
          >
            ${thumb ? nothing : icon(item.canExpand ? "library" : "music", 16)}
          </span>
          <span class="hm-list-text">
            <span class="hm-list-name">${item.title || "—"}</span>
            <span class="hm-list-sub">${item.subtitle}</span>
          </span>
          <span class="hm-list-tail">
            ${item.canExpand ? icon("chevronRight", 14) : nothing}
          </span>
        </button>`;
      }
      const thumb = normalizeArt(this._hass, item.art);
      return html`<button
        class="hm-list-item"
        data-active=${item.active ? "true" : "false"}
        @click=${() => this._playQueueItem(item)}
      >
        <span
          class="hm-list-thumb"
          style=${thumb ? `background-image:url("${thumb}")` : ""}
        >
          ${thumb ? nothing : icon("music", 16)}
        </span>
        <span class="hm-list-text">
          <span class="hm-list-name">${item.title || t("noTitle")}</span>
          <span class="hm-list-sub">${item.artist || item.album || ""}</span>
        </span>
        <span class="hm-list-tail">${item.duration ? formatTime(item.duration) : ""}</span>
      </button>`;
    });
  }

  /* ---------------- 编辑器入口 ---------------- */

  static getStubConfig(hass) {
    const states = hass?.states || {};
    const entity =
      Object.keys(states).find(
        (id) =>
          id.startsWith("media_player.") &&
          states[id]?.attributes?.supported_features !== undefined
      ) || "";
    return { entity, theme: DEFAULT_THEME };
  }

  static getConfigElement() {
    return document.createElement("ha-music-editor");
  }
}

if (!customElements.get("ha-music")) {
  customElements.define("ha-music", HaMusicCard);

  window.customCards = window.customCards || [];
  window.customCards.push({
    type: CARD_TYPE,
    name: CARD_NAME,
    description:
      "现代炫酷配色的全功能音乐播放器卡片：封面取色、频谱可视化、媒体库浏览、播放队列、多设备切换。",
    preview: true,
    documentationURL: "https://github.com/RockJesus/ha-music",
  });

  console.info(
    `%c HA-MUSIC %c v${CARD_VERSION} `,
    "background:#2ee6c5;color:#04121a;font-weight:700;border-radius:4px 0 0 4px",
    "background:#7b5cff;color:#fff;border-radius:0 4px 4px 0"
  );
}
