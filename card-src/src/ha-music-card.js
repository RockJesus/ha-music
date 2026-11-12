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
  hasFeature,
  normalizeArt,
  friendlyName,
  colorTriplet,
  deterministicPalette,
  hexToHsl,
  mixHsl,
  hashString,
} from "./util.js";
import { paletteFor } from "./palette.js";

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
    };
  }

  constructor() {
    super();
    this._config = {};
    this._hass = undefined;
    this._activeEntity = "";
    this._sig = "";
    this._width = 0;
    this._tickTimer = null;
    this._toast = "";
    this._toastTimer = null;
    this._menu = null;
    this._seekPreview = null;
    this._volumePreview = null;
    this._showRemaining = false;
    this._drawer = this._emptyDrawer();
    this._artUrl = "";
    this._artSlot = 0;
    this._palette = null;
    this._paletteKey = "";
    this._resizeObserver = null;
  }

  /* ---------------- 生命周期 ---------------- */

  set hass(hass) {
    const previous = this._hass;
    this._hass = hass;
    if (!hass) return;
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
    if (!list.includes(this._activeEntity)) {
      this._activeEntity = list[0];
      this._palette = null;
      this._paletteKey = "";
      this._artUrl = "";
    }
    this._sig = "";
    if (this._hass) this._sig = this._computeSig(this._hass);
    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();
    if (typeof ResizeObserver !== "undefined") {
      this._resizeObserver = new ResizeObserver((entries) => {
        const width = entries[0]?.contentRect?.width || 0;
        if (Math.abs(width - this._width) < 1) return;
        this._width = width;
        const layout = this._config?.layout || "adaptive";
        if (layout === "adaptive") this.requestUpdate();
      });
      this._resizeObserver.observe(this);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopTimer();
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;
    if (this._toastTimer) clearTimeout(this._toastTimer);
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
      this._tickTimer = setInterval(() => this.requestUpdate(), 1000);
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

  _layoutKey() {
    const requested = this._config?.layout || "adaptive";
    if (requested === "adaptive") {
      if (!this._width) return "full";
      return this._width < 430 ? "compact" : "full";
    }
    return ["full", "compact", "mini"].includes(requested) ? requested : "full";
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
    this._guard(this._call(playing ? "media_pause" : "media_play"));
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
    if (!Number.isFinite(seconds)) return;
    this._guard(this._call("media_seek", { seek_position: seconds }));
  }

  _onSeekInput(event) {
    const input = event.target;
    const value = Number(input.value);
    this._seekPreview = value;
    const duration = readMedia(this._state()).duration;
    input.style.setProperty(
      "--pct",
      `${duration ? clamp((value / duration) * 100, 0, 100) : 0}%`
    );
  }

  _onSeekCommit(event) {
    const value = Number(event.target.value);
    this._seekPreview = null;
    this._seekTo(value);
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
    const info = this._volumeInfo(readMedia(this._state()));
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
    const media = readMedia(this._state());
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

  _playQueueItem(item) {
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

  _switchEntity(entityId) {
    if (entityId === this._activeEntity) return;
    this._activeEntity = entityId;
    this._palette = null;
    this._paletteKey = "";
    this._artUrl = "";
    this._menu = null;
    this._seekPreview = null;
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
    const insideMenu = path.some((node) => node?.classList?.contains?.("hm-menu"));
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

  _openQueue() {
    const t = translator(this._hass?.language);
    const items = readQueue(this._state(), this._config?.max_queue ?? 40);
    this._drawer = {
      open: true,
      mode: "queue",
      nodes: [],
      cursor: -1,
      items,
      title: t("queue"),
      loading: false,
      error: "",
    };
    this.requestUpdate();
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
    const mediaType = item.contentType || "playlist";
    const notifyDone = () => {
      this._notify(`${t("playingPlaylist")} · ${item.title || ""}`);
      this._closeDrawer();
    };
    const useMA = Boolean(
      this._hass?.services?.music_assistant?.play_media
    );
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
        // 退回到标准 play_media，兼容不同 MA 版本
      }
    }
    try {
      await this._call("play_media", {
        media_content_id: item.contentId,
        media_content_type: mediaType,
      });
      notifyDone();
    } catch (err) {
      this._notify(err?.message || t("browseFailed"));
    }
  }

  _closeDrawer() {
    this._drawer = { ...this._drawer, open: false };
    this.requestUpdate();
    setTimeout(() => {
      if (this._drawer.open) return;
      this._drawer = this._emptyDrawer();
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
    const url = this._artUrlFor();
    if (url !== this._artUrl) {
      this._artUrl = url;
      this._crossFadeArt(card, url);
    }
    this._syncRangeValues();
  }

  _artUrlFor() {
    const media = readMedia(this._state());
    return normalizeArt(this._hass, media.art);
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
      this._maybePalette("");
    };
    image.src = url;
  }

  _maybePalette(url) {
    const media = readMedia(this._state());
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
    const media = readMedia(this._state());
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

  /* ---------------- 渲染 ---------------- */

  render() {
    const hass = this._hass;
    const config = this._config || {};
    const t = translator(hass?.language);
    const layout = this._layoutKey();
    const themeKey = this._themeKey();

    if (!hass) {
      return html`
        <div class="hm-card" data-layout=${layout} data-theme=${themeKey} style=${styleMap(this._themeVars())}>
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
        <div class="hm-card" data-layout=${layout} data-theme=${themeKey} style=${styleMap(this._themeVars())}>
          <div class="hm-body">
            <div class="hm-empty">
              ${entityId ? `实体未找到：${entityId}` : "ha-music: entity 未配置"}
            </div>
          </div>
        </div>
      `;
    }

    const media = readMedia(state);
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
    const showQueue =
      config.show_queue !== false && queue.length > 0;
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

    const coverUrl = normalizeArt(hass, media.art);

    return html`
      <div
        class="hm-card"
        data-theme=${themeKey}
        data-layout=${layout}
        data-playing=${playing ? "true" : "false"}
        data-cover=${coverMode}
        style=${styleMap(this._themeVars())}
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
              ${maShow
                ? html`<button
                    class="hm-icon-btn hm-ma"
                    aria-label=${t("playlists")}
                    title=${t("playlists")}
                    @click=${() => this._openPlaylists()}
                  >
                    ${icon("playlist", 16)}
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
                    aria-label=${t("power")}
                    title=${t("power")}
                    @click=${() => this._power()}
                  >
                    ${icon("power", 16)}
                  </button>`
                : nothing}
              <button
                class="hm-icon-btn"
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
                    return html`<button
                      class="hm-entity-chip"
                      data-active=${id === entityId ? "true" : "false"}
                      @click=${() => this._switchEntity(id)}
                    >
                      <span
                        class="hm-entity-dot"
                        style=${art ? `background-image:url("${art}")` : ""}
                      ></span>
                      <span class="hm-entity-name">${friendlyName(hass, id, id)}</span>
                    </button>`;
                  })}
                </div>`
            : nothing}

          <section class="hm-main">
            <div class="hm-cover-wrap">
              <button
                class="hm-cover"
                data-playing=${playing ? "true" : "false"}
                aria-label=${t("more")}
                title=${mediaTitle || t("noMedia")}
                @click=${() => this._moreInfo()}
              >
                ${coverUrl
                  ? html`<img src=${coverUrl} alt=${mediaTitle || ""} />`
                  : html`<span class="hm-cover-ph">${icon("music", 40)}</span>`}
              </button>
              <div class="hm-cover-halo"></div>
            </div>

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
            </div>
          </section>

          ${visualizer !== "none"
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
                    @click=${() => this._guard(this._call("media_previous_track"))}
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
                    @click=${() => this._guard(this._call("media_next_track"))}
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
    if (kind === "wave") {
      return html`<div class="hm-wave-wrap">
        <svg viewBox="0 0 600 40" preserveAspectRatio="none" aria-hidden="true">
          <path
            d=${wavePath(600, 40, 150, 14, 0)}
            fill="none"
            stroke="rgba(var(--hm-a1-rgb), 0.85)"
            stroke-width="1.4"
          ></path>
          <path
            d=${wavePath(600, 40, 150, 9, 1.9)}
            fill="none"
            stroke="rgba(var(--hm-a2-rgb), 0.6)"
            stroke-width="1.2"
          ></path>
          <path
            d=${wavePath(600, 40, 75, 5, 3.2)}
            fill="none"
            stroke="rgba(var(--hm-a1-rgb), 0.35)"
            stroke-width="0.9"
          ></path>
        </svg>
      </div>`;
    }
    if (kind === "orbit") {
      return html`<div class="hm-orbit-wrap">
        <span class="hm-orbit-ring"></span>
        <span class="hm-orbit-ring"></span>
        <span class="hm-orbit-ring"></span>
      </div>`;
    }
    const seed = `${media.title}|${media.artist}`;
    const count = 36;
    return html`<div class="hm-bars">
      ${Array.from({ length: count }, (_, index) => {
        const h = hashString(`${seed}#${index}`);
        const height = 0.16 + (h % 100) / 130;
        const duration = 0.9 + ((h >> 8) % 100) / 90;
        const delay = -(((h >> 16) % 100) / 45);
        return html`<span
          class="hm-bar"
          style=${styleMap({
            "--h": String(Math.min(height, 1)),
            "--dur": `${duration.toFixed(2)}s`,
            "--delay": `${delay.toFixed(2)}s`,
          })}
        ></span>`;
      })}
    </div>`;
  }

  _renderDrawer() {
    const drawer = this._drawer;
    const t = translator(this._hass?.language);
    const isLibrary = drawer.mode === "library";
    const isPlaylists = drawer.mode === "playlists";
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
          ${isPlaylists && drawer.maUrl
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
            <span class="hm-list-sub">${item.subtitle}</span>
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
