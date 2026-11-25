import { LitElement, html, nothing } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { cardStyles } from "./styles.js";
import { icon } from "./icons.js";
import {
  CARD_NAME,
  CARD_TYPE,
  CARD_VERSION,
  FEATURES,
  SFX_PRESETS,
  THEMES,
  DEFAULT_THEME,
  translator,
  mediaClassLabel,
} from "./const.js";
import { PROTOCOL_VERSION, protocolMatches, protocolErrorText, queueEventCompatible } from "./protocol.js";
import {
  clamp,
  formatTime,
  readMedia,
  readQueue,
  readMassQueueItems,
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
  dropIndexFromRects,
} from "./util.js";
import { paletteFor } from "./palette.js";
import { fallbackCover } from "./fallback-cover.js";
import { installDocks, loadDockPref, saveDockPref, subscribeDockPref, uninstallDock, normalizeDockModes, normalizeDockEntities, normalizeDockThemes, normalizeDockFollow, DOCK_REMOVE_EVENT } from "./dock.js";
import { installLyricDock, uninstallLyricDock, loadLyricDockPref, saveLyricDockPref } from "./lyric-dock.js";
import { syncCoverSpin } from "./cover-spin.js";
import { syncFabEq, setFabEqHover } from "./fab-eq.js";
import {
  WebPlayer,
  iosModelInfo,
  platformName,
  screenSize,
  webPlayerClientId,
  webPlayerName,
} from "./web-player.js";

const MOBILE_MEDIA =
  "(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (max-height: 500px)";

// 播放器胶囊的长按判定：按住超过这个时长才算“拿起”，短按仍然是切换播放器。
const CHIP_LONG_PRESS_MS = 380;

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

// Lit 的文本绑定靠注释标记（marker comment）定位，直接写 textContent 会把标记一起抹掉，
// 下一次渲染就会抛 "Cannot set properties of null (setting 'data')" 并整次更新中断
// （封面旋转、歌词同步、频谱都会停在旧状态，表现为刷新几次才对）。这里只改标记之间的文本节点。
function setLitText(el, text) {
  if (!el) return;
  const value = String(text);
  // 必须从 Lit 的 marker comment 之后取绑定节点：模板里的换行/缩进会先产生空白 Text 节点，
  // 若写进空白节点，下一次 Lit 渲染仍会往自己的绑定节点写，界面上就会出现两份文字
  // （例如「3:283:28」「62%%」这类叠字）。
  let marker = null;
  for (let n = el.firstChild; n; n = n.nextSibling) {
    if (n.nodeType === 8) {
      marker = n;
      break;
    }
  }
  if (marker) {
    let node = marker.nextSibling;
    while (node && node.nodeType === 8) node = node.nextSibling;
    if (node && node.nodeType === 3) {
      if (node.data !== value) node.data = value;
      return;
    }
    // 绑定位置不是文本节点（条件渲染换了元素）时不动 DOM，交给 Lit 自己更新。
    return;
  }
  // 元素里没有任何绑定标记，说明是纯静态文本，才退回 textContent。
  if (!el.querySelector?.("*")) el.textContent = value;
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

const QUEUE_WINDOW_BEFORE = 40;
const QUEUE_WINDOW_SIZE = 120;

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
    this._seekSettleTimer = null;
    this._ringSeeking = false;
    this._ringSeekId = 0;
    this._ringSeekValue = null;
    this._ringSeekCx = null;
    this._ringSeekCy = null;
    this._ringHover = false;
    this._ringSeekWinBound = false;
    this._ringSeekWinMove = null;
    this._ringSeekWinUp = null;
    this._volumePreview = null;
    this._volumeCommitAt = 0;
    this._mutedOverride = null;
    this._muteSettleTimer = null;
    this._volumeSettleTimer = null;
    this._volumeSettleTicks = 0;
    this._showRemaining = false;
    this._drawer = this._emptyDrawer();
    this._queueLoadToken = 0;
    this._queueUnsub = null;
    this._queueSubscriptionKey = "";
    this._queueFirst = null;
    this._queueSnapshot = null;
    this._studioQueueKey = "";
    this._studioFavorite = null;
    this._studioAutoplay = false;
    this._studioCrossfade = false;
    this._studioBusy = false;
    this._waveform = null;
    this._waveformKey = "";
    this._playersOpen = false;
    this._maPlayers = [];
    this._playersBusy = false;
    this._cardBusy = false;
    this._chipPress = null;
    this._chipPressTimer = null;
    this._chipDrag = null;
    this._chipDragEndAt = 0;
    this._chipOrderStyles = null;
    this._chipOrderCommitPending = false;
    this._webPlayer = null;
    this._webTicket = "";
    this._webTicketUrl = "/api/ha_music_studio/sendspin";
    this._webTicketAt = 0;
    this._webTicketTtl = 300;
    this._webTicketLoading = null;
    this._webBusy = false;
    this._webAutoScheduled = false;
    this._webAutoTimer = null;
    this._webAutoFailed = false;
    this._webAutoStarted = false;
    this._webAutoOwner = null;
    this._webLastState = "";
    this._webPlayerId = "";
    this._webExposeError = "";
    this._webRetryTimer = null;
    this._webRegisterRound = 0;
    this._webEntity = "";
    this._webReturnEntity = "";
    this._webName = webPlayerName();
    this._webClientId = webPlayerClientId();
    this._webPlayerState = null;
    this._webEntityTimer = null;
    this._localWebEntity = "";
    this._localWebSyncTimer = null;
    this._localWebSyncBusy = false;
    this._localWebSyncKey = "";
    this._localWebSyncAt = 0;
    this._themeOverride = this._loadThemeOverride();
    this._themeOpen = false;
    this._sfxKey = this._loadSfx();
    this._sfxOpen = false;
    this._sfxBusy = false;
    this._sfxSynced = false;
    this._isFullscreen = false;
    this._artUrl = "";
    this._artSource = "";
    this._artApplied = "";
    this._artLoading = "";
    this._artFailedSource = "";
    this._audioSpec = null;
    this._audioSpecKey = "";
    this._audioSpecAt = 0;
    this._artSeq = 0;
    this._artSlot = 0;
    this._coverLayers = ["", ""];
    this._coverSlot = 0;
    this._coverPending = "";
    this._coverReady = [false, false];
    this._coverFadeTimer = null;
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
    this._lyricsSlot = false;
    this._lyricsKey = "";
    this._lyrics = { status: "idle", lines: [], plain: [], instrumental: false, source: "" };
    this._lyricsActive = -1;
    this._lyricsScrolled = -2;
    this._lyricsScrollRaf = null;
    this._lyricsScrollObserver = null;
    this._lyricsScrollObserved = null;
    this._lyricsOffset = this._loadLyricsOffset();
    this._lyricsUnsub = null;
    this._lyricsPending = false;
    this._lyricsSubKey = "";
    this._lyricsTrackId = "";
    // 歌词请求的幂等键：同一首歌失败过就不再自激重试（等换歌/手动重试）
    this._lyricsAttemptKey = "";
    this._lyricsFailedKey = "";
    this._coverPress = null;
    this._coverGesture = "";
    this._coverGestureTimer = null;
    this._coverPending = null;
    this._coverDragTimer = null;
    this._queueSnapshotTask = null;
    this._coverSuppressClick = false;
    this._coverSuppressTimer = null;
    this._progressRaf = null;
    this._progressLastSecond = -1;
    this._spectrumRaf = null;
    this._spectrumCanvas = null;
    this._spectrumCtx = null;
    this._spectrumCount = 0;
    this._spectrumCssW = 0;
    this._spectrumCssH = 0;
    this._spectrumDpr = 1;
    this._spectrumLevels = [];
    this._spectrumZoneGrads = null;
    this._spectrumZoneGradKey = "";
    this._bandLevels = Object.assign([0.18, 0.14, 0.1], { live: false });
    this._spectrumLast = 0;
    this._spectrumKey = "";
    this._audioShape = null;
    this._positionClock = null;
    // HA Music Studio：服务端 30fps 48 段真实频谱。
    this._studioBands = null;
    this._studioZones = null;
    this._studioSplit = null;
    this._studioPeak = 0;
    this._studioRms = 0;
    this._studioFrames = 0;
    this._studioAt = 0;
    this._studioKey = "";
    this._studioUnsub = null;
    this._studioPending = false;
    this._studioFailedAt = 0;
  }

  /* ---------------- 生命周期 ---------------- */

  set hass(hass) {
    const previous = this._hass;
    this._hass = hass;
    if (!hass) return;
    this._scheduleAutoWebPlayer();
    this._pinLocalWebEntityFromStates();
    if (!this._webNameResolved) this._resolveWebPlayerName();
    if (this._webPlayer?.connected && this._webEntity) {
      const webState = hass.states?.[this._webEntity]?.state || "";
      if (webState !== this._webLastState) {
        this._webLastState = webState;
        // playing/paused 时加回胶囊，idle/off 时自动隐藏。
        this._queueLocalWebEntitySync(250);
      }
    }
    this._autoSwitchToPlaying(hass);
    if (!this._sfxSynced) queueMicrotask(() => this._syncSoundEffect());
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
    // 切歌立即重绘，并同步解析当前封面，不依赖下一次整卡 updated()。
    if (trackChanged) this.requestUpdate();
    // 切歌时 MA 还没算完 processing chain：规格先到了、bit_perfect 还是 null，
    // 这种情况要继续轮询补判定，否则标识要等整页刷新才出现。
    if (
      trackChanged ||
      !prior ||
      !this._audioSpec ||
      (this._audioSpec && this._audioSpec.bitPerfect == null)
    ) {
      this._loadAudioSpec(trackKey);
    }
    this._syncArt(readMedia(state), entityId);
    // 封面旋转跟播放状态走：不依赖 Lit 是否真的重绘（重绘失败或签名未变时也能纠正）。
    this._safeEffect("cover-spin", () => this._syncCoverSpinEffect());
    // 静音/音量以实体属性为准：状态回传到本地后清掉乐观值，再强制同步一次控件。
    if (this._mutedOverride !== null) {
      const actualMuted = Boolean(attrs.is_volume_muted);
      if (actualMuted === this._mutedOverride) {
        this._mutedOverride = null;
        if (this._muteSettleTimer) clearTimeout(this._muteSettleTimer);
        this._muteSettleTimer = null;
      }
    }
    queueMicrotask(() => this._syncRangeValues());
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
    const prevTheme = this._config?.theme;
    this._config = { ...config };
    // 卡片设置（编辑器 / YAML）里的 theme 变更时，清掉运行时选择，回到设置值
    if (prevTheme !== undefined && prevTheme !== config.theme && this._themeOverride) {
      this._themeOverride = null;
      try {
        window.localStorage?.removeItem("ha-music-theme");
      } catch {
        /* ignore */
      }
    }
    if (!list.includes(this._activeEntity)) {
      this._activeEntity = list[0];
      this._sfxSynced = false;
      this._palette = null;
      this._paletteKey = "";
      this._artUrl = "";
      this._artSource = "";
      this._artFailedSource = "";
      this._resetCoverLayers();
      this._resetLyrics();
    }
    if (this._config.show_lyrics === false) this._lyricsOpen = false;
    this._sig = "";
    if (this._hass) this._sig = this._computeSig(this._hass);
    this._syncTimer();
    this.requestUpdate();
    // 首次 hass 可能早于 setConfig 到达（此时还没实体，规格会被跳过），
    // 配置就绪后补一次音频规格读取，保证歌名/歌手下面的编码・采样率默认就有。
    if (this._hass) {
      const state = this._state(this._eid());
      this._audioSpecKey = "";
      this._audioSpecAt = 0;
      this._loadAudioSpec(this._trackKey(state));
    }
    this._queueLocalWebEntitySync(700);
  }

  connectedCallback() {
    super.connectedCallback();
    this._thumbPreview = this._isThumbnailPreview();
    this._onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      if (this._drawer.open) this._closeDrawer();
      else if (this._themeOpen) {
        this._themeOpen = false;
        this.requestUpdate();
      } else if (this._sfxOpen) {
        this._sfxOpen = false;
        this.requestUpdate();
      } else if (this._menu) {
        this._menu = null;
        this.requestUpdate();
      }
    };
    this._onFullscreenChange = () => {
      this._isFullscreen = Boolean(document.fullscreenElement);
      this.requestUpdate();
    };
    document.addEventListener("fullscreenchange", this._onFullscreenChange);
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
    this._onDockRemove = (event) => this._handleDockRemove(event.detail);
    window.addEventListener(DOCK_REMOVE_EVENT, this._onDockRemove);
    this._onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // 切后台不再主动断开：Sendspin 会话继续保持，实体不会变 unavailable。
        // 只有页面被销毁（disconnectedCallback）或用户手动断开才真正断连。
        return;
      }
      this._webAutoScheduled = false;
      // 后台期间若被浏览器回收/网络掐断，回到前台时静默重建会话。
      if (this._webPlayer && !this._webPlayer.isConnected) {
        const keepEntity = this._webEntity || this._localWebEntity;
        this._webPlayer.disconnect();
        this._webPlayer = null;
        this._webPlayerId = "";
        this._webPlayerState = null;
        this._webAutoStarted = false;
        this._webEntity = keepEntity;
        this.requestUpdate();
      }
      this._scheduleAutoWebPlayer();
    };
    document.addEventListener("visibilitychange", this._onVisibilityChange);
    this._unlockWebAudio = () => {
      // 自动连接发生在页面加载时，AudioContext 需要一次真实手势才能出声。
      // 每次 pointerdown 都尝试恢复：AudioContext 可能要到真正开始拉流时才
      // 由 SDK 创建，第一次手势不一定能覆盖到它。
      if (this._webPlayer?.connected) {
        Promise.resolve(this._webPlayer.unlock?.()).catch(() => {});
      }
    };
    document.addEventListener("pointerdown", this._unlockWebAudio, true);
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
    window.removeEventListener("keydown", this._onKeyDown);
    document.removeEventListener("fullscreenchange", this._onFullscreenChange);
    this._unsubscribeDockPref?.();
    this._unsubscribeDockPref = null;
    window.removeEventListener(DOCK_REMOVE_EVENT, this._onDockRemove);
    document.removeEventListener("visibilitychange", this._onVisibilityChange);
    if (this._unlockWebAudio) {
      document.removeEventListener("pointerdown", this._unlockWebAudio, true);
      this._unlockWebAudio = null;
    }
    if (this._webAutoTimer) clearTimeout(this._webAutoTimer);
    this._webAutoTimer = null;
    if (this._webAutoOwner === this) this._webAutoOwner = null;
    this._cancelChipPress();
    this._chipDrag = null;
    this._chipOrderStyles = null;
    this._chipOrderCommitPending = false;
    if (this._webEntityTimer) clearTimeout(this._webEntityTimer);
    this._webEntityTimer = null;
    if (this._localWebSyncTimer) clearTimeout(this._localWebSyncTimer);
    this._localWebSyncTimer = null;
    this._webPlayer?.disconnect();
    this._webPlayer = null;
    if (this._seekSettleTimer) clearTimeout(this._seekSettleTimer);
    this._seekSettleTimer = null;
    this._ringSeeking = false;
    this._ringSeekValue = null;
    this._unbindRingSeekWindow();
    if (this._volumeSettleTimer) clearInterval(this._volumeSettleTimer);
    this._volumeSettleTimer = null;
    this._volumeSettleTicks = 0;
    if (this._muteSettleTimer) clearTimeout(this._muteSettleTimer);
    this._muteSettleTimer = null;
    this._mutedOverride = null;
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
    this._stopProgressTicker();
    if (this._coverGestureTimer) clearTimeout(this._coverGestureTimer);
    if (this._coverDragTimer) clearTimeout(this._coverDragTimer);
    if (this._coverSuppressTimer) clearTimeout(this._coverSuppressTimer);
    this._stopSpectrum();
    this._coverGestureTimer = null;
    this._coverSuppressTimer = null;
    this._coverPress = null;
    this._coverPending = null;
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;
    this._lyricsScrollObserver?.disconnect();
    this._lyricsScrollObserver = null;
    this._lyricsScrollObserved = null;
    if (this._lyricsScrollRaf && typeof cancelAnimationFrame === "function") {
      cancelAnimationFrame(this._lyricsScrollRaf);
    }
    this._lyricsScrollRaf = null;
    if (this._fitPanelRaf) cancelAnimationFrame(this._fitPanelRaf);
    this._fitPanelRaf = null;
    if (this._toastTimer) clearTimeout(this._toastTimer);
    this._teardownStudioLyrics();
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
    const out = list.filter(Boolean);
    // 本机 Web 播放器常驻：仪表盘重渲染会用保存的配置覆盖内存态，这里
    // 每次取实体列表都把它补回来，停止/闲置都不会从列表里消失。
    const pinned = this._localWebEntity;
    if (pinned && this._hass?.states?.[pinned] && !out.includes(pinned)) out.push(pinned);
    return out;
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
    const meta = attrs.media_metadata || {};
    return [
      this._eid(),
      meta.title || attrs.media_title || "",
      meta.artist || attrs.media_artist || "",
      meta.album_name || attrs.media_album_name || "",
      meta.duration ?? attrs.media_duration ?? 0,
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
    const volumeState = volumeEntity ? hass.states?.[volumeEntity] : null;
    const volumeSig = volumeState
      ? [
          volumeState.state,
          volumeState.attributes?.volume_level,
          volumeState.attributes?.is_volume_muted,
          volumeState.attributes?.min,
          volumeState.attributes?.max,
        ]
      : null;
    const others = this._entities().map((id) => {
      const item = hass.states?.[id];
      return [id, item?.state, item?.attributes?.entity_picture];
    });
    return JSON.stringify([
      entityId,
      state?.state,
      picked,
      volumeSig,
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
    this._teardownStudioLyrics();
    this._lyricsKey = "";
    this._lyricsTrackId = "";
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
    this._lyricsKey = "";
    this._ensureStudioLyrics(true);
    this.requestUpdate();
  }

  _lyricsPosition(position) {
    return Math.max(0, (Number(position) || 0) + this._lyricsOffset);
  }

  _teardownStudioLyrics() {
    const unsubscribe = this._lyricsUnsub;
    this._lyricsUnsub = null;
    this._lyricsPending = false;
    this._lyricsSubKey = "";
    if (typeof unsubscribe === "function") {
      try {
        unsubscribe();
      } catch (error) {
        /* 已断开的订阅忽略 */
      }
    } else if (unsubscribe && typeof unsubscribe.then === "function") {
      unsubscribe.then((fn) => fn?.()).catch(() => {});
    }
  }

  _ensureStudioLyrics(force = false) {
    if (!this._lyricsEnabled() || this._thumbMode()) return;
    const connection = this._hass?.connection;
    if (!connection || typeof connection.subscribeMessage !== "function") {
      this._lyrics = {
        status: "error",
        lines: [],
        plain: [],
        instrumental: false,
        source: "Music Assistant",
      };
      this._lyricsFailedKey = this._lyricsAttemptKey;
      return;
    }
    const entityId = this._eid();
    const subKey = `${entityId}|${this._lyricsOffset}`;
    if (!force && subKey === this._lyricsSubKey && (this._lyricsUnsub || this._lyricsPending)) {
      return;
    }
    if (this._lyricsSubKey && this._lyricsSubKey !== subKey) this._teardownStudioLyrics();
    this._lyricsSubKey = subKey;
    this._lyricsPending = true;
    const handle = (unsubscribe) => {
      this._lyricsPending = false;
      this._lyricsFailedKey = "";
      if (this._lyricsSubKey !== subKey) {
        try {
          unsubscribe?.();
        } catch (error) {
          /* 切换实体后的旧订阅 */
        }
        return;
      }
      this._lyricsUnsub = unsubscribe;
    };
    const fail = (error) => {
      this._lyricsPending = false;
      if (this._lyricsSubKey !== subKey) return;
      this._lyrics = {
        status: "error",
        lines: [],
        plain: [],
        instrumental: false,
        source: "Music Assistant",
      };
      // 记住这次失败，避免 updated() 里的 _maybeLoadLyrics 再次发起同样的请求。
      this._lyricsFailedKey = this._lyricsAttemptKey;
      this.requestUpdate();
    };
    try {
      Promise.resolve(
        connection.subscribeMessage(
          (event) => this._onStudioLyrics(event, subKey),
          {
            type: "ha_music_studio/subscribe_lyrics",
            entity_id: entityId,
            offset: this._lyricsOffset,
          },
          { resubscribe: true }
        )
      )
        .then(handle)
        .catch(fail);
    } catch (error) {
      fail(error);
    }
  }

  _onStudioLyrics(event, subKey) {
    if (!event || subKey !== this._lyricsSubKey || !this.isConnected) return;
    if (!protocolMatches(event)) {
      this._lyrics = {
        status: "error",
        protocol: false,
        message: protocolErrorText(this._hass?.language),
        lines: [],
        plain: [],
        instrumental: false,
        source: "Music Assistant",
      };
      this._lyricsActive = -1;
      this._lyricsScrolled = -2;
      this.requestUpdate();
      return;
    }
    if (event.type === "lyrics_error") {
      this._lyrics = {
        status: "error",
        lines: [],
        plain: [],
        instrumental: false,
        source: "Music Assistant",
      };
      this.requestUpdate();
      return;
    }
    if (event.type !== "lyrics") return;
    if (event.status === "idle") {
      this._lyrics = {
        status: "none",
        lines: [],
        plain: [],
        instrumental: false,
        source: "Music Assistant",
      };
      this._lyricsActive = -1;
      this._lyricsScrolled = -2;
      this.requestUpdate();
      return;
    }
    if (event.status === "loading") {
      const keep = this._lyrics.lines?.length || this._lyrics.plain?.length;
      this._lyrics = {
        status: "loading",
        stale: Boolean(keep),
        lines: this._lyrics.lines || [],
        plain: this._lyrics.plain || [],
        instrumental: Boolean(this._lyrics.instrumental),
        source: "Music Assistant",
        index: -1,
        progress: 0,
      };
      this._lyricsActive = -1;
      this._lyricsScrolled = -2;
      this.requestUpdate();
      return;
    }
    if (event.status === "error") {
      this._lyrics = {
        status: "error",
        lines: [],
        plain: [],
        instrumental: false,
        source: "Music Assistant",
      };
      this.requestUpdate();
      return;
    }
    const lines = Array.isArray(event.lines)
      ? event.lines.map((line) => ({
          time: Number(line.time) || 0,
          text: String(line.text || ""),
        }))
      : [];
    const plain = Array.isArray(event.plain) ? event.plain.map((line) => String(line)) : [];
    const ready = event.status === "ready" && (lines.length || plain.length);
    if (event.track_id && event.track_id !== this._lyricsTrackId) {
      this._lyricsTrackId = event.track_id;
      this._lyricsScrolled = -2;
      this._lyricsActive = -1;
    }
    if (ready) this._lyricsSlot = true;
    this._lyrics = {
      status: ready ? "ready" : "none",
      lines,
      plain,
      instrumental: Boolean(event.instrumental),
      source: "Music Assistant",
      index: Number.isInteger(event.index) ? event.index : -1,
      progress: Number(event.progress) || 0,
    };
    if (ready && Number.isInteger(event.index) && event.index >= 0) {
      if (event.index !== this._lyricsActive) {
        this._lyricsActive = event.index;
        this._lyricsScrolled = event.index;
        this._centerActiveLyric();
      }
    } else if (ready) {
      this._lyricsActive = -1;
    }
    this.requestUpdate();
  }

  _syncCoverEq() {
    // 选择器缩略图/编辑预览只做静态展示：不创建、不刷新封面频谱画布，
    // 一张 1200px 画布在 DPR 2-3 下就是几十 MB，是缩略图内存的大头。
    if (this._thumbMode()) return;
    const canvas = this.renderRoot?.querySelector?.(".hm-cover-eq");
    const cover = this.renderRoot?.querySelector?.(".hm-cover");
    if (!canvas || !cover) return;
    const wrapNode = cover.parentElement;
    // 线性频谱进度模式下，横向频谱已经承担音柱职责，外圈再画一圈会重复且抢焦点。
    if (wrapNode?.dataset?.fusionLinear === "true") {
      wrapNode.dataset.eq = "false";
      return;
    }
    const state = this._state();
    const media = this._readMedia();
    const width = Math.max(
      72,
      Math.round(cover.getBoundingClientRect().width || this._coverPx(this._layoutKey())),
    );
    // 窄屏面板同样要留出足够的环形律动空间。之前只外扩 10px，封面半径
    // 已经大于画布半径，音柱几乎全部画在画布外，只剩零星几根短线。
    const narrowPanel =
      Boolean(this._panel) &&
      Boolean(this.renderRoot?.querySelector?.(".hm-card")?.classList?.contains("hm-narrow-panel"));
    const band = narrowPanel
      ? Math.min(120, Math.max(84, Math.round(width * 0.24)))
      : width >= 300
        ? 88
        : 48;
    const size = Math.min(1200, width + band);
    if (canvas.style.width !== `${size}px`) canvas.style.width = `${size}px`;
    if (canvas.style.height !== `${size}px`) canvas.style.height = `${size}px`;
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
      innerRadius: width / 2 + 8,
      lineWidth:
        width >= 300
          ? Math.max(1.8, Math.min(2.6, width / 210))
          : Math.max(2.2, Math.min(4.8, width / 130)),
      bars: width >= 300 ? 192 : width >= 150 ? 64 : 48,
      cap: width >= 300 ? "butt" : "round",
      maxSize: 1200,
      target: cover,
      applyShadow: false,
      maxFps: this._isMobileUi() ? 30 : 0,
      dpr: this._isMobileUi() ? 1.5 : 2,
      accent,
      progress: this._fusionLayout() === "ring" ? this._fusionPercent() : -1,
      persist: this._fusionLayout() === "ring",
      hoverHead: this._ringHover === true,
      title: first(media.title),
      artist: first(media.artist),
      album: first(media.album),
      bands: this._bandLevels,
    });
  }

  _maybeLoadLyrics() {
    if (!this._lyricsEnabled() || this._thumbMode()) {
      this._teardownStudioLyrics();
      this._lyricsSlot = false;
      return;
    }
    const media = this._readMedia();
    if (!media.title) {
      this._teardownStudioLyrics();
      this._lyricsKey = "";
      this._lyricsTrackId = "";
      if (this._lyrics.status !== "idle") {
        this._lyrics = { status: "idle", lines: [], plain: [], instrumental: false, source: "" };
        this._lyricsActive = -1;
        this._lyricsScrolled = -2;
        this.requestUpdate();
      }
      return;
    }
    const entityId = this._eid();
    if (this._lyricsKey === entityId && (this._lyricsUnsub || this._lyricsPending)) return;
    // 同一首（实体+标题+歌手+偏移）已经请求失败过：不再重复进入。
    // 否则 fail() 里的 requestUpdate 会再次触发 updated() → 这里 → requestUpdate，
    // 形成同步自激循环，把主线程占满（歌词服务异常/未装订阅命令时必现）。
    const attemptKey = [entityId, media.title, media.artist || "", this._lyricsOffset].join("\u001f");
    if (this._lyricsFailedKey === attemptKey) return;
    this._lyricsAttemptKey = attemptKey;
    const wasLoading = this._lyrics?.status === "loading";
    const sameEntity = this._lyricsKey === entityId;
    if (!sameEntity) this._lyricsSlot = false;
    this._lyricsKey = entityId;
    const prev = sameEntity ? this._lyrics : null;
    const hold = Boolean(prev && (prev.lines?.length || prev.plain?.length));
    // 切歌期间保留上一首的歌词骨架（半透明占位），不要把侧栏/面板抽空，
    // 否则歌词每次重新匹配都会把布局推一下。
    this._lyrics = {
      status: "loading",
      stale: hold,
      lines: hold ? prev.lines : [],
      plain: hold ? prev.plain : [],
      instrumental: hold ? prev.instrumental : false,
      source: "Music Assistant",
      index: -1,
      progress: 0,
    };
    this._lyricsActive = -1;
    this._lyricsScrolled = -2;
    if (!wasLoading) this.requestUpdate();
    this._ensureStudioLyrics();
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
      // 用户主动打开：清掉上一次的失败记录，允许再试一次。
      this._lyricsFailedKey = "";
      this._maybeLoadLyrics();
    }
    this.requestUpdate();
  }

  _retryLyrics() {
    this._lyricsKey = "";
    this._lyricsFailedKey = "";
    this._teardownStudioLyrics();
    this._lyricsOpen = true;
    this._maybeLoadLyrics();
    this.requestUpdate();
  }

  // 宽高比形态：用于给模板打 data-shape，让 CSS 能针对超宽/竖长/方形重排。
  // 只按宽高比例判定，不改动原有 full/compact/mini 语义。
  _shape() {
    if (this._thumbMode()) return "normal";
    const width = this._width || 0;
    const height = this._height || 0;
    if (!width || !height) return "normal";
    const aspect = width / height;
    if (!this._panel) {
      // 超宽矮条（3440×300、1680×220 这类横幅）：上下分栏会把内容压扁，改成单行横排。
      if (
        (width >= 720 && height <= 320 && aspect >= 2.6) ||
        (width >= 560 && height <= 280 && aspect >= 2.2)
      ) {
        return "banner";
      }
      // 宽屏横排：放宽内容宽度，避免超宽屏两侧大片留白。
      if (width >= 760 && height >= 340 && aspect >= 2.1) return "wide";
      if (aspect <= 0.62 && height >= 480) return "tall";
      if (aspect >= 0.8 && aspect <= 1.25 && width >= 320 && height >= 320) return "square";
    }
    return "normal";
  }

  _layoutKey() {
    if (this._thumbMode()) return "full";
    if (this._panel) {
      // 面板/预览也可能是宽而矮的格子（如 460×320），不能一律 full 竖排。
      if (this._width && this._height && this._width < 620 && this._height < 460) return "compact";
      return "full";
    }
    const requested = this._config?.layout || "adaptive";
    if (requested === "adaptive") {
      const width = this._width;
      const height = this._height;
      if (!width) return "full";
      // 注意：_shape() 里的 aspect 是局部变量，这里必须自己再算一次，
      // 否则宽度 <300 的分支会抛 "aspect is not defined"。
      const aspect = height ? width / height : 0;
      const shape = this._shape();
      if (shape === "banner") return "compact";
      // 宽屏但不够高（1000×360 这类默认格子）：full 竖排会切掉播放键，降级紧凑单行
      if (shape === "wide") return (height && height < 470) ? "compact" : "full";
      // 极窄卡片（≈240px 方格）连标题都会溢出，统一走单行 mini。
      // 极小方格（240×240）留 mini 会只剩控制键、没有歌名，改成紧凑版式；
      // 只有明显偏横幅的极小卡才走 mini。
      if (width < 300 && (aspect >= 1.5 || !height || height < 180)) return "mini";
      if (shape === "tall") return "full";
      if (shape === "square") {
        return width < 520 || (height && height < 440) ? "compact" : "full";
      }
      // 明显偏矮（<330）且不宽的格子：上下分栏必然裁切，降级紧凑。
      if (height && height < 330 && width < 900) return "compact";
      // 网格卡片可能很矮（例如 6 列 × 2 行）：只按宽度判断会把大卡片
      // 塞进矮格子里，导致封面/控制条被裁掉。这里同时看可用高度。
      // 卡片选择器可能是 280×600 这种窄高比例：此时不能用 mini，
      // 否则只剩中间一行控制、上下大片空白；宽度够且高度富余时走纵向 full。
      if (width >= 240 && height >= 520 && width < 620) return "full";
      if (width < 340 && (!height || height < 190)) return "mini";
      // 宽但矮的网格卡片（如 460×320）不能按 full 竖排，否则封面和音量会被挤出卡片。
      if (width < 620 && height && height < 460) return "compact";
      // 12×6 默认格子常见 1000×360 这种「宽但不高」：full 竖排会把播放键切掉，按宽高比降级紧凑。
      if (height && width / height >= 2.0 && height < 460) return "compact";
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
    const shape = this._shape();
    if (shape === "banner") {
      return Math.round(Math.min(150, Math.max(56, (this._height || 0) * 0.5)));
    }
    if (shape === "wide") {
      // 宽而矮的默认格子（1000×360）若封面取 120 会把底部音量行顶出卡片
      const h = this._height || 0;
      return Math.round(Math.min(210, Math.max(88, h * (h < 460 ? 0.24 : 0.3))));
    }
    if (shape === "tall") {
      const width = this._width || 0;
      return Math.round(
        Math.min(260, Math.max(140, Math.min(width * 0.6, (this._height || 0) * 0.3)))
      );
    }
    if (layout === "mini") return 44;
    if (this._compactCard()) {
      // 矮卡（手机默认卡片）：封面跟着高度收，留给文字与控件。
      return Math.round(Math.min(98, Math.max(58, height * 0.26)));
    }
    if (layout === "compact") {
      // 极矮小卡（<270）封面再收一档，否则播放键会被挤出卡片
      const base = Math.min(88, Math.max(52, height * 0.26));
      return this._tight() ? Math.round(Math.min(64, Math.max(40, base * 0.72))) : Math.round(base);
    }
    return Math.round(Math.min(178, Math.max(76, height * 0.22)));
  }

  _tight() {
    if (this._thumbMode()) return false;
    return this._layoutKey() === "compact" && (this._height || 0) < 270;
  }

  // 紧凑单行且偏矮（默认 12×6 格子、小方格）：收紧间距与控制尺寸，避免底部音量行溢出。
  _short() {
    if (this._thumbMode()) return false;
    return this._layoutKey() === "compact" && (this._height || 0) < 420;
  }

  // 极小格（<230px）：固定高度的音量行已塞不下，先隐藏音量，保住播放键与进度。
  _micro() {
    if (this._thumbMode()) return false;
    return this._layoutKey() === "compact" && (this._height || 0) < 230;
  }

  _styleVars() {
    return {
      ...this._themeVars(),
      "--hm-cover-size": `${this._coverPx(this._layoutKey())}px`,
    };
  }

  _themeKey() {
    if (this._themeOverride && THEMES[this._themeOverride]) return this._themeOverride;
    const theme = this._config?.theme;
    return theme && THEMES[theme] ? theme : DEFAULT_THEME;
  }

  _loadThemeOverride() {
    try {
      const stored = window.localStorage?.getItem("ha-music-theme");
      return stored && THEMES[stored] ? stored : null;
    } catch {
      return null;
    }
  }

  _themeLabel(key) {
    const label = THEMES[key]?.label;
    if (!label) return key;
    return String(this._hass?.language || "").startsWith("zh") ? label.zh : label.en;
  }

  _toggleThemeMenu() {
    this._themeOpen = !this._themeOpen;
    if (this._themeOpen) {
      this._sfxOpen = false;
      this._menu = null;
    }
    this.requestUpdate();
  }

  _setTheme(key) {
    if (!THEMES[key]) return;
    this._themeOverride = key;
    this._themeOpen = false;
    try {
      window.localStorage?.setItem("ha-music-theme", key);
    } catch {
      /* localStorage 不可用时仅当前会话生效 */
    }
    this._notify(this._themeLabel(key));
    this.requestUpdate();
  }

  _loadSfx() {
    try {
      const stored = window.localStorage?.getItem("ha-music-effect");
      return SFX_PRESETS.includes(stored) ? stored : "off";
    } catch {
      return "off";
    }
  }

  _sfxLabel(key) {
    const labelKey =
      key === "off" ? "sfxOff" : `sfx${key[0].toUpperCase()}${key.slice(1)}`;
    return translator(this._hass?.language)(labelKey);
  }

  async _setSfx(key) {
    if (!SFX_PRESETS.includes(key) || this._sfxBusy) return;
    const previous = this._sfxKey;
    this._sfxKey = key;
    this._sfxOpen = false;
    this._sfxBusy = true;
    try {
      window.localStorage?.setItem("ha-music-effect", key);
    } catch {
      /* localStorage 不可用时仅当前会话生效 */
    }
    this.requestUpdate();
    try {
      if (!this._hass?.callWS) throw new Error("not connected");
      const result = await this._hass.callWS({
        type: "ha_music_studio/sound_effect",
        action: "set",
        effect: key,
        entity_id: this._eid(),
      });
      if (result?.ok === false) throw new Error("effect failed");
      this._notify(this._sfxLabel(key));
    } catch (err) {
      this._sfxKey = previous;
      try {
        window.localStorage?.setItem("ha-music-effect", previous);
      } catch {
        /* ignore */
      }
      this._notify(translator(this._hass?.language)("soundFxFailed"));
    } finally {
      this._sfxBusy = false;
      this.requestUpdate();
    }
  }

  async _syncSoundEffect() {
    if (this._sfxSynced || !this._hass?.callWS || !this._eid()) return;
    this._sfxSynced = true;
    try {
      const result = await this._hass.callWS({
        type: "ha_music_studio/sound_effect",
        action: "get",
        entity_id: this._eid(),
      });
      const effect = SFX_PRESETS.includes(result?.effect) ? result.effect : "off";
      if (effect !== this._sfxKey) {
        this._sfxKey = effect;
        try {
          window.localStorage?.setItem("ha-music-effect", effect);
        } catch {
          /* ignore */
        }
        this.requestUpdate();
      }
    } catch {
      /* 后端未就绪时保持本地选择，不打扰播放 */
    }
  }

  _toggleSfxMenu() {
    this._sfxOpen = !this._sfxOpen;
    if (this._sfxOpen) this._themeOpen = false;
    this.requestUpdate();
  }

  _toggleFullscreen() {
    const doc = document;
    if (doc.fullscreenElement) {
      doc.exitFullscreen?.().catch(() => {});
      return;
    }
    const target = this;
    const request = target.requestFullscreen || target.webkitRequestFullscreen;
    if (!request) {
      this._notify(translator(this._hass?.language)("fullscreenUnsupported"));
      return;
    }
    try {
      const promise = request.call(target, { navigationUI: "hide" });
      promise?.catch?.(() => {
        try {
          target.webkitRequestFullscreen?.();
        } catch {
          this._notify(translator(this._hass?.language)("fullscreenUnsupported"));
        }
      });
    } catch {
      try {
        target.webkitRequestFullscreen?.();
      } catch {
        this._notify(translator(this._hass?.language)("fullscreenUnsupported"));
      }
    }
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
      "--hm-spec-a1": a1,
      "--hm-spec-a2": theme.accent[1],
      "--hm-ctl-a1": a1,
      "--hm-ctl-a2": theme.accent[1],
      "--hm-ctl-a1-rgb": rgb1,
      "--hm-ctl-a2-rgb": colorTriplet(theme.accent[1]),
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
    if (playing) {
      this._guard(this._call("media_pause"));
      return;
    }
    this._guard(this._resumePlay(this._eid()));
  }

  _maPlayable(entityId) {
    if (!this._hass?.services?.music_assistant?.play_media) return false;
    const attrs = this._state(entityId)?.attributes || {};
    return (
      attrs.mass_player_type !== undefined ||
      attrs.active_queue !== undefined ||
      entityId === this._localWebEntity ||
      entityId === this._webEntity
    );
  }

  _trackContentId(entityId) {
    const attrs = this._state(entityId)?.attributes || {};
    return String(attrs.media_content_id || attrs.media_uri || "").trim();
  }

  _playErrorText(error) {
    const raw = String(error?.message || error || "").trim();
    const t = translator(this._hass?.language);
    // 队列条目还在但取不到音频流（提供器授权过期、曲目下架）时，
    // HA 只会回一句 media item could not be found，这里换成能指导操作的提示。
    if (/could not be found|not found|cannot be found|找不到|no playable item/i.test(raw)) {
      return t("mediaLost");
    }
    if (/credential|login|unauthori|forbidden|授权|登录|token/i.test(raw)) {
      return t("mediaLost");
    }
    return raw.length > 80 ? `${raw.slice(0, 80)}…` : raw;
  }

  async _startTrackOnPlayer(entityId, contentId) {
    // MA 队列里没有当前条目时，media_play 会报 "media item could not be found"，
    // 并且 HA 前端会直接弹一条服务调用失败；这里改用 play_media 把这支曲子放回队列再播。
    if (!this._maPlayable(entityId)) return false;
    const id = contentId || this._trackContentId(entityId);
    if (!id) return false;
    const attrs = this._state(entityId)?.attributes || {};
    let mediaType = String(attrs.media_content_type || "track").trim() || "track";
    if (mediaType === "music") mediaType = "track";
    try {
      await this._hass.callService("music_assistant", "play_media", {
        entity_id: entityId,
        media_id: id,
        media_type: mediaType,
        enqueue: "play",
      });
      return true;
    } catch (error) {
      this._notify(this._playErrorText(error));
      return false;
    }
  }

  async _resumePlay(entityId) {
    const state = this._state(entityId)?.state;
    const idle = !state || ["idle", "off", "standby", "unknown", "unavailable"].includes(state);
    const contentId = this._trackContentId(entityId);
    // 待机/关机时队列里本来就没有可恢复的条目：先发 media_play 只会换来一条错误弹窗。
    if (idle) {
      if (contentId && (await this._startTrackOnPlayer(entityId, contentId))) return true;
      this._notify(translator(this._hass?.language)("queueEmpty"));
      return false;
    }
    try {
      await this._call("media_play", {}, "media_player", entityId);
      return true;
    } catch (error) {
      if (contentId && (await this._startTrackOnPlayer(entityId, contentId))) return true;
      this._notify(this._playErrorText(error));
      return false;
    }
  }

  _queueNeighborContent(direction) {
    const items = this._queueSnapshot?.items;
    if (!Array.isArray(items) || !items.length) return "";
    const active = items.findIndex((item) => item?.active);
    if (active < 0) return "";
    const item = items[direction === "next" ? active + 1 : active - 1];
    return String(item?.contentId || item?.uri || "").trim();
  }

  _skip(direction) {
    const entityId = this._eid();
    const moving = this._call(
      direction === "next" ? "media_next_track" : "media_previous_track",
    );
    this._guard(
      Promise.resolve(moving).catch(async (error) => {
        // 队列条目丢了的时候切歌同样会报 item not found，用快照里的邻曲补一枪。
        const fallback = this._queueNeighborContent(direction);
        if (fallback && (await this._startTrackOnPlayer(entityId, fallback))) return;
        this._notify(this._playErrorText(error));
      }),
    );
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

  _coverSize(cover) {
    if (cover?.offsetWidth) return cover.offsetWidth;
    const rect = cover?.getBoundingClientRect?.();
    if (rect?.width) return rect.width;
    return this._coverPx?.(this._layoutKey?.()) || 168;
  }

  _coverNeighborArt(direction) {
    const items = this._queueSnapshot?.items;
    if (!Array.isArray(items) || !items.length) return "";
    const index = items.findIndex((item) => item.active);
    if (index < 0) return "";
    const neighbor = items[direction === "next" ? index + 1 : index - 1];
    return String(neighbor?.art || "");
  }

  _ensureQueueSnapshot() {
    // 滑动时要用邻曲封面，队列快照还没到就先补一次。
    if (!this._studioReady?.() || this._thumbMode?.()) return;
    if (Array.isArray(this._queueSnapshot?.items) && this._queueSnapshot.items.length) return;
    if (this._queueSnapshotTask) return;
    try {
      this._queueSnapshotTask = this._queueCommand("snapshot")
        .then((response) => {
          this._queueSnapshotTask = null;
          const queue = response?.result?.queue || response?.queue;
          if (!queue || !Array.isArray(queue.items) || !queue.items.length) return;
          this._queueSnapshot = queue;
          this.requestUpdate();
        })
        .catch(() => {
          this._queueSnapshotTask = null;
        });
    } catch (error) {
      this._queueSnapshotTask = null;
    }
  }

  _coverPeekEl() {
    return this.renderRoot?.querySelector?.(".hm-cover-peek") || null;
  }

  _coverDragPreview(dx) {
    // 手指（或鼠标）拖动时：当前封面跟着走并渐出，邻曲封面在外侧跟着滑入。
    const cover = this.renderRoot?.querySelector?.(".hm-cover");
    const peek = this._coverPeekEl();
    if (!cover) return;
    const size = this._coverSize(cover);
    if (!size) return;
    const limited = clamp(dx, -size * 1.05, size * 1.05);
    // travel 是滑过一个封面宽的比例：当前封面按它线性渐隐，
    // 邻曲封面快 1.5 倍浮上来，滑三分之一就能看到“下一首在靠近”。
    const travel = Math.min(1, Math.abs(limited) / size);
    cover.style.transition = "none";
    cover.style.transform = `translate3d(${Math.round(limited)}px, 0, 0) scale(${(1 - travel * 0.12).toFixed(3)})`;
    cover.style.opacity = String(Math.max(0, 1 - travel * 0.95));
    if (!peek) return;
    const direction = limited <= 0 ? "next" : "prev";
    const art = this._coverNeighborArt(direction);
    if (!art) {
      peek.style.opacity = "0";
      return;
    }
    if (!peek.dataset.ready) {
      // 用布局偏移而不是 getBoundingClientRect：此时封面已经带着拖拽位移，
      // 量矩形会把位移算进邻曲封面基准位置，导致它“走两倍”。
      peek.style.left = `${cover.offsetLeft}px`;
      peek.style.top = `${cover.offsetTop}px`;
      peek.style.width = `${cover.offsetWidth}px`;
      peek.style.height = `${cover.offsetHeight}px`;
      peek.dataset.ready = "true";
    }
    if (peek.dataset.art !== art) {
      peek.dataset.art = art;
      peek.style.backgroundImage = `url("${art}")`;
    }
    // 邻曲封面略微缩一点出现，两张圆盘才塞得进卡片宽度，也带出层次。
    const offset = direction === "next" ? limited + size * 0.94 : limited - size * 0.94;
    peek.style.transition = "none";
    peek.style.transform = `translate3d(${Math.round(offset)}px, 0, 0) scale(${(0.82 + travel * 0.18).toFixed(3)})`;
    peek.style.opacity = String(Math.min(1, travel * 1.5));
    // 环形音柱固定在原槽位，封面滑走后留着会很怪，跟着一起淡掉。
    const eq = cover.parentElement?.querySelector?.(".hm-cover-eq");
    if (eq) eq.style.opacity = String(Math.max(0, 1 - travel * 1.2));
  }

  _resetCoverDrag() {
    const cover = this.renderRoot?.querySelector?.(".hm-cover");
    if (cover) {
      cover.style.transition = "";
      cover.style.transform = "";
      cover.style.opacity = "";
    }
    const peek = this._coverPeekEl();
    if (peek) {
      peek.style.transition = "";
      peek.style.transform = "translate3d(0, 0, 0)";
      peek.style.opacity = "0";
      peek.dataset.art = "";
      peek.dataset.ready = "";
    }
    const eq = cover?.parentElement?.querySelector?.(".hm-cover-eq");
    if (eq) eq.style.opacity = "";
  }

  _coverDragCancel() {
    const cover = this.renderRoot?.querySelector?.(".hm-cover");
    const peek = this._coverPeekEl();
    if (cover) {
      cover.style.transition =
        "transform 0.26s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.2s ease";
      cover.style.transform = "translate3d(0, 0, 0) scale(1)";
      cover.style.opacity = "1";
    }
    if (peek) {
      peek.style.transition = "opacity 0.18s ease, transform 0.24s ease";
      peek.style.opacity = "0";
    }
    if (this._coverDragTimer) clearTimeout(this._coverDragTimer);
    this._coverDragTimer = setTimeout(() => {
      this._coverDragTimer = null;
      this._resetCoverDrag();
    }, 300);
  }

  _coverSwipe(direction) {
    // 松手后把手势收尾：封面继续滑出，邻曲封面滑到圆心顶住画面，
    // 等真正切曲后的新封面到位再无缝换手，避免中间空一帧或旧图糊上来。
    const cover = this.renderRoot?.querySelector?.(".hm-cover");
    const peek = this._coverPeekEl();
    const size = this._coverSize(cover);
    const sign = direction === "next" ? -1 : 1;
    const beforeTitle = this._readMedia()?.title || "";
    if (this._coverPending) {
      this._skip(this._coverPending);
      this._coverPending = null;
    }
    this._coverPending = direction;
    if (this._coverGestureTimer) clearTimeout(this._coverGestureTimer);
    if (this._coverDragTimer) {
      clearTimeout(this._coverDragTimer);
      this._coverDragTimer = null;
    }
    const slide = Math.round(size * 1.12) * sign;
    if (cover) {
      cover.style.transition =
        "transform 0.24s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.22s ease";
      cover.style.transform = `translate3d(${slide}px, 0, 0) scale(0.9)`;
      cover.style.opacity = "0";
    }
    if (peek) {
      peek.style.transition =
        "transform 0.24s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.22s ease";
      peek.style.transform = "translate3d(0, 0, 0) scale(0.98)";
      peek.style.opacity = peek.dataset.art ? "1" : "0";
    }
    this._coverGestureTimer = setTimeout(() => {
      const pending = this._coverPending;
      this._coverPending = null;
      if (pending) this._skip(pending);
      // 封面留在圆心但隐藏，邻曲封面继续占位。
      if (cover) {
        cover.style.transition = "none";
        cover.style.transform = "translate3d(0, 0, 0) scale(1)";
        cover.style.opacity = "0";
      }
      const deadline = Date.now() + 1400;
      const settle = () => {
        if (!this.isConnected) return;
        const title = this._readMedia()?.title || "";
        const arrived = title !== beforeTitle;
        if (!arrived && Date.now() < deadline) {
          this._coverDragTimer = setTimeout(settle, 70);
          return;
        }
        if (cover) {
          if (arrived) {
            // 新曲封面已经在卡片内部完成交叉淡入，这里再补一段淡入会多压一层暗，
            // 看起来像“切歌闪一下”，所以直接落回不透明。
            cover.style.transition = "none";
            cover.style.opacity = "1";
          } else {
            cover.style.transition = "opacity 0.18s ease";
            cover.style.opacity = "1";
          }
        }
        if (peek) {
          peek.style.transition = "opacity 0.12s ease";
          peek.style.opacity = "0";
        }
        this.requestUpdate();
        this._coverDragTimer = setTimeout(() => {
          this._coverDragTimer = null;
          this._resetCoverDrag();
          this._coverGesture = "";
          this.requestUpdate();
        }, 460);
      };
      this._coverDragTimer = setTimeout(settle, 70);
    }, 250);
  }

  _onCoverPointerDown(event) {
    if (this._thumbMode() || (event.pointerType === "mouse" && event.button !== 0)) return;
    this._coverSuppressClick = false;
    if (this._coverSuppressTimer) clearTimeout(this._coverSuppressTimer);
    if (this._coverDragTimer) {
      clearTimeout(this._coverDragTimer);
      this._coverDragTimer = null;
      this._resetCoverDrag();
    }
    this._ensureQueueSnapshot();
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
      this._coverDragPreview(dx);
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
    if (press.captured) this._coverDragCancel();
    if (press.moved || Math.hypot(dx, dy) > 12) {
      this._coverSuppressClick = true;
      if (this._coverSuppressTimer) clearTimeout(this._coverSuppressTimer);
      this._coverSuppressTimer = setTimeout(() => {
        this._coverSuppressClick = false;
      }, 450);
    }
  }

  _onCoverPointerCancel() {
    const cancelled = Boolean(this._coverPress?.captured);
    this._coverPress = null;
    if (cancelled) this._coverDragCancel();
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
      if (this._seekSettleTimer) clearTimeout(this._seekSettleTimer);
      this._seekSettleTimer = null;
      this._seekPending = null;
      this._seekPreview = null;
      // 直接回写 DOM 并恢复 ticker：不依赖 Lit 是否会在本轮再重绘，
      // 避免拖动后“预览值卡住、进度条不再前进”。
      this._syncRangeValues();
      this._syncProgressTicker();
      return true;
    }
    return false;
  }

  _onSeekInput(event) {
    if (!hasFeature(this._state(), FEATURES.SEEK)) return;
    const input = event.target;
    const value = Number(input.value);
    this._seekPreview = value;
    this._stopProgressTicker();
    const duration = this._readMedia().duration;
    const pct = duration ? clamp((value / duration) * 100, 0, 100) : 0;
    input.style.setProperty("--pct", `${pct}%`);
    // 频谱进度条用同一个 input 驱动，直接改 CSS 变量，避免每帧整卡重渲染。
    const fusion = input.closest?.(".hm-fusion");
    if (fusion) {
      fusion.style.setProperty("--pct", `${pct}%`);
      const label = fusion.querySelector?.('[data-role="fusion-start"]');
      if (label) setLitText(label, formatTime(value));
    }
  }

  _ringBand(event) {
    // 用封面按钮的真实尺寸算环带：封面内交给播放/暂停，环带外不处理。
    const root = this.renderRoot;
    const cover = root?.querySelector?.(".hm-cover");
    if (!cover) return null;
    const rect = cover.getBoundingClientRect();
    if (!rect.width) return null;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const radius = rect.width / 2;
    const eqRect = root?.querySelector?.(".hm-cover-eq")?.getBoundingClientRect?.();
    const outer = Math.max(radius + 16, eqRect?.width ? eqRect.width / 2 : radius + 56);
    const dist = Math.hypot(event.clientX - cx, event.clientY - cy);
    if (dist < radius - 2 || dist > outer + 10) return null;
    return { cx, cy, radius, outer };
  }

  _bindRingSeekWindow() {
    if (this._ringSeekWinBound) return;
    this._ringSeekWinMove = (event) => this._onRingSeekMove(event);
    this._ringSeekWinUp = (event) => this._onRingSeekUp(event);
    window.addEventListener("pointermove", this._ringSeekWinMove, true);
    window.addEventListener("pointerup", this._ringSeekWinUp, true);
    window.addEventListener("pointercancel", this._ringSeekWinUp, true);
    this._ringSeekWinBound = true;
  }

  _unbindRingSeekWindow() {
    if (!this._ringSeekWinBound) return;
    window.removeEventListener("pointermove", this._ringSeekWinMove, true);
    window.removeEventListener("pointerup", this._ringSeekWinUp, true);
    window.removeEventListener("pointercancel", this._ringSeekWinUp, true);
    this._ringSeekWinBound = false;
    this._ringSeekWinMove = null;
    this._ringSeekWinUp = null;
  }

  _onRingSeekDown(event) {
    if (!hasFeature(this._state(), FEATURES.SEEK)) return;
    if (!this._readMedia().duration) return;
    if (this._ringSeeking) return;
    const band = this._ringBand(event);
    if (!band) return;
    event.preventDefault();
    event.stopPropagation();
    this._ringSeeking = true;
    this._ringSeekId = event.pointerId ?? 1;
    this._ringSeekCx = band.cx;
    this._ringSeekCy = band.cy;
    this._setRingHover(true);
    this._bindRingSeekWindow();
    this._applyRingSeek(event);
  }

  _onRingSeekMove(event) {
    if (!this._ringSeeking) {
      // 不在拖动时，pointermove 只用来判断鼠标是否落在环形进度带上。
      this._setRingHover(Boolean(this._ringBand(event)));
      return;
    }
    if (event.pointerId != null && this._ringSeekId != null && event.pointerId !== this._ringSeekId) return;
    event.preventDefault();
    this._applyRingSeek(event);
  }

  _onRingSeekUp(event) {
    if (!this._ringSeeking) return;
    if (event.pointerId != null && this._ringSeekId != null && event.pointerId !== this._ringSeekId) return;
    event.preventDefault();
    event.stopPropagation();
    this._ringSeeking = false;
    this._unbindRingSeekWindow();
    this._setRingHover(false);
    const value = this._ringSeekValue;
    this._ringSeekValue = null;
    if (value != null) this._commitSeekValue(value);
  }

  _onRingSeekCancel(event) {
    if (!this._ringSeeking) return;
    this._ringSeeking = false;
    this._ringSeekValue = null;
    this._unbindRingSeekWindow();
    this._seekPreview = null;
    this._syncCoverEq();
    this.requestUpdate();
  }

  _applyRingSeek(event) {
    let cx = this._ringSeekCx;
    let cy = this._ringSeekCy;
    if (cx == null || cy == null) {
      const band = this._ringBand(event);
      if (band) {
        cx = band.cx;
        cy = band.cy;
      }
    }
    if (cx == null || cy == null) return;
    const dx = event.clientX - cx;
    const dy = event.clientY - cy;
    // 6 点方向为 0，顺时针增长（下 -> 左 -> 上 -> 右）。
    let angle = Math.atan2(dy, dx) - Math.PI / 2;
    if (angle < 0) angle += Math.PI * 2;
    const ratio = clamp(angle / (Math.PI * 2), 0, 1);
    const duration = Number(this._readMedia().duration) || 0;
    if (!duration) return;
    const value = ratio * duration;
    this._ringSeekValue = value;
    this._seekPreview = value;
    this._stopProgressTicker();
    this._syncRingReadout(value);
    this._syncCoverEq();
  }

  _setRingHover(on) {
    const next = on === true;
    if (this._ringHover === next) return;
    this._ringHover = next;
    const canvas = this.renderRoot?.querySelector?.(".hm-cover-eq");
    if (canvas) {
      setFabEqHover(canvas, next);
      const wrap = canvas.parentElement;
      if (wrap?.dataset) wrap.dataset.ringhover = next ? "true" : "false";
    }
  }

  _syncRingReadout(value) {
    const root = this.renderRoot;
    if (!root) return;
    const label = root.querySelector('[data-role="ring-start"]');
    if (label) setLitText(label, formatTime(value));
    const slider = root.querySelector('[data-role="ringseek"]');
    if (slider) slider.setAttribute("aria-valuenow", String(Math.round(value)));
  }

  _commitSeekValue(value) {
    if (!hasFeature(this._state(), FEATURES.SEEK)) {
      this.requestUpdate();
      return;
    }
    const duration = Number(this._readMedia().duration) || 0;
    const clamped = duration ? clamp(value, 0, duration) : value;
    const state = this._state();
    const attrs = state?.attributes || {};
    this._seekPreview = clamped;
    this._stopProgressTicker();
    this._seekPending = {
      value: clamped,
      from: Number(attrs.media_position) || 0,
      stamp: String(attrs.media_position_updated_at || ""),
      trackKey: this._trackKey(state),
      at: Date.now(),
    };
    const pending = this._seekPending;
    if (this._seekSettleTimer) clearTimeout(this._seekSettleTimer);
    const release = () => {
      if (this._seekPreview !== clamped) return;
      this._seekSettleTimer = null;
      this._seekPending = null;
      this._seekPreview = null;
      this._syncRangeValues();
      this._syncProgressTicker();
      this.requestUpdate();
    };
    this._seekSettleTimer = setTimeout(release, 4000);
    this._seekTo(clamped).catch(() => {
      if (this._seekPending !== pending) return;
      if (this._seekSettleTimer) clearTimeout(this._seekSettleTimer);
      release();
    });
    this.requestUpdate();
  }

  _onSeekCommit(event) {
    this._commitSeekValue(Number(event.target.value));
  }

  _onVolumeInput(event) {
    // 移动端松手时 change 之后还会补发一次 input，会把刚清掉的预览值重新写回，
    // 造成滑块停在拖动值、百分比标签仍是实体旧值。提交后的短暂窗口内忽略补发。
    if (Date.now() - this._volumeCommitAt < 300) return;
    const value = Number(event.target.value) / 100;
    this._volumePreview = value;
    event.target.style.setProperty("--pct", `${value * 100}%`);
    // 模板里 "%" 是静态文本，这里只写数字，否则会渲染成「62%%」。
    setLitText(
      this.renderRoot?.querySelector?.(".hm-vol-pct"),
      String(Math.round(value * 100))
    );
  }

  _onVolumeCommit(event) {
    const volume = clamp(Number(event.target.value) / 100, 0, 1);
    this._volumeCommitAt = Date.now();
    // 先保持目标值，标签和滑块立即显示拖动结果，实体回读后再收敛。
    this._volumePreview = volume;
    event.target.style.setProperty("--pct", `${volume * 100}%`);
    setLitText(
      this.renderRoot?.querySelector?.(".hm-vol-pct"),
      String(Math.round(volume * 100))
    );
    if (this._volumeSettleTimer) clearInterval(this._volumeSettleTimer);
    this._volumeSettleTicks = 0;
    // 1.2 秒后再让实体值接管；移动端补发的 input 由 300ms 窗口忽略。
    setTimeout(() => {
      if (this._volumeCommitAt && this._volumePreview !== null) {
        this._volumePreview = null;
        this._syncRangeValues();
        this.requestUpdate();
      }
    }, 1200);
    // 设备音量可能被二次收敛（先接受 0.36，几秒后再降到 0.22）。
    // 提交后持续 9 秒、每 1.5 秒把滑块同步到实体值，直到音量稳定。
    this._volumeSettleTimer = setInterval(() => {
      this._volumeSettleTicks += 1;
      if (this._volumePreview === null) {
        this._syncRangeValues();
        this.requestUpdate();
      }
      if (this._volumeSettleTicks >= 6) {
        clearInterval(this._volumeSettleTimer);
        this._volumeSettleTimer = null;
      }
    }, 1500);
    this.requestUpdate();
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
    const next = !info.muted;
    // 先乐观切换图标，不等 HA 下一次状态回传；实体回传一致后自动清除。
    this._mutedOverride = next;
    if (this._muteSettleTimer) clearTimeout(this._muteSettleTimer);
    this._muteSettleTimer = setTimeout(() => {
      if (this._mutedOverride === next) {
        this._mutedOverride = null;
        this._syncRangeValues();
        this.requestUpdate();
      }
    }, 3000);
    this._syncRangeValues();
    this.requestUpdate();
    if (info.external) {
      if (info.domain === "media_player") {
        this._guard(
          this._call("volume_mute", { is_volume_muted: next }, "media_player", info.entityId)
        );
      } else {
        this._notify(translator(this._hass?.language)("volumeEntityMissing"));
      }
      return;
    }
    this._guard(this._call("volume_mute", { is_volume_muted: next }));
  }

  _volumeStep(delta) {
    const info = this._volumeInfo(this._readMedia());
    if (!info.supported) {
      this._notify(translator(this._hass?.language)("volumeEntityMissing"));
      return;
    }
    const from = this._volumePreview ?? info.level;
    const volume = clamp(Number(from) + delta, 0, 1);
    this._volumeCommitAt = Date.now();
    this._volumePreview = volume;
    if (this._volumeSettleTimer) clearInterval(this._volumeSettleTimer);
    this._volumeSettleTimer = null;
    this.requestUpdate();
    this._syncRangeValues();
    setTimeout(() => {
      if (this._volumePreview === volume) {
        this._volumePreview = null;
        this._syncRangeValues();
        this.requestUpdate();
      }
    }, 1200);
    if (info.domain === "media_player") {
      this._guard(
        this._call("volume_set", { volume_level: volume }, "media_player", info.entityId)
      );
    } else {
      const state = this._hass?.states?.[info.entityId];
      const max = Number(state?.attributes?.max ?? 100);
      const min = Number(state?.attributes?.min ?? 0);
      this._guard(
        this._call("set_value", { value: Math.round(min + volume * (max - min)) }, info.domain, info.entityId)
      );
    }
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

  async _openPlayers() {
    this._playersOpen = true;
    this.requestUpdate();
    // Ticket minting is cheap and authenticated. Preparing it before the
    // click lets connect() call unlock() as the first awaited work inside
    // the user gesture, which mobile browsers require for audio.
    this._ensureWebTicket().catch(() => {});
    await this._loadPlayers();
  }

  _closePlayers() {
    this._playersOpen = false;
    this.requestUpdate();
  }

  async _ensureWebTicket() {
    const age = Date.now() - this._webTicketAt;
    if (this._webTicket && age < (this._webTicketTtl - 15) * 1000) {
      return {
        ticket: this._webTicket,
        url: this._webTicketUrl,
        ttl: this._webTicketTtl,
      };
    }
    if (this._webTicketLoading) return this._webTicketLoading;
    const loading = (async () => {
      if (!this._webClientId) {
        this._webClientId = webPlayerClientId();
      }
      const response = await this._hass.connection.sendMessagePromise({
        type: "ha_music_studio/web_player_ticket",
        client_id: this._webClientId,
      });
      this._webTicket = String(response?.ticket || "");
      this._webTicketUrl = String(response?.url || "/api/ha_music_studio/sendspin");
      this._webTicketTtl = Number(response?.ttl) || 300;
      this._webTicketAt = Date.now();
      return {
        ticket: this._webTicket,
        url: this._webTicketUrl,
        ttl: this._webTicketTtl,
      };
    })();
    this._webTicketLoading = loading;
    try {
      return await loading;
    } finally {
      if (this._webTicketLoading === loading) this._webTicketLoading = null;
    }
  }

  _findWebPlayer(freshIds = null) {
    // 浏览器自己的 clientId 才是权威身份；_webPlayerId 可能仍是上一次会话
    // 或旧设备名对应的播放器，先匹配它会误选已离线的 Web 播放器。
    const clientId = this._webClientId || this._webPlayer?.clientId || "";
    if (clientId) {
      const own = this._maPlayers.find(
        (player) =>
          player.available !== false &&
          (player.player_id === clientId || player.player_id.endsWith(clientId))
      );
      if (own) return own;
    }
    if (this._webPlayerId) {
      const exact = this._maPlayers.find(
        (player) =>
          player.available !== false && player.player_id === this._webPlayerId
      );
      if (exact) return exact;
    }
    const named = this._maPlayers.filter(
      (player) =>
        player.available !== false &&
        ((clientId &&
          (player.player_id === clientId || player.player_id.endsWith(clientId))) ||
          (this._webName && player.name === this._webName))
    );
    if (freshIds) {
      const fresh = named.find((player) => !freshIds.has(player.player_id));
      if (fresh) return fresh;
    }
    return named[0] || null;
  }

  async _resolveWebPlayerName() {
    // iOS gives no model in the UA, so ask Home Assistant's device registry for
    // the companion app's hardware identifier and turn it into a marketing name.
    if (this._webNameResolved) return;
    this._webNameResolved = true;
    const platform = platformName();
    if (platform !== "iOS" && platform !== "Android") return;
    if (!this._hass?.callWS) {
      this._webNameResolved = false;
      return;
    }
    let label = "";
    try {
      const devices = await this._hass.callWS({ type: "config/device_registry/list" });
      const mobiles = (Array.isArray(devices) ? devices : []).filter((device) =>
        (device?.identifiers || []).some(
          (ident) => Array.isArray(ident) && ident[0] === "mobile_app"
        )
      );
      label = platform === "iOS" ? this._pickIosModel(mobiles) : this._pickAndroidModel(mobiles);
    } catch (error) {
      // A non-admin session cannot read the registry; keep the plain platform name.
      return;
    }
    if (!label || !this.isConnected) return;
    const next = `${webPlayerName()} ${label}`;
    if (next === this._webName) return;
    const wasConnected = Boolean(this._webPlayer?.connected);
    this._webName = next;
    this.requestUpdate();
    const entity = this._currentLocalWebEntity();
    if (entity) this._alignLocalWebEntityName(entity);
    if (wasConnected) {
      // The name travels in the Sendspin handshake, so re-announce it.
      this._disconnectWebPlayer(true);
      this._webAutoFailed = false;
      this._connectWebPlayer({ auto: true });
    }
  }

  _pickIosModel(devices) {
    const screen = screenSize();
    const w = Math.min(screen.width, screen.height);
    const h = Math.max(screen.width, screen.height);
    const known = [];
    let fallback = "";
    for (const device of devices) {
      const identifier = String(device?.model || "").trim();
      if (/^iPhone/i.test(identifier)) {
        if (!fallback) fallback = "iPhone";
      } else if (/^iPad/i.test(identifier)) {
        if (!fallback) fallback = "iPad";
      } else {
        continue;
      }
      const info = iosModelInfo(identifier);
      if (info) known.push(info);
    }
    if (!known.length) return fallback;
    const exact = known.find((info) => info[1] === w && info[2] === h);
    if (exact) return exact[0];
    const names = new Set(known.map((info) => info[0]));
    // Every registered iOS device is the same model, and this browser is on iOS:
    // that model is the only possible answer even if the size did not line up.
    if (names.size === 1) return known[0][0];
    return fallback;
  }

  _pickAndroidModel(devices) {
    const models = new Set();
    for (const device of devices) {
      const model = String(device?.model || "").trim();
      if (!model) continue;
      if (!/^(SM-|Pixel|Redmi|M[0-9]|HUAWEI|V2|CPH|KB|ONEPLUS)/i.test(model)) continue;
      models.add(model);
    }
    return models.size === 1 ? [...models][0] : "";
  }

  _scheduleAutoWebPlayer() {
    if (this._isPreviewContext()) return;
    if (typeof document !== "undefined" && document.visibilityState === "hidden") {
      return;
    }
    if (this._webAutoScheduled || this._webBusy || this._webPlayer?.connected) return;
    // 同一页面可能放了多张 ha-music 卡片；Web 播放器按浏览器身份只有一份，
    // 由第一张卡负责连接，其它卡只读取实体，避免互踢重连。
    const owner = window.__haMusicWebPlayerOwner;
    if (owner && owner !== this && owner.isConnected !== false) return;
    window.__haMusicWebPlayerOwner = this;
    this._webAutoOwner = this;
    this._webAutoScheduled = true;
    this._webAutoTimer = setTimeout(() => {
      this._webAutoTimer = null;
      if (!this._webAutoScheduled) return;
      this._webAutoScheduled = false;
      if (document.visibilityState === "hidden") return;
      this._connectWebPlayer({ auto: true });
    }, 1800);
  }

  async _connectWebPlayer(options = {}) {
    const auto = Boolean(options?.auto);
    if (this._webBusy || this._webPlayer?.connected) return;
    this._webBusy = true;
    this._webAutoFailed = false;
    const beforeIds = new Set(this._maPlayers.map((player) => player.player_id));
    this.requestUpdate();
    try {
      let info;
      const age = Date.now() - this._webTicketAt;
      if (this._webTicket && age < (this._webTicketTtl - 15) * 1000) {
        info = {
          ticket: this._webTicket,
          url: this._webTicketUrl,
          ttl: this._webTicketTtl,
        };
      } else {
        info = await this._ensureWebTicket();
      }
      if (!info?.ticket) throw new Error(translator(this._hass?.language)("webPlayerFailed"));
      const scheme = window.location.protocol === "https:" ? "wss" : "ws";
      const url = `${scheme}://${window.location.host}${info.url}?ticket=${encodeURIComponent(info.ticket)}`;
      this._webTicket = "";
      this._webTicketAt = 0;
      const player = new WebPlayer({
        url,
        name: this._webName,
        version: CARD_VERSION,
        onState: (state) => {
          this._webPlayerState = state;
        },
        onPairing: () => {
          this._registerWebPlayerPairing().catch((error) => {
            console.warn("HA Music: web player pairing failed", error);
          });
        },
        onReconnected: () => {
          // 配置保存/配对会让 MA 主动断开 socket，客户端用同一 URL 重连；
          // 重连后补一次配对，并在还没有实体时补一次曝光，避免停在半路。
          this._registerWebPlayerPairing()
            .then(() => {
              if (!this._webEntity) this._exposeWebPlayer().catch(() => {});
            })
            .catch((error) => {
              console.warn("HA Music: web player re-pair failed", error);
            });
        },
      });
      this._webPlayer = player;
      // The WebPlayer opens the Sendspin socket directly.  It deliberately
      // does not resume an AudioContext here: desktop browsers reject that
      // outside a user gesture and abort the handshake.
      await player.connect();
      // Music Assistant auto-pairs its built-in web player only when the
      // browser hands over the Sendspin pairing token. Without this the
      // server keeps the player unpaired and it never becomes playable.
      try {
        await this._registerWebPlayerPairing();
      } catch (error) {
        console.warn("HA Music: web player pairing failed", error);
      }
      this._webAutoStarted = true;
      if (!auto) this._notify(translator(this._hass?.language)("webPlayerConnected"));
      this._webBusy = false;
      this.requestUpdate();
      await this._exposeWebPlayer();
      await this._waitForWebPlayer(beforeIds, { auto });
    } catch (error) {
      this._webBusy = false;
      this._webAutoStarted = false;
      this._webPlayer?.disconnect();
      this._webPlayer = null;
      this._webAutoFailed = true;
      if (auto) {
        console.warn("HA Music: auto web player failed", error);
      } else {
        this._notify(
          `${translator(this._hass?.language)("webPlayerFailed")}: ${
            error?.message || String(error)
          }`.slice(0, 180)
        );
      }
      this.requestUpdate();
    }
  }

  async _registerWebPlayerPairing() {
    const pairingToken = this._webPlayer?.pairingToken || "";
    if (!pairingToken) {
      this._webExposeError = "no pairing token";
      return;
    }
    try {
      await this._hass.connection.sendMessagePromise({
        type: "ha_music_studio/web_player_pair",
        pairing_token: pairingToken,
        client_id: this._webClientId || this._webPlayer?.clientId || "",
      });
    } catch (error) {
      this._webExposeError = `pair: ${error?.message || String(error)}`.slice(0, 120);
      throw error;
    }
  }

  async _exposeWebPlayer() {
    // 配对后先让 Sendspin 会话稳定，再单独请求“暴露给 HA”。
    // 后端不会在配对流程里做 config/players/save，避免重注册踢掉刚连上的会话。
    const clientId = this._webClientId || this._webPlayer?.clientId || "";
    if (!clientId) {
      this._webExposeError = "no client id";
      return;
    }
    await this._loadPlayers().catch(() => {});
    for (let attempt = 0; attempt < 4; attempt += 1) {
      await new Promise((resolve) => setTimeout(resolve, 900));
      if (!this._webPlayer?.connected) return;
      // 会话注册后 Music Assistant 才把它挂到 player 上；优先用列表里真实存在的
      // player_id（有些 App WebView 会把它和 client id 分开），否则退回 client id。
      const known = this._findWebPlayer()?.player_id || "";
      try {
        await this._hass.connection.sendMessagePromise({
          type: "ha_music_studio/web_player_expose",
          client_id: known || clientId,
        });
        this._webExposeError = "";
        return;
      } catch (error) {
        this._webExposeError = `expose: ${error?.message || String(error)}`.slice(0, 120);
        if (attempt === 3) {
          console.warn("HA Music: web player expose failed", error);
        }
      }
    }
  }

  async _retryWebRegistration() {
    this._clearWebRegisterRetry();
    this._webExposeError = "";
    this.requestUpdate();
    try {
      await this._registerWebPlayerPairing();
    } catch (error) {
      console.warn("HA Music: web player re-pair failed", error);
    }
    await this._exposeWebPlayer().catch(() => {});
    await this._waitForWebPlayer(new Set(), { auto: true }).catch(() => {});
    this.requestUpdate();
  }

  async _waitForWebPlayer(beforeIds = new Set(), options = {}) {
    const auto = Boolean(options?.auto);
    for (let attempt = 0; attempt < 40; attempt += 1) {
      await this._loadPlayers();
      const player = this._findWebPlayer(beforeIds);
      if (player) {
        this._webPlayerId = player.player_id;
        this._webExposeError = "";
        this._clearWebRegisterRetry();
        const entityId = this._entityForMaPlayer(player);
        if (entityId) {
          this._webEntity = entityId;
          this._localWebEntity = entityId;
          if (auto) {
            // 自动连接只负责把播放器准备好，不抢当前播放器；本机 Web 播放器
            // 这一行常驻在列表里，页面一打开就能看到并直接点播。
            await this._syncLocalWebEntity(entityId);
            this.requestUpdate();
            return;
          }
          await this._syncLocalWebEntity(entityId);
          if (entityId !== this._activeEntity) {
            this._webReturnEntity = this._activeEntity;
            this._switchEntity(entityId, true);
          }
          this.requestUpdate();
          this._closePlayers();
          return;
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    this._webPlayerId = this._webPlayerId || this._findWebPlayer()?.player_id || "";
    if (!this._webEntity && this._webPlayer?.connected && !this._webRetryTimer) {
      // 会话已连上但一直拿不到实体：再配对/曝光一轮。Web 播放器是会话级的，
      // App WebView 里首次注册可能被后台挂起或配置保存打断，静默失败后不会自己恢复。
      this._scheduleWebRegisterRetry();
    }
    if (!auto && !this._webEntity) {
      this._notify(translator(this._hass?.language)("webPlayerWaitEntity"));
    }
    this.requestUpdate();
  }

  _scheduleWebRegisterRetry() {
    if (this._webRetryTimer) return;
    if (this._webRegisterRound >= 2) return;
    this._webRetryTimer = setTimeout(async () => {
      this._webRetryTimer = null;
      if (!this._webPlayer?.connected || this._webEntity) return;
      this._webRegisterRound += 1;
      this._webExposeError = "";
      try {
        await this._registerWebPlayerPairing();
      } catch (error) {
        console.warn("HA Music: web player re-pair failed", error);
      }
      await this._exposeWebPlayer().catch(() => {});
      if (this._webPlayer?.connected && !this._webEntity) {
        await this._waitForWebPlayer(new Set(), {
          auto: !this._playersOpen,
          round: this._webRegisterRound,
        }).catch(() => {});
      }
    }, 6000);
  }

  _clearWebRegisterRetry() {
    if (this._webRetryTimer) clearTimeout(this._webRetryTimer);
    this._webRetryTimer = null;
    this._webRegisterRound = 0;
  }

  _pinLocalWebEntityFromStates() {
    if (this._localWebEntity) return;
    const name = String(this._webName || "").trim();
    if (!name) return;
    for (const [entityId, state] of Object.entries(this._hass?.states || {})) {
      if (!entityId.startsWith("media_player.")) continue;
      if (String(state?.attributes?.friendly_name || "").trim() !== name) continue;
      this._localWebEntity = entityId;
      this.requestUpdate();
      return;
    }
  }

  _webEntityInUse(entityId) {
    if (!entityId) return false;
    const state = this._hass?.states?.[entityId];
    if (!state) return false;
    if (state.state === "playing" || state.state === "paused" || state.state === "on") return true;
    return Date.now() < (this._webEntityHoldUntil || 0);
  }

  async _playOnWebPlayer() {
    const player = this._findWebPlayer();
    if (!player) {
      this._notify(translator(this._hass?.language)("webPlayerWaitEntity"));
      return;
    }
    const entityId = this._entityForMaPlayer(player);
    if (!entityId) {
      this._notify(translator(this._hass?.language)("deviceUnavailable"));
      return;
    }
    // 转移队列到 Web 后实体短暂 idle，不能在这段时间把 Web 胶囊移出配置，
    // 否则 Lovelace 重渲染会打断刚建立的 Web 播放连接。
    this._webEntityHoldUntil = Date.now() + 20000;
    // 这个点击是用户手势：先把 AudioContext 建起来/恢复，再发播放命令。
    // 否则 MA 会把实体状态改成 playing，但浏览器音频上下文仍是 suspended，
    // 进度条会停在原处没有声音。
    try {
      await this._webPlayer?.unlock?.();
    } catch {
      // 忽略：后续播放命令仍会尝试，失败由卡片状态兜底。
    }
    const activeEntity = this._activeEntity;
    const activeState = this._state(activeEntity);
    const activeAttrs = activeState?.attributes || {};
    const webState = this._state(entityId);
    const webAttrs = webState?.attributes || {};
    const contentId = String(
      activeAttrs.media_content_id || webAttrs.media_content_id || "",
    );
    const alreadyHere = entityId === activeEntity && webState?.state === "playing";
    let started = alreadyHere;
    // Web 已经是当前播放器但处于暂停：这个点击就是恢复播放。
    if (!started && entityId === activeEntity && webState?.state === "paused") {
      try {
        await this._call("media_play", {}, "media_player", entityId);
        started = true;
      } catch (error) {
        this._notify(error?.message || String(error));
      }
    }
    // 直接给 Web 播放器建队列并播放。transfer_queue 会让 Web 实体短暂
    // unavailable，且队列挂载窗口不稳定，容易闪一下又回 idle。
    if (!started && contentId) {
      try {
        await this._call(
          "play_media",
          { media_id: contentId, media_type: "track", enqueue: "replace" },
          "music_assistant",
          entityId,
        );
        await new Promise((resolve) => setTimeout(resolve, 1500));
        started = ["playing", "paused", "buffering"].includes(
          this._state(entityId)?.state,
        );
      } catch (error) {
        this._notify(error?.message || String(error));
      }
    }
    if (!started) {
      started = await this._resumePlay(entityId);
    }
    if (!started) return;
    // 播放已确认，过渡保护结束：之后暂停/停止应立即按真实状态显隐胶囊。
    this._webEntityHoldUntil = 0;
    this._webPlayerId = player.player_id;
    this._webEntity = entityId;
    this._localWebEntity = entityId;
    // 用户点“在本机播放”时也确保 Web 实体已在卡片列表里。
    this._syncLocalWebEntity(entityId);
    if (entityId !== activeEntity) {
      this._webReturnEntity = activeEntity;
      this._switchEntity(entityId, true);
    }
    this._closePlayers();
  }

  _disconnectWebPlayer(silent = false) {
    this._clearWebRegisterRetry();
    this._webExposeError = "";
    const webEntity = this._webEntity || this._localWebEntity;
    this._webPlayer?.disconnect();
    this._webPlayer = null;
    this._webPlayerId = "";
    this._webEntity = "";
    this._webPlayerState = null;
    this._localWebEntity = "";
    this._webAutoStarted = false;
    this._webAutoFailed = false;
    // 主动断开时立即把本机 Web 实体移出卡片，不等状态轮询。
    if (webEntity) this._syncLocalWebEntity("", webEntity);
    if (webEntity && this._activeEntity === webEntity && this._webReturnEntity) {
      this._switchEntity(this._webReturnEntity, true);
      this._webReturnEntity = "";
    }
    if (!silent) this.requestUpdate();
  }

  _renderWebPlayerRow(t) {
    const connected = Boolean(this._webPlayer?.connected);
    const current = Boolean(this._webEntity && this._activeEntity === this._webEntity);
    const canPlay = connected && Boolean(this._entityForMaPlayer(this._findWebPlayer()));
    return html`<div class="hm-player-row hm-web-player-row" data-current=${current ? "true" : "false"}>
      <div class="hm-player-main">
        <span class="hm-web-icon">${icon("speaker", 16)}</span>
        <div class="hm-player-text">
          <span class="hm-player-name">
            ${this._webName}
            <span class="hm-web-badge">${t("webPlayer")}</span>
          </span>
          <span class="hm-player-sub">
            ${connected
              ? canPlay
                ? t("webPlayerConnected")
                : this._webExposeError
                  ? t("webPlayerExposeFailed")
                  : t("webPlayerWaitEntity")
              : this._webAutoFailed
                ? t("webPlayerAutoFailed")
                : t("webPlayerConnecting")}
          </span>
        </div>
      </div>
      <div class="hm-player-actions">
        ${connected
          ? html`${canPlay
                ? html`<button
                    class="hm-player-btn"
                    data-on=${current ? "true" : "false"}
                    @click=${() => this._playOnWebPlayer()}
                  >
                    ${t("webPlayerPlayHere")}
                  </button>`
                : html`<button
                    class="hm-player-btn"
                    @click=${() => this._retryWebRegistration()}
                  >
                    ${t("webPlayerRetry")}
                  </button>`}
              <button
                class="hm-player-btn"
                data-role="web-disconnect"
                @click=${() => this._disconnectWebPlayer()}
              >
                ${t("webPlayerDisconnect")}
              </button>`
          : this._webAutoFailed
            ? html`<button
                class="hm-player-btn"
                data-role="web-connect"
                data-disabled=${this._webBusy ? "true" : "false"}
                ?disabled=${this._webBusy}
                @click=${() => this._connectWebPlayer({ auto: true })}
              >
                ${t("webPlayerRetry")}
              </button>`
            : nothing}
      </div>
    </div>`;
  }

  async _loadPlayers() {
    if (!this._hass?.connection) return;
    try {
      const response = await this._hass.connection.sendMessagePromise({
        type: "ha_music_studio/player_group",
        action: "players",
      });
      this._maPlayers = Array.isArray(response?.players) ? response.players : [];
    } catch (error) {
      this._notify(error?.message || String(error));
      this._maPlayers = [];
    }
    this.requestUpdate();
    this._queueLocalWebEntitySync(300);
  }

  _queueLocalWebEntitySync(delay = 500) {
    if (this._localWebSyncTimer) return;
    this._localWebSyncTimer = setTimeout(() => {
      this._localWebSyncTimer = null;
      this._syncLocalWebEntity();
    }, delay);
  }

  async _alignLocalWebEntityName(entityId) {
    // Music Assistant renames the player (Web iOS iPhone 13 Pro Max), but the HA
    // device created for it keeps the old name, so the entity's friendly_name -
    // and therefore the chip and every dashboard - stays "Web (Browser on iOS)".
    // Fix both: rename the device (name_by_user) and drop any entity-level name
    // override, so the entity simply follows the device name.
    if (!this._hass?.callWS || !this._webName || !this._webPlayerId) return;
    if (this._webEntityNamed === this._webName) return;
    const entity = entityId || this._webEntity || this._currentLocalWebEntity();
    try {
      const devices = await this._hass.callWS({ type: "config/device_registry/list" });
      const device = (Array.isArray(devices) ? devices : []).find((entry) =>
        (entry?.identifiers || []).some(
          (ident) =>
            Array.isArray(ident) &&
            ident[0] === "music_assistant" &&
            ident[1] === this._webPlayerId
        )
      );
      if (!device) return;
      if (String(device.name_by_user || "") !== this._webName) {
        await this._hass.callWS({
          type: "config/device_registry/update",
          device_id: device.id,
          name_by_user: this._webName,
        });
      }
      if (entity) {
        const entry = await this._hass.callWS({
          type: "config/entity_registry/get",
          entity_id: entity,
        });
        if (String(entry?.unique_id || "") === this._webPlayerId && entry?.name) {
          await this._hass.callWS({
            type: "config/entity_registry/update",
            entity_id: entity,
            name: null,
          });
        }
      }
      this._webEntityNamed = this._webName;
    } catch (error) {
      // Non-admin sessions cannot edit the registry; the name still shows in MA.
    }
  }

  _isLocalWebEntity(entityId) {
    if (!entityId) return false;
    if (entityId === this._localWebEntity || entityId === this._webEntity) return true;
    const state = this._hass?.states?.[entityId];
    if (!state) return false;
    const friendly = String(state.attributes?.friendly_name || "").trim();
    return Boolean(this._webName) && friendly === this._webName;
  }

  _localWebStateAvailable(entityId) {
    const state = this._hass?.states?.[entityId];
    return Boolean(state) && state.state !== "unavailable" && state.state !== "unknown";
  }

  _currentLocalWebEntity() {
    if (this._webEntity && this._localWebStateAvailable(this._webEntity)) {
      return this._webEntity;
    }
    const player = this._findWebPlayer();
    if (player && player.available !== false) {
      const entityId = this._entityForMaPlayer(player);
      if (this._localWebStateAvailable(entityId)) {
        return entityId;
      }
    }
    const name = String(this._webName || "").trim();
    if (!name) return "";
    for (const [entityId, state] of Object.entries(this._hass?.states || {})) {
      if (!entityId.startsWith("media_player.")) continue;
      if (state.state === "unavailable" || state.state === "unknown") continue;
      if (!this._webEntityInUse(entityId)) continue;
      if (String(state.attributes?.friendly_name || "").trim() === name) return entityId;
    }
    return "";
  }

  async _syncLocalWebEntity(preferredTarget = "", removeEntity = "") {
    if (this._localWebSyncBusy) {
      // 正在保存时把最新意图排队，保存结束后再执行，避免连接/断开瞬间的
      // 自动加入被前一次同步吞掉。
      this._webSyncPending = { target: preferredTarget, remove: removeEntity };
      return;
    }
    if (!this._hass?.callWS || this._isPreviewContext()) return;
    const current = this._entities();
    if (!current.length) return;
    const target = removeEntity ? "" : preferredTarget || this._currentLocalWebEntity();
    if (target) this._localWebEntity = target;
    if (target) this._alignLocalWebEntityName(target);
    const webIds = current.filter((id) => this._isLocalWebEntity(id));
    let next = null;
    if (target) {
      // 连接成功后直接把本机 Web 实体追加到卡片，不等 HA 状态刷新。
      const extras = webIds.filter((id) => id !== target);
      if (!current.includes(target) || extras.length) {
        next = current.filter((id) => id !== target && !extras.includes(id));
        next.push(target);
      }
    } else if (removeEntity) {
      // 只有用户主动断开时才移出；连接期间短暂 unavailable、停止或闲置
      // 都保留列表里的本机 Web 播放器行。
      next = current.filter((id) => id !== removeEntity);
      if (!next.length) return;
    }
    if (!next || !next.length) return;
    if (next.length === current.length && next.every((id, index) => id === current[index])) return;
    const key = next.join("|");
    if (key === this._localWebSyncKey && Date.now() - this._localWebSyncAt < 8000) return;
    this._localWebSyncBusy = true;
    const previous = { ...(this._config || {}) };
    // 先乐观更新 UI，Lovelace 保存失败时再回滚，避免要刷新页面才看到 Web 胶囊。
    this._config =
      next.length > 1
        ? { ...previous, entities: next, entity: undefined }
        : { ...previous, entity: next[0], entities: undefined };
    this.requestUpdate();
    // Web 胶囊只做本卡片的内存态，不写回 Lovelace 配置。保存配置会触发
    // 仪表盘重新渲染，进而断开刚建立的 Web 播放连接，表现为播放几秒后中断。
    this._localWebSyncKey = key;
    this._localWebSyncAt = Date.now();
    if (!target) this._localWebEntity = "";
    this._localWebSyncBusy = false;
    const pending = this._webSyncPending;
    this._webSyncPending = null;
    if (pending) this._syncLocalWebEntity(pending.target, pending.remove);
  }

  _playersForPanel() {
    const leaderId = this._currentMaPlayer()?.player_id || "";
    return [...this._maPlayers]
      .filter((player) => {
        // Web 播放器由抽屉顶部的本机播放器行单独承载，避免同一台浏览器出现两行。
        const isWeb = String(player?.name || "").startsWith("Web ");
        const isCurrentWeb =
          (player?.player_id && player.player_id === this._webPlayerId) ||
          (isWeb && player?.name === this._webName);
        return !isWeb || (player.available && !isCurrentWeb);
      })
      .sort((a, b) => {
      const la = a.player_id === leaderId ? 1 : 0;
      const lb = b.player_id === leaderId ? 1 : 0;
      if (la !== lb) return lb - la;
      const aa = a.available ? 1 : 0;
      const ab = b.available ? 1 : 0;
      return ab - aa;
    });
  }

  _currentMaPlayer() {
    const queueId = this._studioQueue();
    const direct =
      this._maPlayers.find(
        (player) => player.active_source === queueId || player.active_queue === queueId
      ) ||
      this._maPlayers.find(
        (player) => player.player_id === this._state()?.attributes?.ma_player_id
      ) ||
      null;
    if (!direct) return null;
    // 成员机通过 synced_to / active_group 指向组 leader，分组操作必须落在 leader 上。
    const groupId = direct.active_group || direct.synced_to;
    if (groupId) {
      const leader = this._maPlayers.find((player) => player.player_id === groupId);
      if (leader) return leader;
    }
    return direct;
  }

  _entityForMaPlayer(player) {
    const states = this._hass?.states || {};
    const queueId = player?.active_source || player?.active_queue || "";
    for (const [entityId, state] of Object.entries(states)) {
      if (!entityId.startsWith("media_player.")) continue;
      if (queueId && state?.attributes?.active_queue === queueId) return entityId;
    }
    const name = String(player?.name || "").toLowerCase();
    if (!name) return "";
    for (const [entityId, state] of Object.entries(states)) {
      if (!entityId.startsWith("media_player.")) continue;
      if (friendlyName(this._hass, entityId, entityId).toLowerCase() === name) {
        return entityId;
      }
    }
    return "";
  }

  _selectMaPlayer(player) {
    const entityId = this._entityForMaPlayer(player);
    if (!entityId) {
      this._notify(translator(this._hass?.language)("deviceUnavailable"));
      return;
    }
    this._switchEntity(entityId, true);
    this._closePlayers();
  }

  _cardsInView(config) {
    const views = Array.isArray(config?.views) ? config.views : [];
    const parts = String(window.location.pathname || "")
      .split("/")
      .filter(Boolean);
    const viewPath = parts[parts.length - 1] || "";
    let viewIndex = views.findIndex(
      (view) => view && (view.url_path === viewPath || view.path === viewPath)
    );
    if (viewIndex < 0 && /^\d+$/.test(viewPath)) {
      const numeric = Number(viewPath);
      if (numeric >= 0 && numeric < views.length) viewIndex = numeric;
    }
    if (viewIndex < 0) throw new Error(translator(this._hass?.language)("cardConfigMissing"));
    return { config, viewIndex };
  }

  _dashboardUrlPath() {
    const parts = String(window.location.pathname || "")
      .split("/")
      .filter(Boolean);
    const section = parts[0] || "";
    return section === "lovelace" ? null : section || null;
  }

  async _saveCardEntities(next) {
    const language = this._hass?.language;
    const t = translator(language);
    const urlPath = this._dashboardUrlPath();
    const response = await this._hass.callWS({
      type: "lovelace/config",
      url_path: urlPath,
    });
    const locationInfo = this._cardsInView(response);
    const view = locationInfo.config.views[locationInfo.viewIndex];
    const cards = Array.isArray(view?.cards) ? view.cards : [];
    const current = this._entities();
    const signature = (card) => {
      const list =
        Array.isArray(card?.entities) && card.entities.length
          ? card.entities.filter(Boolean)
          : card?.entity
            ? [card.entity]
            : [];
      return list.join("|");
    };
    let cardIndex = cards.findIndex(
      (card) => card?.type === "custom:ha-music" && signature(card) === current.join("|")
    );
    if (cardIndex < 0) {
      const candidates = cards
        .map((card, index) => ({ card, index }))
        .filter((entry) => entry.card?.type === "custom:ha-music");
      if (candidates.length === 1) cardIndex = candidates[0].index;
    }
    if (cardIndex < 0) throw new Error(t("cardConfigMissing"));
    const previous = { ...view.cards[cardIndex] };
    const replacement = { ...previous };
    if (next.length > 1) {
      replacement.entities = next;
      delete replacement.entity;
    } else {
      replacement.entity = next[0];
      delete replacement.entities;
    }
    view.cards[cardIndex] = replacement;
    await this._hass.callWS({
      type: "lovelace/config/save",
      url_path: urlPath,
      config: locationInfo.config,
    });
    this._config = replacement;
    if (!next.includes(this._activeEntity)) this._activeEntity = next[0];
    this.requestUpdate();
  }

  async _toggleCardEntity(player) {
    if (this._cardBusy) return;
    const language = this._hass?.language;
    const t = translator(language);
    const entityId = this._entityForMaPlayer(player);
    if (!entityId) {
      this._notify(t("deviceUnavailable"));
      return;
    }
    const entities = this._entities();
    const inCard = entities.includes(entityId);
    if (inCard && entities.length <= 1) {
      this._notify(t("cardNeedsPlayer"));
      return;
    }
    if (!inCard && !player.available) {
      this._notify(t("deviceUnavailable"));
      return;
    }
    const next = inCard
      ? entities.filter((id) => id !== entityId)
      : [...entities, entityId];
    this._cardBusy = true;
    this.requestUpdate();
    try {
      await this._saveCardEntities(next);
    } catch (error) {
      this._notify(error?.message || String(error));
    } finally {
      this._cardBusy = false;
      this.requestUpdate();
    }
  }

  async _toggleMaGroup(player) {
    if (this._playersBusy) return;
    const current = this._currentMaPlayer();
    if (!current) {
      this._notify(translator(this._hass?.language)("groupLeaderMissing"));
      return;
    }
    if (player.player_id === current.player_id) return;
    const member = (current.group_members || []).includes(player.player_id);
    const nextMembers = member
      ? (current.group_members || []).filter((id) => id !== player.player_id)
      : [...(current.group_members || []), player.player_id];
    this._maPlayers = this._maPlayers.map((entry) =>
      entry.player_id === current.player_id ? { ...entry, group_members: nextMembers } : entry
    );
    this._playersBusy = true;
    this.requestUpdate();
    try {
      await this._hass.connection.sendMessagePromise({
        type: "ha_music_studio/player_group",
        action: "set_members",
        target_player: current.player_id,
        add: member ? [] : [player.player_id],
        remove: member ? [player.player_id] : [],
      });
      // Music Assistant 的 group_members 会稍后才广播，轮询到实际成员状态再停止，避免旧快照覆盖乐观值。
      const expected = !member;
      for (let attempt = 0; attempt < 6; attempt += 1) {
        await new Promise((resolve) => setTimeout(resolve, 450));
        await this._loadPlayers();
        const leader = this._maPlayers.find((entry) => entry.player_id === current.player_id);
        if (Boolean((leader?.group_members || []).includes(player.player_id)) === expected) break;
      }
    } catch (error) {
      this._notify(error?.message || String(error));
      await this._loadPlayers();
    } finally {
      this._playersBusy = false;
      this.requestUpdate();
    }
  }

  _studioReady() {
    return Boolean(this._isMaPlayer() && this._hass?.services?.ha_music_studio);
  }

  _studioQueue() {
    return (
      this._queueQueueId ||
      this._state()?.attributes?.active_queue ||
      this._state()?.attributes?.queue_id ||
      ""
    );
  }

  _syncStudioQueue() {
    if (!this._studioReady() || this._thumbMode()) return;
    const queueId = this._studioQueue();
    if (!queueId) return;
    const media = this._readMedia();
    const key = [
      queueId,
      this._state()?.attributes?.media_content_id || "",
      media.title,
      media.duration,
    ].join("|");
    if (key === this._studioQueueKey) return;
    this._studioQueueKey = key;
    this._queueQueueId = queueId;
    this._loadStudioQueue(queueId, key).catch(() => {});
  }

  async _loadStudioQueue(queueId, key) {
    if (!this._studioReady()) return;
    const response = await this._queueCommand("snapshot");
    const queue = response?.result?.queue || response?.queue;
    if (!queue || this._studioQueueKey !== key) return;
    const active = (queue.items || []).find((item) => item.active);
    this._studioFavorite = active ? Boolean(active.favorite) : null;
    this._studioAutoplay = Boolean(queue.autoplay_enabled);
    this._studioCrossfade = Boolean(queue.crossfade_enabled);
    this._queueSnapshot = queue;
    this.requestUpdate();
    this._loadWaveform(queueId, key).catch(() => {});
  }

  async _loadWaveform(queueId, key) {
    if (this._waveformKey === key) return;
    this._waveformKey = key;
    try {
      const response = await this._queueCommand("waveform", { queue_id: queueId });
      const bins = response?.result?.bins;
      if (this._studioQueueKey !== key) return;
      this._waveform = Array.isArray(bins) && bins.length ? bins : null;
    } catch (error) {
      this._waveform = null;
    }
    this.requestUpdate();
  }

  _waveBars(count = 96) {
    const bins = this._waveform;
    if (!Array.isArray(bins) || !bins.length) return [];
    const width = Math.min(count, bins.length);
    const step = bins.length / width;
    const bars = [];
    for (let i = 0; i < width; i++) {
      const start = Math.floor(i * step);
      const end = Math.max(start + 1, Math.floor((i + 1) * step));
      let peak = 0;
      for (let j = start; j < end && j < bins.length; j++) {
        peak = Math.max(peak, Number(bins[j]) || 0);
      }
      bars.push(clamp(peak, 0, 1));
    }
    return bars;
  }

  async _toggleStudioFavorite() {
    if (!this._studioReady() || this._studioBusy) return;
    const attrs = this._state()?.attributes || {};
    const uri = String(attrs.media_content_id || "");
    if (!uri) {
      this._notify(translator(this._hass?.language)("favoriteUnavailable"));
      return;
    }
    const next = !this._studioFavorite;
    this._studioBusy = true;
    this._studioFavorite = next;
    this.requestUpdate();
    try {
      await this._queueCommand("favorite", { item_uri: uri, favorite: next });
    } catch (error) {
      this._studioFavorite = !next;
      this._notify(error?.message || String(error));
    } finally {
      this._studioBusy = false;
      this.requestUpdate();
    }
  }

  async _toggleStudioAutoplay() {
    if (!this._studioReady() || this._studioBusy) return;
    const next = !this._studioAutoplay;
    this._studioBusy = true;
    this._studioAutoplay = next;
    this.requestUpdate();
    try {
      await this._queueCommand("autoplay", { autoplay: next });
    } catch (error) {
      this._studioAutoplay = !next;
      this._notify(error?.message || String(error));
    } finally {
      this._studioBusy = false;
      this.requestUpdate();
    }
  }

  async _toggleStudioCrossfade() {
    if (!this._studioReady() || this._studioBusy) return;
    const next = !this._studioCrossfade;
    this._studioBusy = true;
    this._studioCrossfade = next;
    this.requestUpdate();
    try {
      await this._queueCommand("crossfade", { crossfade: next });
    } catch (error) {
      this._studioCrossfade = !next;
      this._notify(error?.message || String(error));
    } finally {
      this._studioBusy = false;
      this.requestUpdate();
    }
  }

  _onWaveformClick(event) {
    if (!this._canSeekNow()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = clamp((event.clientX - rect.left) / Math.max(rect.width, 1), 0, 1);
    const media = this._readMedia();
    if (!media.duration) return;
    this._seekTo(media.duration * ratio);
  }

  _canSeekNow() {
    return hasFeature(this._state(), FEATURES.SEEK);
  }

  async _queueCommand(action, extra = {}) {
    const connection = this._hass?.connection;
    if (!connection?.sendMessagePromise) {
      throw new Error("Home Assistant WebSocket unavailable");
    }
    const queueId =
      this._queueQueueId || this._state()?.attributes?.active_queue || "";
    return connection.sendMessagePromise({
      type: "ha_music_studio/queue_command",
      action,
      entity_id: this._eid(),
      queue_id: queueId,
      ...extra,
    });
  }

  async _playQueueItem(item) {
    if (!item?.queueItemId) {
      this._notify(translator(this._hass?.language)("queueEmpty"));
      return;
    }
    try {
      await this._queueCommand("play_item", { item_id: item.queueItemId });
      this._drawer = {
        ...this._drawer,
        items: (this._drawer?.items || []).map((entry) => ({
          ...entry,
          active: entry.queueItemId === item.queueItemId,
        })),
      };
      this.requestUpdate();
    } catch (error) {
      this._notify(error?.message || String(error));
      this._loadQueue(++this._queueLoadToken).catch(() => {});
    }
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

  _onChipClick(entityId) {
    // 长按拖动结束后浏览器仍会补发一次 click，这里直接吞掉，避免误切换播放器。
    if (Date.now() - this._chipDragEndAt < 600) return;
    this._switchEntity(entityId, true);
  }

  _onChipContextMenu(event) {
    if (this._chipDrag) event.preventDefault();
  }

  _onChipPointerDown(event, entityId) {
    if (this._chipDrag || this._cardBusy) return;
    if (event.button !== undefined && event.button !== 0) return;
    if (event.isPrimary === false) return;
    this._cancelChipPress();
    this._chipPress = {
      chip: event.currentTarget,
      entityId,
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
    this._chipPressTimer = setTimeout(() => {
      this._chipPressTimer = null;
      this._beginChipDrag();
    }, CHIP_LONG_PRESS_MS);
  }

  _cancelChipPress() {
    if (this._chipPressTimer) clearTimeout(this._chipPressTimer);
    this._chipPressTimer = null;
    this._chipPress = null;
  }

  _beginChipDrag() {
    const press = this._chipPress;
    this._chipPress = null;
    if (!press?.chip?.isConnected) return;
    const strip = this.renderRoot?.querySelector?.(".hm-entities");
    if (!strip) return;
    const chips = Array.from(strip.querySelectorAll(".hm-entity-chip"));
    const index = chips.indexOf(press.chip);
    if (index < 0) return;
    this._chipDrag = {
      chip: press.chip,
      entityId: press.entityId,
      pointerId: press.pointerId,
      startX: press.x,
      startY: press.y,
      lastX: press.x,
      index,
      translate: 0,
      startLeft: press.chip.getBoundingClientRect().left,
      order: this._entities(),
    };
    this._chipDragEndAt = 0;
    press.chip.dataset.drag = "true";
    strip.classList.add("hm-dragging");
    this.renderRoot.querySelector(".hm-entities-wrap")?.classList.add("hm-dragging");
    try {
      press.chip.setPointerCapture(press.pointerId);
    } catch {
      /* 个别浏览器不支持捕获，拖动仍由容器上的 pointermove 兜底 */
    }
    this._vibrate(12);
  }

  _vibrate(ms) {
    if (typeof navigator === "undefined") return;
    try {
      navigator.vibrate?.(ms);
    } catch {
      /* 触感反馈失败不影响拖动 */
    }
  }

  _onChipPointerMove(event) {
    const drag = this._chipDrag;
    if (!drag) {
      const press = this._chipPress;
      if (!press || event.pointerId !== press.pointerId) return;
      // 先划走视为滚动列表，取消长按，保留原生横向滚动。
      if (
        Math.abs(event.clientX - press.x) > 8 ||
        Math.abs(event.clientY - press.y) > 8
      ) {
        this._cancelChipPress();
      }
      return;
    }
    if (event.pointerId !== drag.pointerId) return;
    event.preventDefault?.();
    drag.lastX = event.clientX;
    const strip = drag.chip.parentElement;
    if (strip) {
      // 拖到列表两端时自动滚动，让屏幕外的播放器也能拖进来。
      const rect = strip.getBoundingClientRect();
      if (event.clientX < rect.left + 28) strip.scrollLeft -= 12;
      else if (event.clientX > rect.right - 28) strip.scrollLeft += 12;
    }
    this._applyChipDragTransform();
    const others = Array.from(
      strip?.querySelectorAll?.(".hm-entity-chip") || []
    ).filter((el) => el !== drag.chip);
    const target = dropIndexFromRects(
      others.map((el) => {
        const rect = el.getBoundingClientRect();
        return { left: rect.left, width: rect.width };
      }),
      event.clientX
    );
    if (target !== drag.index) this._reorderChipDrag(drag, target);
  }

  _applyChipDragTransform() {
    const drag = this._chipDrag;
    if (!drag) return;
    const chip = drag.chip;
    // 布局变化（DOM 重排、自动滚动）后会改变 offset，这里始终以“视觉位置不变”为基准重算位移。
    const layoutLeft = chip.getBoundingClientRect().left - drag.translate;
    const desired = drag.startLeft + (drag.lastX - drag.startX);
    const next = Math.round(desired - layoutLeft);
    drag.translate = next;
    chip.style.transition = "transform 0s";
    chip.style.transform = `translateX(${next}px)`;
  }

  _reorderChipDrag(drag, target) {
    const strip = drag.chip.parentElement;
    if (!strip) return;
    const chips = Array.from(strip.querySelectorAll(".hm-entity-chip"));
    const before = new Map(
      chips.map((el) => [el, el.getBoundingClientRect().left])
    );
    // 不改 DOM 顺序，只用 flex order 做实时预览：Lit 仍按配置顺序持有节点，
    // 松手写回配置后再由 Lit 自己重排，避免手动 insertBefore 打乱它的节点账本。
    const rest = drag.order.filter((id) => id !== drag.entityId);
    const preview = [...rest.slice(0, target), drag.entityId, ...rest.slice(target)];
    drag.index = target;
    drag.preview = preview;
    for (const el of chips) {
      const index = preview.indexOf(el.dataset.entityId);
      if (index >= 0) el.style.order = String(index);
    }
    // FLIP：其余胶囊先回到旧位置，再在 0.18s 内滑回新槽位，形成磁吸感。
    const moved = chips.filter((el) => el !== drag.chip);
    for (const el of moved) {
      const old = before.get(el);
      if (old == null) continue;
      const delta = old - el.getBoundingClientRect().left;
      if (Math.abs(delta) < 0.5) continue;
      el.style.transition = "transform 0s";
      el.style.transform = `translateX(${Math.round(delta)}px)`;
    }
    for (const el of moved) {
      const old = before.get(el);
      if (old == null || !el.style.transform) continue;
      void el.getBoundingClientRect();
      el.style.transition = "";
      el.style.transform = "";
    }
    this._applyChipDragTransform();
  }

  _onChipPointerUp(event) {
    if (this._chipDrag) {
      if (event.pointerId !== this._chipDrag.pointerId) return;
      this._endChipDrag();
      return;
    }
    if (this._chipPress && event.pointerId === this._chipPress.pointerId) {
      this._cancelChipPress();
    }
  }

  _onChipPointerLeave() {
    // 还没进入拖动就离开列表，说明用户只是划过，取消长按避免误触发。
    if (!this._chipDrag) this._cancelChipPress();
  }

  _endChipDrag() {
    const drag = this._chipDrag;
    if (!drag) return;
    this._chipDrag = null;
    this._chipDragEndAt = Date.now();
    const chip = drag.chip;
    const strip = chip.parentElement;
    strip?.classList.remove("hm-dragging");
    this.renderRoot?.querySelector?.(".hm-entities-wrap")?.classList.remove("hm-dragging");
    delete chip.dataset.drag;
    // 松手后磁吸回位：胶囊带着 0.26s 的缓动滑入当前槽位。
    chip.style.transition = "transform 0.26s cubic-bezier(0.22, 1, 0.36, 1)";
    chip.style.transform = "";
    setTimeout(() => {
      chip.style.transition = "";
      chip.style.transform = "";
    }, 340);
    try {
      chip.releasePointerCapture(drag.pointerId);
    } catch {
      /* 已释放时忽略 */
    }
    this._vibrate(8);
    const ordered =
      drag.preview && drag.preview.length === drag.order.length
        ? drag.preview
        : drag.order;
    if (!ordered.length) return;
    if (ordered.every((id, index) => id === drag.order[index])) {
      // 没换位置：把预览用的 order 样式恢复成自然顺序。
      for (const el of Array.from(strip?.querySelectorAll?.(".hm-entity-chip") || [])) {
        el.style.order = "";
      }
      return;
    }
    // 预览顺序先留着，等配置写回成功、Lit 按新顺序渲染后再清理样式。
    this._chipOrderStyles = ordered;
    this._chipOrderCommitPending = true;
    this._commitEntityOrder(ordered);
  }

  async _commitEntityOrder(next) {
    if (this._cardBusy) return;
    this._cardBusy = true;
    try {
      await this._saveCardEntities(next);
    } catch (error) {
      this._notify(error?.message || String(error));
    } finally {
      this._cardBusy = false;
      this._chipOrderCommitPending = false;
      this.requestUpdate();
    }
  }

  _syncChipOrderStyles() {
    const target = this._chipOrderStyles;
    if (!target || this._chipDrag || this._chipOrderCommitPending) return;
    const strip = this.renderRoot?.querySelector?.(".hm-entities");
    const chips = Array.from(strip?.querySelectorAll?.(".hm-entity-chip") || []);
    if (!chips.length) {
      this._chipOrderStyles = null;
      return;
    }
    const ids = this._entities();
    const applied = ids.length === target.length && ids.every((id, index) => id === target[index]);
    for (const el of chips) {
      if (applied) {
        el.style.order = "";
        continue;
      }
      // 写回失败：回到配置里的原顺序，不让界面停在未保存的顺序上。
      const index = ids.indexOf(el.dataset.entityId);
      el.style.order = index >= 0 ? String(index) : "";
    }
    this._chipOrderStyles = null;
  }

  _scrollEntities(direction) {
    const strip = this.renderRoot?.querySelector?.(".hm-entities");
    if (!strip) return;
    const step = Math.max(96, Math.round(strip.clientWidth * 0.72));
    strip.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  _syncEntitiesNav() {
    const wrap = this.renderRoot?.querySelector?.(".hm-entities-wrap");
    const strip = wrap?.querySelector?.(".hm-entities");
    if (!wrap || !strip) return;
    const overflow = strip.scrollWidth - strip.clientWidth > 4;
    wrap.dataset.overflow = overflow ? "true" : "false";
    if (!overflow) return;
    const atStart = strip.scrollLeft <= 2;
    const atEnd = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 2;
    const prev = wrap.querySelector('[data-dir="prev"]');
    const next = wrap.querySelector('[data-dir="next"]');
    if (prev) prev.disabled = atStart;
    if (next) next.disabled = atEnd;
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
    this._resetCoverLayers();
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

  // MA 按钮恢复为歌单选择器：点击直接列出 MA 播放列表，选中即播放。
  // 完整队列/媒体库/搜索/设置仍可通过歌单抽屉里的 MA 入口进入。
  _onAssistantButton() {
    this._openPlaylists();
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
    const path = event.composedPath?.() || [];
    if (this._sfxOpen) {
      const insideSfx = path.some((node) => node?.classList?.contains?.("hm-sfx-menu"));
      const onSfxButton = path.some((node) => node?.dataset?.role === "sfx");
      if (!insideSfx && !onSfxButton) {
        this._sfxOpen = false;
        this.requestUpdate();
      }
    }
    if (this._themeOpen) {
      const insideTheme = path.some((node) => node?.classList?.contains?.("hm-theme-menu"));
      const onThemeButton = path.some((node) => node?.dataset?.role === "theme");
      if (!insideTheme && !onThemeButton) {
        this._themeOpen = false;
        this.requestUpdate();
      }
    }
    if (!this._menu) return;
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
    const payload = {
      type: "call_service",
      domain,
      service,
      service_data: data,
      return_response: true,
    };
    // 优先用底层 WS 连接（HA 各版本都保证存在），callWS 只作兜底；
    // 之前只走 callWS，一旦该上下文没有这个封装就会静默失败，规格永远出不来。
    if (hass?.connection?.sendMessagePromise) {
      try {
        const result = await hass.connection.sendMessagePromise(payload);
        if (result?.response !== undefined) return result.response;
      } catch (err) {
        this._callWsError = String(err?.message || err || "");
      }
    }
    if (hass?.callWS) {
      const result = await hass.callWS(payload);
      return result?.response ?? null;
    }
    // 第三条兜底：直接用前端会话的访问令牌走 REST（`?return_response` 与 WS 等价）
    const token = hass?.auth?.data?.access_token;
    if (token && typeof fetch === "function") {
      const res = await fetch(`/api/services/${domain}/${service}?return_response`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(data || {}),
      });
      if (!res.ok) throw new Error(`REST ${res.status}`);
      const json = await res.json();
      return json?.response ?? json ?? null;
    }
    throw new Error("Service response unavailable");
  }

  // Music Assistant 的队列快照里带 current_item.media_item.stream_details，
  // 本地库/主流音乐源会给出编码、采样率、位深、码率；流媒体源可能只有编码。
  async _loadAudioSpec(trackKey) {
    const hass = this._hass;
    const entityId = this._eid();
    if (!hass || !entityId) return;
    if (this._config?.show_spec === false) return;
    if (!this._isMaPlayer(entityId)) return;
    const key = trackKey || "";
    const sameTrack = Boolean(key) && key === this._audioSpecKey;
    // 同一首且规格（含比特完美判定）都拿到了就不再查；没拿到（首次请求失败/WS 还没就绪）
    // 要继续重试，否则卡片会一直停在「没有规格」或「缺标识」的状态，直到换歌才恢复。
    if (sameTrack && this._audioSpec && typeof this._audioSpec.bitPerfect === "boolean") {
      return;
    }
    const now = Date.now();
    if (now - this._audioSpecAt < (sameTrack ? 5000 : 1000)) return;
    this._audioSpecAt = now;
    try {
      // 优先走集成侧的快照：MA 的 audio_processing（含 bit_perfect）只在
      // MA 客户端模型里有，核心 music_assistant/get_queue 服务会把它剥掉。
      let snapAudio = null;
      try {
        const snap = await this._queueCommand("snapshot");
        const snapQueue = snap?.result?.queue || snap?.queue || null;
        snapAudio = snapQueue?.current_audio || null;
      } catch {
        snapAudio = null;
      }
      if (
        snapAudio &&
        (snapAudio.codec || snapAudio.sample_rate || snapAudio.bit_depth)
      ) {
        const snapVerdict = snapAudio.bit_perfect;
        this._audioSpec = {
          codec: String(snapAudio.codec || ""),
          sampleRate: Number(snapAudio.sample_rate) || 0,
          bitDepth: Number(snapAudio.bit_depth) || 0,
          bitRate: Number(snapAudio.bit_rate) || 0,
          channels: Number(snapAudio.channels) || 0,
          // null 表示 MA 还没算完 processing chain，不能当成 false，否则不再重试
          bitPerfect:
            snapVerdict === true ? true : snapVerdict === false ? false : null,
        };
        this._audioSpecKey = key;
        this.requestUpdate();
        return;
      }
      const response = await this._serviceResponse("music_assistant", "get_queue", {
        entity_id: entityId,
      });
      const queue = this._pickQueueResponse(response);
      const current = queue?.current_item || null;
      // MA 的 stream_details 挂在 current_item 上（与 media_item 平级），
      // 早期误读成 current_item.media_item.stream_details，导致规格一直为空。
      const details =
        current?.stream_details || current?.media_item?.stream_details || null;
      const sampleRate = Number(details?.sample_rate) || 0;
      const bitDepth = Number(details?.bit_depth) || 0;
      const bitRate = Number(details?.bit_rate) || 0;
      const channels = Number(details?.channels) || 0;
      const codec = String(details?.content_type || "").trim();
      // MA 把每个输出的失真情况挂在 stream_details.audio_processing.outputs[].fidelity，
      // bit_perfect 为 true 表示该输出是源码样本直通（面板上标「比特完美」）。
      const outputs = details?.audio_processing?.outputs;
      const bitPerfect = Array.isArray(outputs)
        ? outputs.some((out) => out?.fidelity?.bit_perfect === true)
        : null;
      if (!codec && !sampleRate && !bitDepth && !bitRate) {
        this._audioSpec = null;
      } else {
        this._audioSpec = {
          codec,
          sampleRate,
          bitDepth,
          bitRate,
          channels,
          bitPerfect,
        };
        this._audioSpecKey = key;
      }
    } catch (err) {
      this._audioSpec = null;
      this._specError = String(err?.message || err || "");
    }
    this.requestUpdate();
  }

  _audioSpecText(compact = false) {
    const spec = this._audioSpec;
    if (!spec) return "";
    const parts = [];
    if (spec.codec) parts.push(this._codecLabel(spec.codec));
    if (compact) {
      if (spec.bitDepth && spec.sampleRate) {
        parts.push(`${spec.bitDepth}/${Math.round(spec.sampleRate / 1000)}k`);
      } else if (spec.sampleRate) {
        parts.push(`${Math.round(spec.sampleRate / 1000)}kHz`);
      }
    } else {
      if (spec.bitDepth) parts.push(`${spec.bitDepth}-bit`);
      if (spec.sampleRate) {
        const khz = spec.sampleRate / 1000;
        parts.push(`${Number.isInteger(khz) ? khz : khz.toFixed(1)} kHz`);
      }
      if (spec.channels === 2) parts.push("立体声");
      else if (spec.channels > 2) parts.push(`${spec.channels}ch`);
      // MA 的 bit_rate 单位是 kbps（如 320、1411），不是 bps；
      // 早先按 bps 除以 1000，320 就显示成 0 kb/s。
      if (spec.bitRate > 0) {
        parts.push(
          spec.bitRate >= 1000
            ? `${(spec.bitRate / 1000).toFixed(1)} Mb/s`
            : `${Math.round(spec.bitRate)} kb/s`
        );
      }
    }
    return parts.join(" · ");
  }

  // MA 的 content_type 是容器/编码标识，直接大写会显示成 MPEG，
  // 而 MA 自己界面把 mpeg 标成 MP3，这里按常见取值映射成更准确的名字。
  _codecLabel(codec) {
    const raw = String(codec || "").trim().toLowerCase();
    const map = {
      mpeg: "MP3",
      mp3: "MP3",
      mp4a: "AAC",
      m4a: "AAC",
      aac: "AAC",
      flac: "FLAC",
      alac: "ALAC",
      opus: "Opus",
      vorbis: "Vorbis",
      ogg: "Vorbis",
      pcm: "PCM",
      wav: "WAV",
      alac_ima4: "ALAC",
      wma: "WMA",
    };
    return map[raw] || raw.toUpperCase();
  }

  async _subscribeQueue(queueId) {
    const key = `${this._eid()}|${queueId}`;
    if (this._queueSubscriptionKey === key && this._queueUnsub) {
      return this._queueSnapshot;
    }
    this._teardownQueueSubscription();
    const connection = this._hass?.connection;
    if (!connection?.subscribeMessage) {
      throw new Error("Home Assistant WebSocket unavailable");
    }
    const first = new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        if (this._queueFirst?.reject === reject) this._queueFirst = null;
        reject(new Error(translator(this._hass?.language)("queueEmpty")));
      }, 10000);
      this._queueFirst = {
        resolve: (value) => {
          clearTimeout(timer);
          resolve(value);
        },
        reject: (error) => {
          clearTimeout(timer);
          reject(error);
        },
      };
    });
    this._queueSubscriptionKey = key;
    try {
      this._queueUnsub = await connection.subscribeMessage(
        (event) => this._onQueueEvent(event, key),
        {
          type: "ha_music_studio/subscribe_queue",
          entity_id: this._eid(),
          queue_id: queueId,
        }
      );
    } catch (error) {
      this._teardownQueueSubscription();
      this._queueFirst?.reject?.(error);
      this._queueFirst = null;
      throw error;
    }
    return first;
  }

  _teardownQueueSubscription() {
    const unsub = this._queueUnsub;
    this._queueUnsub = null;
    this._queueSubscriptionKey = "";
    this._queueFirst = null;
    this._queueSnapshot = null;
    this._studioQueueKey = "";
    this._studioFavorite = null;
    this._studioAutoplay = false;
    this._studioCrossfade = false;
    this._studioBusy = false;
    this._waveform = null;
    this._waveformKey = "";
    this._playersOpen = false;
    this._maPlayers = [];
    this._playersBusy = false;
    this._themeOverride = this._loadThemeOverride();
    this._themeOpen = false;
    this._sfxKey = this._loadSfx();
    this._sfxOpen = false;
    this._sfxBusy = false;
    this._sfxSynced = false;
    this._isFullscreen = false;
    if (typeof unsub === "function") {
      try {
        unsub();
      } catch {
        // ignore
      }
    }
  }

  _onQueueEvent(event, key) {
    if (!event || event.type !== "queue") return;
    if (key !== this._queueSubscriptionKey) return;
    if (!queueEventCompatible(event)) {
      this._notify(protocolErrorText(this._hass?.language));
      this._teardownQueueSubscription();
      return;
    }
    this._queueSnapshot = event;
    const first = this._queueFirst;
    this._queueFirst = null;
    first?.resolve?.(event);
    if (this._drawer?.open && this._drawer.mode === "queue") {
      this._applyQueueSnapshot(event);
    }
  }

  _applyQueueSnapshot(event) {
    const t = translator(this._hass?.language);
    const attrs = this._state()?.attributes || {};
    const queueId = event.queue_id || this._queueQueueId;
    this._queueQueueId = queueId;
    const offset = Number(event.offset) || 0;
    let items = readMassQueueItems(
      event.items || [],
      event.current_item_id || "",
      attrs.media_content_id || ""
    );
    if (offset > 0) {
      items = items.map((entry, i) => ({ ...entry, index: offset + i }));
    }
    const total = Number(event.total) || 0;
    const index = Number(event.current_index);
    const fullQueue = !event.windowed && items.length > 0;
    const title = [t("queue")];
    if (total > 0) {
      title.push(`${Number.isFinite(index) && index >= 0 ? index + 1 : "?"}/${total}`);
    }
    let note = !fullQueue && items.length ? t("queueLimited") : "";
    if (event.windowed && items.length) {
      note = `${t("queueWindow")} · ${offset + 1}–${offset + items.length}/${total}`;
    }
    this._drawer = {
      ...this._drawer,
      items,
      loading: false,
      error: event.error || "",
      title: title.join(" · "),
      note,
      maUrl: this._maUrl(),
      fullQueue,
    };
    this.requestUpdate();
    this.updateComplete.then(() => this._scrollQueueToActive());
  }

  async _loadQueue(token) {
    const queueId =
      this._queueQueueId || this._state()?.attributes?.active_queue || "";
    if (!queueId) throw new Error(translator(this._hass?.language)("queueEmpty"));
    let event = null;
    try {
      event = await this._subscribeQueue(queueId);
    } catch (error) {
      const response = await this._queueCommand("snapshot");
      event = response?.result?.queue || response?.queue || null;
      if (!event) throw error;
      this._queueSnapshot = event;
      this._applyQueueSnapshot(event);
    }
    if (
      token !== this._queueLoadToken ||
      !this._drawer?.open ||
      this._drawer.mode !== "queue"
    ) {
      return;
    }
    if (!event) throw new Error(translator(this._hass?.language)("queueEmpty"));
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
    if (!maPlayer) return;
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
    // 无论当前播放在哪个播放器，MA 按钮都只弹歌单抽屉，绝不跳转 MA 面板。
    // 当前不是 MA 播放器时，歌单改由可用的 MA 播放器提供，避免抽屉空白。
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

  _playlistEntityId() {
    const current = this._eid();
    if (this._isMaPlayer(current)) return current;
    const leader = this._currentMaPlayer();
    const leaderEntity = leader ? this._entityForMaPlayer(leader) : "";
    if (leaderEntity && this._isMaPlayer(leaderEntity)) return leaderEntity;
    return this._entities().find((id) => this._isMaPlayer(id)) || "";
  }

  async _browseMedia(contentId, contentType, entityId = this._eid()) {
    const connection = this._hass?.connection;
    if (!connection?.sendMessagePromise) throw new Error("unsupported");
    const payload = {
      type: "media_player/browse_media",
      entity_id: entityId,
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
      const browseEntity = this._playlistEntityId() || this._eid();
      const root = await this._browseMedia(null, null, browseEntity);
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
          folder.media_content_type,
          browseEntity
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
    const entityId = this._playlistEntityId();
    if (!entityId || !this._isMaPlayer(entityId)) {
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
    this._teardownQueueSubscription();
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
    this._queueLocalWebEntitySync();
  }

  /* ---------------- 渲染辅助 ---------------- */

  shouldUpdate() {
    // 拖动胶囊期间暂停重绘，避免 hass 状态刷新把拖出来的临时 DOM 顺序冲掉。
    return !this._chipDrag;
  }

  updated() {
    const card = this.renderRoot?.querySelector?.(".hm-card");
    if (!card) return;    // 缩略预览：清掉任何残留的背景大图，避免整张封面被解码后常驻内存。
    if (this._thumbMode()) {
      card.querySelectorAll(".hm-bg-art").forEach((layer) => {
        if (layer.style.backgroundImage) layer.style.backgroundImage = "";
        layer.classList.remove("on");
      });
    }
    const media = this._readMedia();
    const entityId = this._eid();
    this._safeEffect("art", () => {
      this._syncArt(media, entityId);
      if (this._artUrl !== this._artApplied) {
        this._crossFadeArt(card, this._artUrl);
      }
    });
    this._safeEffect("cover-art", () => this._applyCoverArt(this._coverUrlFor()));
    this._safeEffect("range", () => this._syncRangeValues());
    this._safeEffect("entities-nav", () => this._syncEntitiesNav());
    this._safeEffect("entities-order", () => this._syncChipOrderStyles());
    this._safeEffect("studio", () => this._syncStudioQueue());
    this._safeEffect("panel", () => {
      this._syncPanelFlag();
      this._queuePanelFit();
    });
    this._safeEffect("compact", () => this._syncCompact());
    this._safeEffect("dock", () => {
      this._installDock();
      this._installLyricDock();
    });
    this._safeEffect("cover-spin", () => this._syncCoverSpinEffect());
    this._safeEffect("cover-eq", () => this._syncCoverEq());
    this._safeEffect("lyrics", () => {
      this._maybeLoadLyrics();
      if (
        (this._lyricsOpen || this._sideLyricsVisible()) &&
        this._lyricsActive !== this._lyricsScrolled
      ) {
        this._lyricsScrolled = this._lyricsActive;
        this._centerActiveLyric();
      }
      this._observeLyricsScroll();
    });
    this._safeEffect("spectrum", () => this._syncSpectrum());
    this._safeEffect("ticker", () => this._syncProgressTicker());
  }

  // 一次效果同步失败不应该拖垮其他效果（旧版任何一个异常都会让后续封面/歌词停在旧状态）。
  _safeEffect(name, fn) {
    try {
      fn();
    } catch (error) {
      if (!this._effectErrors) this._effectErrors = new Set();
      if (this._effectErrors.has(name)) return;
      this._effectErrors.add(name);
      console.error(`ha-music: ${name} 同步失败`, error);
    }
  }

  _syncCoverSpinEffect() {
    const img = this.renderRoot?.querySelector?.('.hm-cover .hm-cover-img[data-state="under"]');
    if (!img) return;
    syncCoverSpin(img, this._state()?.state === "playing");
  }

  _queuePanelFit() {
    if (this._fitPanelRaf) cancelAnimationFrame(this._fitPanelRaf);
    if (typeof requestAnimationFrame === "undefined") {
      this._fitPanel();
      this._layoutWideCluster();
      return;
    }
    this._fitPanelRaf = requestAnimationFrame(() => {
      this._fitPanelRaf = null;
      this._fitPanel();
      this._layoutWideCluster();
    });
  }

  _fitPanel() {
    if (!this._panel) {
      this.style.removeProperty("--hm-panel-cover");
      this.style.removeProperty("--hm-panel-height");
      this.renderRoot?.querySelector?.(".hm-main")?.style.removeProperty("flex");
      this._panelHeight = 0;
      this.renderRoot
        ?.querySelector?.(".hm-card")
        ?.classList.remove("hm-short-landscape");
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
    // 编辑态下 HA 会给卡片套编辑容器，主区的 flex 会被外部布局压回 0 0 auto，
    // 于是主区高度塌成封面初始高度、_fitPanel 再按这个小高度缩封面，形成越缩越小。
    // 面板模式直接内联锁定主区伸展，断开这条尺寸反馈链。
    main.style.flex = "1 1 auto";
    const mainH = Math.round(main.clientHeight || 0);
    const mainW = Math.round(main.clientWidth || 0);
    if (mainH < 80 || mainW < 80) return;
    const cardW = Math.round(card.clientWidth || 0);
    const cardH = Math.round(card.clientHeight || 0);
    // 竖屏/近方形卡片统一走上中下堆叠。只看宽度会漏掉 820~1024 的平板竖屏：
    // 封面按宽屏尺寸撑高主区，底部进度/控制/音量会被挤出卡片。
    const stack = cardW < 820 || cardH > cardW * 1.15;
    // 横屏短卡片（1024×768 这类）：宽度落在窄屏断点内，但高度不够竖排，
    // 打类切回左右双栏，避免底部控制区被挤出卡片。
    const shortLandscape =
      cardW >= 700 && cardW <= 821 && cardH <= 820 && cardW >= cardH * 1.02;
    card.classList.toggle("hm-short-landscape", shortLandscape);
    // 820~1024 的平板竖屏：面板里也改竖排，否则封面按面板放大后信息列被挤到没有宽度。
    const panelStack = stack && !shortLandscape && cardW >= 821;
    card.classList.toggle("hm-panel-stack", panelStack);
    // 窄屏/竖屏面板：用显式类接管封面与信息区高度分配，避免依赖容器查询。
    card.classList.toggle("hm-narrow-panel", stack && !shortLandscape);
    // 手机/窄屏：信息区不再按 48% 上限收缩，改成整行宽度并水平居中。
    card.classList.toggle("hm-panel-compact", stack && !shortLandscape && mainW < 560);
    // 矮屏竖排（如 375×667）：高度不足以同时放下封面、标题、歌手、规格，
    // 隐藏次要信息（标签、当前歌词行），保证主信息完整可见。
    card.classList.toggle("hm-panel-tight", stack && !shortLandscape && cardH < 760);
    let size;
    if (shortLandscape) {
      size = Math.max(120, Math.min(mainH - 96, mainW * 0.30, 460));
    } else if (stack) {
      // 窄屏/竖屏：封面在上、信息在下。面板视图要铺满区域，封面按整卡高度放大，
      // 但必须给下面的标题/标签留出空间，否则标题会被频谱盖住。
      const narrow = mainW < 560;
      const widthRatio = narrow ? 0.66 : 0.78;
      const heightBudget = cardH * (narrow ? 0.34 : 0.42);
      // 窄屏竖排时信息区（标题/歌手/规格）要固定占位，封面只能用剩下的高度。
      const infoBudget = narrow ? 120 : 96;
      size = Math.max(
        120,
        Math.min(mainW * widthRatio, heightBudget, mainH * 0.62, 620, mainH - infoBudget),
      );
    } else {
      // 宽屏：面板视图里封面跟着主区高度走，只留给外圈音柱一点余量；
      // 上限从 460 放到 680，桌面/平板横屏才不会出现"一小坨内容 + 大片空白"。
      size = Math.max(120, Math.min(mainH - 40, mainW * 0.36, 680));
    }
    // 窄屏/竖屏面板：信息区先按真实高度预留，再定封面。
    // 只靠 CSS 会被后置的 height:100% 盖回，标题/歌手/规格被 .hm-main 的
    // overflow 裁掉；只按固定 infoBudget 又会在 375×667 这类矮屏留不够。
    const wrap = this.renderRoot?.querySelector?.(".hm-cover-wrap");
    const info = this.renderRoot?.querySelector?.(".hm-info");
    const ringPad = 10;
    if (stack && !shortLandscape && info) {
      const infoH = Math.round(info.offsetHeight || 0);
      const rowGap = Math.round(parseFloat(getComputedStyle(main).rowGap) || 0);
      const available = mainH - infoH - rowGap - 2;
      if (available > 90) {
        size = Math.min(size, Math.max(84, available - ringPad));
      }
    }
    this.style.setProperty("--hm-panel-cover", `${Math.round(size)}px`);
    if (stack && !shortLandscape) {
      // 环形音柱跟随实际封面尺寸，窄屏压到 10px 外扩，避免被容器裁掉。
      this.style.setProperty("--hm-cover-size", `${Math.round(size)}px`);
      this.style.setProperty("--hm-ring-pad", `${ringPad}px`);
      if (wrap) wrap.style.height = `${Math.round(size) + ringPad}px`;
      if (info) {
        info.style.flex = "0 0 auto";
        info.style.minHeight = "0";
      }
    } else if (wrap) {
      this.style.setProperty("--hm-cover-size", `${this._coverPx(this._layoutKey())}px`);
      this.style.removeProperty("--hm-ring-pad");
      wrap.style.removeProperty("height");
      if (info) {
        info.style.removeProperty("flex");
        info.style.removeProperty("min-height");
      }
    }
  }

  /**
   * 宽屏歌词分栏时，封面、环形音柱与歌名/歌手作为一组整体水平居中，
   * 居中范围是主区左缘到歌词左缘，歌词本身保持不动。
   * 用 transform 而不是改列宽：歌词列不会被推走，标题过长时也能按可用间隙收敛。
   */
  _layoutWideCluster() {
    const root = this.renderRoot;
    const cover = root?.querySelector?.(".hm-cover-wrap");
    const meta = root?.querySelector?.(".hm-meta");
    const lyrics = root?.querySelector?.(".hm-lyrics-inline");
    const main = root?.querySelector?.(".hm-main");
    const info = root?.querySelector?.(".hm-info");
    if (!cover || !meta) return;
    cover.style.removeProperty("transform");
    meta.style.removeProperty("transform");
    if (!lyrics || !main || !info) return;
    const cols = getComputedStyle(info).gridTemplateColumns;
    if (!cols || cols === "none" || cols.trim().split(/\s+/).length < 2) return;

    const ring = root.querySelector(".hm-cover-eq");
    const mainRect = main.getBoundingClientRect();
    const lyricsRect = lyrics.getBoundingClientRect();
    const coverRect = cover.getBoundingClientRect();
    const ringRect = ring?.getBoundingClientRect?.();
    const ringLeft =
      ringRect && ringRect.width > 0 ? ringRect.left : coverRect.left;
    const metaRect = meta.getBoundingClientRect();

    // 取文字实际右缘，而不是 meta 列的右缘：标题列常有余量，
    // 按列宽判断会把整组误认为已经居中。
    let contentRight = metaRect.left;
    for (const child of meta.children) {
      const range = document.createRange();
      range.selectNodeContents(child);
      const rect = range.getBoundingClientRect();
      if (rect.width > 0) contentRight = Math.max(contentRight, rect.right);
    }
    if (contentRight <= metaRect.left) contentRight = metaRect.right;

    const regionLeft = mainRect.left;
    const regionRight = lyricsRect.left - Math.max(16, mainRect.width * 0.012);
    const clusterCenter = (ringLeft + contentRight) / 2;
    const regionCenter = (regionLeft + regionRight) / 2;
    const maxShift = Math.max(0, regionRight - contentRight);
    const shift = Math.max(0, Math.min(regionCenter - clusterCenter, maxShift));
    if (shift < 1) return;
    const tx = `translateX(${shift.toFixed(1)}px)`;
    cover.style.transform = tx;
    meta.style.transform = tx;
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

  /**
   * 手机默认卡片（矮卡）走紧凑模式：封面与文字左右排、砍掉次要行、压扁控件。
   * 只按宽度判断会漏掉"够宽但很矮"的默认格，所以这里按实测高度切。
   */
  _compactCard() {
    const height = this._height || 0;
    return Boolean(
      !this._panel &&
        !this._thumbMode() &&
        this._layoutKey() === "full" &&
        height > 0 &&
        height < 400
    );
  }

  _syncCompact() {
    const height = this._height || 0;
    const width = this._width || 0;
    const on = Boolean(
      !this._panel &&
        !this._thumbMode() &&
        this._layoutKey() === "full" &&
        height > 0 &&
        height < 400 &&
        width > 0
    );
    const tight = on && height < 300;
    if (
      on === this.classList.contains("hm-compact") &&
      tight === this.classList.contains("hm-compact-tight")
    ) {
      return;
    }
    this.classList.toggle("hm-compact", on);
    this.classList.toggle("hm-compact-tight", tight);
    // 覆盖层/抽屉等非 shadow 元素也跟随，避免主题层还按大卡排版。
    const card = this.renderRoot?.querySelector?.(".hm-card");
    card?.classList.toggle("hm-compact", on);
    card?.classList.toggle("hm-compact-tight", tight);
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

  _handleDockRemove(detail) {
    const mode = detail?.mode;
    if (!mode || !["top", "sidebar", "fab"].includes(mode)) return;
    const pref = loadDockPref();
    const modes = (pref ? pref.modes : normalizeDockModes(this._config?.dock)).filter(
      (item) => item !== mode
    );
    const entities = { ...(pref ? pref.entities : normalizeDockEntities(this._config?.dock_entities)) };
    const themes = { ...(pref ? pref.themes : normalizeDockThemes(this._config?.dock_themes)) };
    const follow = { ...(pref ? pref.follow || {} : normalizeDockFollow(this._config?.dock_follow)) };
    delete entities[mode];
    delete themes[mode];
    delete follow[mode];
    const nextDock = modes.length ? modes : "none";
    this._config = {
      ...this._config,
      dock: nextDock,
      dock_entities: entities,
      dock_themes: themes,
      dock_follow: follow,
      dock_edited: Date.now(),
    };
    this._dockOwner = false;
    this.requestUpdate();
    this._saveCardDock(nextDock, entities, themes, follow).catch(() => {
      /* 保存失败时仍保留当前会话内的删除效果 */
    });
  }

  async _saveCardDock(dock, entities, themes, follow) {
    if (!this._hass?.callWS) throw new Error("not connected");
    const urlPath = this._dashboardUrlPath();
    const response = await this._hass.callWS({
      type: "lovelace/config",
      url_path: urlPath,
    });
    const locationInfo = this._cardsInView(response);
    const view = locationInfo.config.views[locationInfo.viewIndex];
    const cards = Array.isArray(view?.cards) ? view.cards : [];
    let cardIndex = cards.findIndex((card) => card?.type === "custom:ha-music");
    if (cardIndex < 0) throw new Error(translator(this._hass?.language)("cardConfigMissing"));
    const replacement = {
      ...cards[cardIndex],
      dock,
      dock_entities: entities,
      dock_themes: themes,
      dock_follow: follow,
      dock_edited: Date.now(),
    };
    view.cards[cardIndex] = replacement;
    await this._hass.callWS({
      type: "lovelace/config/save",
      url_path: urlPath,
      config: locationInfo.config,
    });
  }

  _dockPlayingEntity(fallback = "") {
    const current = this._eid?.() || "";
    const list = Array.from(
      new Set([...(this._entities?.() || []), current, fallback].filter(Boolean))
    );
    return pickPlayingEntity(this._hass, list, current) || fallback;
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
    const configFollow = normalizeDockFollow(this._config?.dock_follow);
    const pref = loadDockPref();
    // 全局设置一旦存在，所有卡片都以它为准：同一页面/不同仪表盘里
    // 复制出来的多张卡片不会再各自用本地 dock 配置互相覆盖。
    const modes = pref ? pref.modes : normalizeDockModes(configDock);
    const dockEntities = pref ? pref.entities : configEntities;
    const dockThemes = pref ? pref.themes : configThemes;
    const dockFollow = pref ? pref.follow || {} : configFollow;
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
    const playing = dockFollow ? this._dockPlayingEntity(fallback) : fallback;
    for (const mode of modes) {
      const entity = dockFollow[mode] === true
        ? playing || fallback
        : dockEntities[mode] || fallback;
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
        follow: dockFollow,
      });
    }
    this._dockOwner = true;
  }

  _lyricsSource() {
    return this._lyrics?.source || "Music Assistant";
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
    const meta = attrs.media_metadata || {};
    return [
      entity,
      meta.title || attrs.media_title || "",
      meta.artist || attrs.media_artist || "",
      meta.album_name || attrs.media_album_name || "",
      meta.duration ?? attrs.media_duration ?? 0,
      attrs.media_content_id || "",
    ]
      .map((value) => String(value))
      .join("|");
  }

  _syncArt(media, entityId) {
    const state = this._state();
    const unavailable =
      !state || state.state === "unavailable" || state.state === "unknown";
    const artSource = unavailable ? "" : media?.art || fallbackCover(media);
    if (artSource === this._artSource) return;
    this._artSource = artSource;
    this._artFailedSource = "";
    const seq = ++this._artSeq;
    this._artLoading = "";
    if (!artSource) {
      this._artUrl = "";
      this._artApplied = "";
      this.requestUpdate();
      return;
    }
    resolveArtUrl(this._hass, artSource, entityId).then((url) => {
      if (seq !== this._artSeq) return;
      if (url === this._artUrl) return;
      this._artUrl = url;
      this.requestUpdate();
      // 不依赖下一次 updated()：新封面解析完成后立刻落到底层背景，
      // 否则自动切歌/外部切歌时会出现“标题已换、背景仍是上一首”。
      const card = this.renderRoot?.querySelector?.(".hm-card");
      if (card) this._crossFadeArt(card, url);
    });
  }

  _artUrlFor() {
    const media = this._readMedia();
    return normalizeArt(this._hass, media.art);
  }

  _resetCoverLayers() {
    if (this._coverFadeTimer) {
      clearTimeout(this._coverFadeTimer);
      this._coverFadeTimer = null;
    }
    this._coverLayers = ["", ""];
    this._coverSlot = 0;
    this._coverPending = "";
    this._coverReady = [false, false];
  }

  _coverUrlFor() {
    const state = this._state();
    if (!state || state.state === "unavailable" || state.state === "unknown") {
      return "";
    }
    const media = this._readMedia();
    return this._artUrl || fallbackCover(media) || "";
  }

  /**
   * 封面切图走双层交叉淡入：旧图一直垫在下面，新图解码完成后才淡上来，
   * 中间不会出现空帧（直接换 src 会先变空白再出图，就是切歌时那一下闪）。
   */
  _applyCoverArt(url) {
    const want = url || "";
    const cur = this._coverLayers[this._coverSlot] || "";
    if (want === cur) {
      if (this._coverPending && this._coverPending !== want) {
        const idx = 1 - this._coverSlot;
        this._coverLayers[idx] = "";
        this._coverReady[idx] = false;
        this._coverPending = "";
        this.requestUpdate();
      }
      return;
    }
    if (!want) {
      if (this._coverLayers[0] || this._coverLayers[1]) {
        this._resetCoverLayers();
        this.requestUpdate();
      }
      return;
    }
    if (!cur) {
      // 还没有任何可留的底图：直接落位，避免首次只显示占位符。
      this._coverLayers[this._coverSlot] = want;
      this._coverReady[this._coverSlot] = true;
      this._coverPending = "";
      this.requestUpdate();
      return;
    }
    if (this._coverPending === want) return;
    const idx = 1 - this._coverSlot;
    this._coverPending = want;
    this._coverLayers[idx] = want;
    this._coverReady[idx] = false;
    this.requestUpdate();
  }

  _onCoverLayerLoad(index) {
    if (this._coverLayers[index] !== this._coverPending) return;
    if (this._coverReady[index]) return;
    this._coverReady[index] = true;
    this.requestUpdate();
    this._commitCoverArt(index);
  }

  _commitCoverArt(index) {
    if (this._coverFadeTimer) clearTimeout(this._coverFadeTimer);
    // 等淡入跑完再把旧图撤掉，避免切图瞬间闪回底噪/占位符。
    this._coverFadeTimer = setTimeout(() => {
      this._coverFadeTimer = null;
      if (this._coverLayers[index] !== this._coverPending) return;
      const prev = this._coverSlot;
      this._coverSlot = index;
      this._coverPending = "";
      this._coverReady[index] = true;
      this._coverLayers[prev] = "";
      this._coverReady[prev] = false;
      this.requestUpdate();
    }, 320);
  }

  _onCoverLayerError(index) {
    if (this._coverLayers[index] !== this._coverPending) return;
    this._coverPending = "";
    this._coverLayers[index] = "";
    this._coverReady[index] = false;
    this.requestUpdate();
    // 与原来一致：新封面加载失败就整体走失败分支，退成占位符，不保留上一首的图。
    this._resetCoverLayers();
    this._onArtError();
  }

  _onArtError() {
    if (!this._artSource) return;
    this._artFailedSource = this._artSource;
    this._artUrl = "";
    this._artApplied = "";
    this._artLoading = "";
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
    // 缩略预览里背景层被 CSS 隐藏，仍然会把封面图整张解码一遍（大图占用可观），
    // 直接不加载背景图，只保留纯渐变。
    if (this._thumbMode()) {
      this._artLoading = "";
      this._artApplied = "";
      layers.forEach((layer) => {
        layer.classList.remove("on");
        layer.style.backgroundImage = "";
      });
      return;
    }
    if (!url) {
      this._artLoading = "";
      this._artApplied = "";
      layers.forEach((layer) => {
        layer.classList.remove("on");
        layer.style.backgroundImage = "";
      });
      this._artSlot = 0;
      this._maybePalette("");
      return;
    }
    if (url === this._artApplied || url === this._artLoading) return;
    this._artLoading = url;
    const nextIndex = layers.length > 1 ? (this._artSlot + 1) % 2 : 0;
    const next = layers[nextIndex];
    const previous = layers[this._artSlot];
    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      if (this._artLoading !== url || this._artUrl !== url) return;
      // 进入缩略预览后仍在途的加载：直接丢弃，别把整张大图挂到背景层。
      if (this._thumbMode()) {
        this._artLoading = "";
        layers.forEach((layer) => {
          layer.classList.remove("on");
          layer.style.backgroundImage = "";
        });
        return;
      }
      this._artLoading = "";
      this._artApplied = url;
      next.style.backgroundImage = `url("${url}")`;
      next.classList.add("on");
      previous?.classList.remove("on");
      this._artSlot = nextIndex;
      this._maybePalette(url);
    };
    image.onerror = () => {
      if (this._artLoading === url) this._artLoading = "";
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

  _stopProgressTicker() {
    if (this._progressRaf) cancelAnimationFrame(this._progressRaf);
    this._progressRaf = null;
    this._progressLastSecond = -1;
    this._progressPaintAt = 0;
  }

  _syncProgressTicker() {
    if (this._seekPreview !== null || this._state()?.state !== "playing") {
      this._stopProgressTicker();
      return;
    }
    const root = this.renderRoot;
    const seek = root?.querySelector?.('input.hm-range[data-role="seek"]');
    const media = this._readMedia();
    if (!seek || !media.duration) {
      this._stopProgressTicker();
      return;
    }
    if (this._progressRaf) return;
    this._progressLastSecond = -1;
    this._progressRaf = requestAnimationFrame(() => this._progressTick());
  }

  _progressTick() {
    this._progressRaf = null;
    if (this._seekPreview !== null || this._state()?.state !== "playing") {
      this._progressLastSecond = -1;
      return;
    }
    const seek = this.renderRoot?.querySelector?.(
      'input.hm-range[data-role="seek"]'
    );
    if (!seek) {
      this._progressLastSecond = -1;
      return;
    }
    const media = this._readMedia();
    const duration = Number(media.duration) || 0;
    if (!duration) {
      this._progressLastSecond = -1;
      return;
    }
    const position = clamp(Number(media.position) || 0, 0, duration);
    const percent = clamp((position / duration) * 100, 0, 100);
    const paintNow = performance.now();
    if (this._isMobileUi() && this._progressPaintAt && paintNow - this._progressPaintAt < 32) {
      this._progressRaf = requestAnimationFrame(() => this._progressTick());
      return;
    }
    this._progressPaintAt = paintNow;
    // 只更新进度条本身，不触发整卡重绘；播放时按帧推进，拖动时由用户接管。
    seek.value = String(position);
    seek.style.setProperty("--pct", `${percent}%`);
    const second = Math.floor(position);
    if (second !== this._progressLastSecond) {
      this._progressLastSecond = second;
      setLitText(this.renderRoot?.querySelector?.(".hm-time"), formatTime(position));
      // 切歌后模板可能还保留上一首的结束时间；这里每帧用当前时长校正，
      // 不只更新当前时间，避免总时长标签停在旧值直到整卡重绘。
      setLitText(
        this.renderRoot?.querySelector?.(".hm-time.end"),
        this._showRemaining
          ? `-${formatTime(Math.max(duration - position, 0))}`
          : formatTime(duration)
      );
    }
    this._progressRaf = requestAnimationFrame(() => this._progressTick());
  }

  _syncRangeValues() {
    const root = this.renderRoot;
    if (!root) return;
    const seek = root.querySelector?.('input.hm-range[data-role="seek"]');
    const volume = root.querySelector?.('input.hm-range[data-role="volume"]');
    const media = this._readMedia();
    const info = this._volumeInfo(media);
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
    if (volume) {
      const level =
        this._volumePreview === null ? info.level : clamp(this._volumePreview, 0, 1);
      const pct = Math.round(level * 100);
      volume.value = String(pct);
      volume.style.setProperty("--pct", `${level * 100}%`);
      volume.setAttribute("data-disabled", String(!info.supported));
      // 百分比标签直接回写：不依赖下一轮 Lit 重绘，避免移动端拖完后标签停在旧值。
      setLitText(root.querySelector?.(".hm-vol-pct"), String(pct));
    }
    // 静音按钮同样直接回写：模板缓存/延迟重绘时图标也不会停在旧状态。
    const muteBtn = root.querySelector?.(".hm-volume .hm-volume-mute");
    if (muteBtn) {
      const muted = this._mutedOverride === null ? info.muted : this._mutedOverride;
      const t = translator(this._hass?.language);
      muteBtn.setAttribute("data-muted", muted ? "true" : "false");
      muteBtn.setAttribute("data-on", muted ? "true" : "false");
      muteBtn.setAttribute("aria-label", t(muted ? "unmute" : "mute"));
      muteBtn.setAttribute("title", t(muted ? "unmute" : "mute"));
    }
  }

  getCardSize() {
    const shape = this._shape();
    if (shape === "banner") return 2;
    if (shape === "wide") return 5;
    const layout = this._layoutKey();
    if (layout === "mini") return 1;
    if (layout === "compact") return 3;
    return 6;
  }

  getGridOptions() {
    // 面板/全屏保留固定高；Sections 下按内容高度自适应（rows:"auto"），
    // 避免声明的行数小于真实内容导致底部音量行被裁。
    if (this._panel) {
      return {
        columns: "full",
        rows: Math.max(6, this.getCardSize()),
        min_columns: 12,
        min_rows: 4,
        max_columns: 24,
        max_rows: 24,
      };
    }
    // 按内容算行数（mushroom 的做法）：rows = 内容高度需要的栅格行，min_rows 与之一致。
    // 用户仍可往上拖高，但默认高度不会小于内容，避免裁切。
    const w = this._width || 0;
    const h = this._height || 0;
    let rows;
    if (h) {
      // 行高 56px、行间距 8px：rows 行可容纳 rows*56 + (rows-1)*8
      rows = Math.ceil((h + 8) / 64);
    } else {
      // 未测到尺寸时按宽度估：>=760 的自然内容约 390px，<760 约 330px
      rows = w >= 760 ? 7 : 6;
    }
    rows = Math.min(24, Math.max(4, rows));
    return {
      columns: 12,
      rows,
      min_columns: 4,
      max_columns: 24,
      min_rows: rows,
      max_rows: 24,
    };
  }

  getLayoutOptions() {
    const grid = this.getGridOptions();
    return {
      grid_columns: grid.columns === "full" ? 12 : grid.columns,
      grid_rows: typeof grid.rows === "number" ? grid.rows : this.getCardSize(),
      grid_min_columns: grid.min_columns,
      grid_max_columns: grid.max_columns,
      grid_min_rows: grid.min_rows,
      grid_max_rows: grid.max_rows,
    };
  }

  /* ---------------- 渲染 ---------------- */

  _observeLyricsScroll() {
    if (typeof ResizeObserver === "undefined") return;
    const scroll = this.renderRoot?.querySelector?.(".hm-lyrics-scroll");
    if (!scroll || scroll === this._lyricsScrollObserved) return;
    this._lyricsScrollObserver?.disconnect();
    this._lyricsScrollObserved = scroll;
    this._lyricsScrollObserver = new ResizeObserver(() => {
      if (this._lyricsActive >= 0 && scroll.isConnected) {
        this._centerActiveLyric();
      }
    });
    this._lyricsScrollObserver.observe(scroll);
  }

  _centerActiveLyric() {
    if (typeof requestAnimationFrame === "undefined") return;
    const run = (attempt = 0) => {
      requestAnimationFrame(() => {
        const scroll = this.renderRoot?.querySelector?.(".hm-lyrics-scroll");
        const line = this.renderRoot?.querySelector?.(
          '.hm-lyrics-line[data-active="true"]'
        );
        if (!scroll || !line) return;
        const viewH = scroll.clientHeight;
        if (viewH < 24) {
          if (attempt < 4) run(attempt + 1);
          return;
        }
        // 上下各留半屏滚动空间，首句与末句也有空间停在垂直中线。
        const pad = Math.max(0, Math.round((viewH - line.offsetHeight) / 2));
        const padValue = `${pad}px`;
        if (scroll.style.paddingTop !== padValue) {
          scroll.style.paddingTop = padValue;
          scroll.style.paddingBottom = padValue;
        }
        // 读一次布局，确保 padding 已生效后再计算位置。
        void scroll.offsetHeight;
        const target = () => {
          const scrollRect = scroll.getBoundingClientRect();
          const lineRect = line.getBoundingClientRect();
          const top =
            scroll.scrollTop +
            lineRect.top -
            scrollRect.top -
            scrollRect.height / 2 +
            lineRect.height / 2;
          return Math.max(0, top);
        };
        const from = scroll.scrollTop;
        const to = target();
        const distance = Math.abs(to - from);
        if (distance < 1.5) return;
        // 自己用缓动动画滚动，避免原生 smooth 结束后再硬跳一次。
        // 句子越远，过渡稍长，但上限 720ms，保持柔和而不拖沓。
        const duration = Math.min(720, Math.max(320, distance * 0.9));
        const started = performance.now();
        if (this._lyricsScrollRaf && typeof cancelAnimationFrame === "function") {
          cancelAnimationFrame(this._lyricsScrollRaf);
        }
        const step = (now) => {
          if (!scroll.isConnected) return;
          const k = Math.min(1, (now - started) / duration);
          const ease = 1 - Math.pow(1 - k, 3);
          scroll.scrollTop = from + (to - from) * ease;
          if (k < 1) {
            this._lyricsScrollRaf = requestAnimationFrame(step);
          } else {
            this._lyricsScrollRaf = null;
          }
        };
        this._lyricsScrollRaf = requestAnimationFrame(step);
      });
    };
    run();
  }

  _renderLyrics(media, position, inline = false) {
    const t = translator(this._hass?.language);
    const lyrics = this._lyrics;
    const timed = lyrics.lines.length > 0;
    const plain = lyrics.plain || [];
    const backendIndex = Number.isInteger(lyrics.index) ? lyrics.index : -1;
    const progress = timed
      ? { index: backendIndex, progress: Number(lyrics.progress) || 0 }
      : { index: -1, progress: 0 };
    const active = timed && lyrics.status !== "loading" ? Math.max(0, progress.index) : -1;
    const lineProgress = active >= 0 ? progress.progress : 0;
    const activeChanged = active !== this._lyricsActive;
    this._lyricsActive = active;
    // 不依赖 updated() 的生命周期时机：句子一变化就排一次居中。
    // 面板未打开或没有歌词容器时，_centerActiveLyric 会自行 no-op。
    if (activeChanged && active >= 0) {
      this._lyricsScrolled = active;
      this._centerActiveLyric();
    }
    const canSeek = hasFeature(this._state(), FEATURES.SEEK);
    const offsetLabel = `${this._lyricsOffset > 0 ? "+" : ""}${this._lyricsOffset.toFixed(1)}s`;

    let body = nothing;
    if (lyrics.protocol === false) {
      body = html`<div class="hm-lyrics-empty">
        ${lyrics.message || protocolErrorText(this._hass?.language)}
      </div>`;
    } else if (lyrics.status === "loading" && !timed && !plain.length) {
      // 首次匹配（没有上一首歌词可留）时铺五行骨线，占住原本的高度，
      // 免得歌词回来后整块 UI 被重新撑开。
      body = Array.from(
        { length: 5 },
        () => html`<div class="hm-lyrics-line" data-static="true" data-skeleton="true">
          <span class="hm-lyrics-text"></span>
        </div>`
      );
    } else if (lyrics.status === "none" || lyrics.status === "error") {
      const isNone = lyrics.status === "none";
      body = html`<div class="hm-lyrics-empty hm-lyrics-error">
        <span class="hm-lyrics-empty-title">${isNone ? t("lyricsNone") : t("lyricsError")}</span>
        <span class="hm-lyrics-empty-hint">${isNone ? t("lyricsNoneHint") : t("lyricsErrorHint")}</span>
        <button
          type="button"
          class="hm-lyrics-retry"
          @click=${(event) => {
            event.stopPropagation();
            this._retryLyrics();
          }}
        >${t("lyricsRetry")}</button>
      </div>`;
    } else if (lyrics.instrumental) {
      body = html`<div class="hm-lyrics-empty">${t("lyricsInstrumental")}</div>`;
    } else if (timed) {
      body = lyrics.lines.map(
        (line, index) => html`<button
          class="hm-lyrics-line"
          data-active=${index === active ? "true" : "false"}
          data-distance=${active >= 0 ? Math.min(4, Math.abs(index - active)) : 0}
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
      // 空结果（既无时间轴也无纯文本）同样不显示任何占位内容。
      return nothing;
    }

    return html`<section
      class="hm-lyrics ${inline ? "hm-lyrics-inline" : ""}"
      data-status=${lyrics.status}
      data-stale=${lyrics.stale ? "true" : "false"}
    >
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
        <div class="hm-card" data-layout=${layout}
        data-shape=${this._shape()} data-panel=${this._panel ? "true" : "false"} data-thumb=${this._thumbMode() ? this._thumbTier() : "false"} data-theme=${themeKey} style=${styleMap(this._styleVars())}>
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
        <div class="hm-card" data-layout=${layout}
        data-shape=${this._shape()} data-panel=${this._panel ? "true" : "false"} data-thumb=${this._thumbMode() ? this._thumbTier() : "false"} data-theme=${themeKey} style=${styleMap(this._styleVars())}>
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
    const volumeMuted =
      this._mutedOverride === null ? volume.muted : Boolean(this._mutedOverride);
    const showVolume =
      config.show_volume !== false && (volume.supported || this.preview === true);
    // 手机 App 与窄卡片把音量单独放到播放控件下方，避免控制条被挤到溢出。
    const volumeBelowControls =
      showVolume &&
      !this._thumbMode() &&
      layout !== "mini" &&
      (this._isMobileUi() ||
        layout === "compact" ||
        (this._width || 0) < 720);
    // 卡片选择器预览（preview=true）里实体往往没有能力位，按完整控制骨架渲染，
    // 否则预览只剩一个播放键，看起来像坏掉。
    // sm 预览只有 ~300×160，塞不下进度+音量+五个键，只保留播放键；
    // md/lg 预览才补全整骨架。
    const previewUi = this.preview === true && this._thumbTier() !== "sm";
    const canShuffle = previewUi || hasFeature(state, FEATURES.SHUFFLE_SET);
    const canRepeat = previewUi || hasFeature(state, FEATURES.REPEAT_SET);
    const canPrev = previewUi || hasFeature(state, FEATURES.PREVIOUS_TRACK);
    const canNext = previewUi || hasFeature(state, FEATURES.NEXT_TRACK);
    const canPlay =
      this.preview === true ||
      hasFeature(state, FEATURES.PLAY) ||
      hasFeature(state, FEATURES.PAUSE);
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
    const studioQueueReady = Boolean(hass.services?.ha_music_studio);
    const showQueue =
      config.show_queue !== false &&
      (queue.length > 0 ||
        (maPlayer && (Boolean(state.attributes?.active_queue) || studioQueueReady)));
    const showLibrary = config.show_library !== false && canBrowse;
    const visualizerValue = config.visualizer || "bars";
    const visualizer = ["bars", "ring", "rail", "none"].includes(visualizerValue)
      ? visualizerValue
      : "bars";
    const fusionMode = this._fusionLayout();
    const fusionRequested = visualizer === "ring" || visualizer === "rail";
    const visualizerKind =
      fusionMode === "ring" ? "none" : fusionMode || (fusionRequested ? "bars" : visualizer);
    const coverMode = config.cover || "ambient";
    const duration = media.duration;
    const position = this._seekPreview ?? media.position;
    const percent = duration ? clamp((position / duration) * 100, 0, 100) : 0;
    const waveBars = this._waveBars();
    const volumePercent = Math.round(
      (this._volumePreview ?? volume.level) * 100
    );
    const repeat = this._repeatValue();
    const mediaTitle = media.title || (isOff ? "" : "");
    const entities = this._entities();
    const showLyrics =
      this._lyricsEnabled() &&
      !this._thumbMode() &&
      layout !== "mini" &&
      (this._lyrics.status === "ready" ||
        this._lyrics.status === "loading" ||
        this._lyrics.status === "none" ||
        this._lyrics.status === "error" ||
        this._lyricsOpen);
    const sideLyrics =
      showLyrics &&
      !this._lyricsOpen &&
      (this._lyrics.status === "ready" || this._lyricsSlot) &&
      this._sideLyricsVisible();

    const lyricLine =
      this._lyrics.status === "ready" &&
      this._lyrics.lines.length &&
      Number.isInteger(this._lyrics.index) &&
      this._lyrics.index >= 0
        ? this._lyrics.lines[this._lyrics.index]?.text || ""
        : "";
    const coverUrl = this._coverUrlFor();

    return html`
      <div
        class="hm-card"
        data-theme=${themeKey}
        data-layout=${layout}
        data-shape=${this._shape()}
        data-panel=${this._panel ? "true" : "false"}
        data-thumb=${this._thumbMode() ? this._thumbTier() : "false"}
        data-playing=${playing ? "true" : "false"}
        data-cover=${coverMode}
        data-ringseek=${fusionMode === "ring" ? "true" : "false"}
        data-tight=${this._tight() ? "true" : "false"}
        data-short=${this._short() ? "true" : "false"}
        data-micro=${this._micro() ? "true" : "false"}
        data-spec=${this._audioSpec ? "ok" : this._callWsError ? "err" : "none"}
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
              <span class="hm-status-text hm-status-player">${config.name || friendlyName(hass, entityId, entityId)}</span>
              <span class="hm-kicker-sep">·</span>
              <span class="hm-status-text">${statusText}</span>
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
              <button
                class="hm-icon-btn hm-theme-btn"
                data-role="theme"
                aria-label=${t("themeTitle")}
                title=${t("themeTitle")}
                data-on=${this._themeOpen ? "true" : "false"}
                @click=${() => this._toggleThemeMenu()}
              >
                ${icon("palette", 16)}
              </button>
              <button
                class="hm-icon-btn hm-sfx-btn"
                data-role="sfx"
                data-on=${this._sfxKey === "off" ? "false" : "true"}
                aria-label=${t("soundFx")}
                title=${t("soundFx")}
                @click=${() => this._toggleSfxMenu()}
              >
                ${icon(this._sfxKey === "off" ? "sfxOff" : "sfx", 16)}
              </button>
              ${maShow
                ? html`<button
                    class="hm-icon-btn hm-ma"
                    aria-label=${t("playlists")}
                    title=${t("playlists")}
                    @click=${() => this._onAssistantButton()}
                  >
                    ${icon("ma", 16)}
                  </button>`
                : nothing}
              ${studioQueueReady
                ? html`<button
                    class="hm-icon-btn hm-players-btn"
                    data-role="players"
                    aria-label=${t("devices")}
                    title=${t("devices")}
                    @click=${() => this._openPlayers()}
                  >
                    ${icon("speaker", 16)}
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
                class="hm-icon-btn hm-fullscreen-btn"
                data-role="fullscreen"
                data-on=${this._isFullscreen ? "true" : "false"}
                aria-label=${this._isFullscreen ? t("exitFullscreen") : t("fullscreen")}
                title=${this._isFullscreen ? t("exitFullscreen") : t("fullscreen")}
                @click=${() => this._toggleFullscreen()}
              >
                ${icon(this._isFullscreen ? "fullscreenExit" : "fullscreen", 16)}
              </button>
            </div>
          </header>

          ${this._themeOpen
            ? html`<div class="hm-menu hm-theme-menu">
                <div class="hm-menu-head">${t("themeTitle")}</div>
                ${Object.keys(THEMES).map(
                  (key) => html`<button
                    class="hm-menu-item"
                    data-no-sfx="true"
                    data-active=${this._themeKey() === key ? "true" : "false"}
                    @click=${() => this._setTheme(key)}
                  >
                    <span>${this._themeLabel(key)}</span>
                    <span class="hm-menu-check">${icon("check", 13)}</span>
                  </button>`
                )}
              </div>`
            : nothing}

          ${this._sfxOpen
            ? html`<div class="hm-menu hm-sfx-menu">
                <div class="hm-menu-head">${t("soundFx")}</div>
                <div class="hm-menu-note">${t("soundFxHint")}</div>
                ${SFX_PRESETS.map((key) => {
                  const labelKey = key === "off" ? "sfxOff" : `sfx${key[0].toUpperCase()}${key.slice(1)}`;
                  return html`<button
                    class="hm-menu-item"
                    data-no-sfx="true"
                    data-active=${this._sfxKey === key ? "true" : "false"}
                    @click=${() => this._setSfx(key)}
                  >
                    <span>${t(labelKey)}</span>
                    <span class="hm-menu-check">${icon("check", 13)}</span>
                  </button>`;
                })}
              </div>`
            : nothing}

          ${entities.length > 1
            ? html`
                <div class="hm-entities-wrap" data-overflow="false">
                  <button
                    class="hm-entities-nav"
                    data-dir="prev"
                    data-role="entities-prev"
                    aria-label=${t("entitiesScrollPrev")}
                    title=${t("entitiesScrollPrev")}
                    @click=${() => this._scrollEntities(-1)}
                  >
                    ${icon("chevronLeft", 14)}
                  </button>
                  <div
                    class="hm-entities"
                    @pointermove=${(event) => this._onChipPointerMove(event)}
                    @pointerup=${(event) => this._onChipPointerUp(event)}
                    @pointercancel=${(event) => this._onChipPointerUp(event)}
                    @pointerleave=${(event) => this._onChipPointerLeave(event)}
                    @scroll=${() => this._syncEntitiesNav()}
                  >
                  ${entities.map((id) => {
                    const item = hass.states?.[id];
                    // 选中项的封面优先用卡片已解析的 blob，避免 HTTPS 页面直接加载
                    // 局域网 http 封面被混合内容策略拦截，出现空心头像。
                    const art =
                      id === entityId && this._artUrl
                        ? this._artUrl
                        : normalizeArt(hass, item?.attributes?.entity_picture);
                    const itemPlaying =
                      item?.state === "playing" || item?.state === "buffering";
                    return html`<button
                      class="hm-entity-chip"
                      data-entity-id=${id}
                      data-active=${id === entityId ? "true" : "false"}
                      data-playing=${itemPlaying ? "true" : "false"}
                      aria-label=${itemPlaying
                        ? `${friendlyName(hass, id, id)} ${t("playing")}`
                        : friendlyName(hass, id, id)}
                      @pointerdown=${(event) => this._onChipPointerDown(event, id)}
                      @click=${() => this._onChipClick(id)}
                      @contextmenu=${(event) => this._onChipContextMenu(event)}
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
                  </div>
                  <button
                    class="hm-entities-nav"
                    data-dir="next"
                    data-role="entities-next"
                    aria-label=${t("entitiesScrollNext")}
                    title=${t("entitiesScrollNext")}
                    @click=${() => this._scrollEntities(1)}
                  >
                    ${icon("chevronRight", 14)}
                  </button>
                </div>`
            : nothing}

          ${this._lyricsOpen
            ? this._renderLyrics(media, position)
            : html`<section
                class="hm-main"
                data-side-lyrics=${sideLyrics ? "true" : "false"}
                @pointerdown=${(event) => this._onRingSeekDown(event)}
                @pointermove=${(event) => this._onRingSeekMove(event)}
                @pointerup=${(event) => this._onRingSeekUp(event)}
                @pointercancel=${(event) => this._onRingSeekCancel(event)}
                @pointerleave=${() => this._setRingHover(false)}
              >
            <div
              class="hm-cover-wrap"
              data-ringseek=${fusionMode === "ring" ? "true" : "false"}
              data-fusion-linear=${fusionMode === "rail" ? "true" : "false"}
            >
              ${this._thumbMode()
                ? nothing
                : html`<canvas class="hm-cover-eq" aria-hidden="true"></canvas>`}
              ${fusionMode === "ring" && duration > 0
                ? html`<div
                    class="hm-ring-seek"
                    data-role="ringseek"
                    role="slider"
                    tabindex="0"
                    aria-label=${t("seek")}
                    aria-valuemin="0"
                    aria-valuemax=${duration}
                    aria-valuenow=${position}
                    data-disabled=${canSeek ? "false" : "true"}
                  ></div>`
                : nothing}
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
                ${this._coverLayers.map((url, index) =>
                  url
                    ? html`<img
                        class="hm-cover-img"
                        data-state=${index === this._coverSlot
                          ? "under"
                          : url === this._coverPending
                            ? "in"
                            : "off"}
                        data-ready=${this._coverReady[index] ? "true" : "false"}
                        src=${url}
                        alt=${mediaTitle || ""}
                        draggable="false"
                        @load=${() => this._onCoverLayerLoad(index)}
                        @error=${() => this._onCoverLayerError(index)}
                      />`
                    : nothing,
                )}
                ${coverUrl
                  ? nothing
                  : html`<span class="hm-cover-ph">${icon("music", 40)}</span>`}
                ${fusionMode === "ring" && duration > 0
                  ? html`<span class="hm-ring-readout" aria-hidden="true">
                      <span data-role="ring-start">${formatTime(position)}</span>
                      <span class="hm-ring-sep">/</span>
                      <span>${formatTime(duration)}</span>
                    </span>`
                  : nothing}
              </button>
              <div class="hm-cover-peek" aria-hidden="true"></div>
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
                ${mediaTitle ||
                (previewUi
                  ? "Music Assistant"
                  : this.preview === true
                    ? "HA Music"
                    : t("noTitle"))}
              </h2>
              <div class="hm-artist">
                ${media.artist ||
                (media.album
                  ? media.album
                  : previewUi
                    ? "播放器预览 · 选中播放器后显示曲目"
                    : statusText)}
              </div>
              ${this._audioSpecText() && !previewUi
                ? html`<div
                    class="hm-spec"
                    title=${`${this._audioSpecText()}${this._audioSpec?.bitPerfect ? ` · ${t("bitPerfect")}` : ""}`}
                  >
                    <span class="hm-spec-full">${this._audioSpecText()}</span>
                    <span class="hm-spec-short">${this._audioSpecText(true)}</span>
                    ${this._audioSpec?.bitPerfect
                      ? html`<span class="hm-spec-bp">${t("bitPerfect")}</span>`
                      : nothing}
                  </div>`
                : this._config?.debug
                  ? html`<div class="hm-spec">
                      ${`规格未读取 · spec=${this._audioSpec ? "set" : "null"} · ma=${this._isMaPlayer() ? "y" : "n"} · ${this._specError || this._callWsError || "no-error"}`}
                    </div>`
                  : nothing}
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
              ${studioQueueReady && !this._thumbMode() && layout !== "mini"
                ? html`<div class="hm-modes">
                    <button
                      class="hm-mode"
                      data-role="autoplay"
                      data-on=${this._studioAutoplay ? "true" : "false"}
                      aria-pressed=${this._studioAutoplay ? "true" : "false"}
                      title=${t("autoplay")}
                      @click=${() => this._toggleStudioAutoplay()}
                    >
                      ${icon("autoplay", 14)}<span>${t("autoplay")}</span>
                    </button>
                    <button
                      class="hm-mode"
                      data-role="crossfade"
                      data-on=${this._studioCrossfade ? "true" : "false"}
                      aria-pressed=${this._studioCrossfade ? "true" : "false"}
                      title=${t("crossfade")}
                      @click=${() => this._toggleStudioCrossfade()}
                    >
                      ${icon("crossfade", 14)}<span>${t("crossfade")}</span>
                    </button>
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

          ${visualizerKind !== "none" && !this._lyricsOpen
            ? html`<div
                class="hm-vis"
                data-playing=${playing ? "true" : "false"}
                data-style=${visualizerKind}
              >
                ${this._renderVisualizer(visualizerKind, media)}
              </div>`
            : nothing}

          ${(duration > 0 || previewUi) && !fusionMode
            ? html`<section class="hm-progress">
                <span class="hm-time">${formatTime(position)}</span>
                <input
                  class="hm-range"
                  data-role="seek"
                  type="range"
                  min="0"
                  max=${duration}
                  step="0.01"
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

          <section
            class="hm-controls ${volumeBelowControls ? "is-stacked" : ""}"
            data-volume-below=${volumeBelowControls ? "true" : "false"}
          >
            <div class="hm-transport">
              ${studioQueueReady
                ? html`<button
                    class="hm-btn hm-favorite"
                    data-role="favorite"
                    data-on=${this._studioFavorite ? "true" : "false"}
                    aria-label=${this._studioFavorite ? t("favoriteOn") : t("favorite")}
                    title=${this._studioFavorite ? t("favoriteOn") : t("favorite")}
                    @click=${() => this._toggleStudioFavorite()}
                  >
                    ${icon(this._studioFavorite ? "heartFill" : "heart", 18)}
                  </button>`
                : nothing}
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
              ${showQueue
                ? html`<button
                    class="hm-btn hm-queue"
                    data-role="queue"
                    aria-label=${t("queue")}
                    title=${t("queue")}
                    @click=${() => this._openQueue()}
                  >
                    ${icon("queue", 18)}
                  </button>`
                : nothing}
            </div>

            ${showVolume
              ? html`<div class="hm-volume">
                  <button
                    class="hm-icon-btn hm-volume-mute"
                    data-muted=${volumeMuted ? "true" : "false"}
                    data-on=${volumeMuted ? "true" : "false"}
                    aria-label=${volumeMuted ? t("unmute") : t("mute")}
                    title=${volumeMuted ? t("unmute") : t("mute")}
                    @click=${() => this._toggleMute()}
                  >
                    <span class="hm-vol-ico hm-vol-ico-on">${icon("volume", 16)}</span>
                    <span class="hm-vol-ico hm-vol-ico-muted">${icon("mute", 16)}</span>
                  </button>
                  <button
                    class="hm-icon-btn hm-vol-step"
                    aria-label=${t("volumeDown")}
                    title=${t("volumeDown")}
                    @click=${() => this._volumeStep(-0.05)}
                  >
                    ${icon("minus", 16)}
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
                  <button
                    class="hm-icon-btn hm-vol-step"
                    aria-label=${t("volumeUp")}
                    title=${t("volumeUp")}
                    @click=${() => this._volumeStep(0.05)}
                  >
                    ${icon("plus", 16)}
                  </button>
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

        ${this._playersOpen
          ? html`<div class="hm-players">
              <div class="hm-players-head">
                <span>${t("devices")}</span>
                <button
                  class="hm-icon-btn"
                  aria-label=${t("close")}
                  title=${t("close")}
                  @click=${() => this._closePlayers()}
                >
                  ${icon("close", 15)}
                </button>
              </div>
              <div class="hm-players-body">
                ${this._renderWebPlayerRow(t)}
                ${this._maPlayers.length
                  ? this._playersForPanel().map((player) => {
                      const current = this._currentMaPlayer();
                      const isLeader = current?.player_id === player.player_id;
                      const member = (current?.group_members || []).includes(player.player_id);
                      const entityId = this._entityForMaPlayer(player);
                      return html`<div class="hm-player-row" data-current=${isLeader ? "true" : "false"}>
                        <div class="hm-player-main">
                          <span class="hm-player-dot" data-playing=${player.state === "playing" ? "true" : "false"}></span>
                          <div class="hm-player-text">
                            <span class="hm-player-name">${player.name}</span>
                            <span class="hm-player-sub">
                              ${isLeader
                                ? `${player.group_members?.length || 1} ${t("groupUnits")}`
                                : `${member ? t("groupMember") : player.state || t("idle")}${
                                    player.group_members?.length
                                      ? ` · ${player.group_members.length} ${t("groupUnits")}`
                                      : ""
                                  }`}
                            </span>
                          </div>
                        </div>
                        <div class="hm-player-actions">
                          ${isLeader
                            ? html`<span class="hm-player-badge">${t("groupLeader")}</span>`
                            : nothing}
                          ${(() => {
                            const entities = this._entities();
                            const inCard = Boolean(entityId) && entities.includes(entityId);
                            const lastOne = inCard && entities.length <= 1;
                            const cardDisabled =
                              this._cardBusy ||
                              !entityId ||
                              (inCard ? lastOne : !player.available);
                            const cardTitle = !entityId
                              ? t("deviceUnavailable")
                              : lastOne
                                ? t("cardNeedsPlayer")
                                : !inCard && !player.available
                                  ? t("deviceUnavailable")
                                  : "";
                            return html`<button
                              class="hm-player-btn"
                              data-role="card"
                              data-on=${inCard ? "true" : "false"}
                              data-disabled=${cardDisabled ? "true" : "false"}
                              title=${cardTitle}
                              ?disabled=${cardDisabled}
                              @click=${() => this._toggleCardEntity(player)}
                            >
                              ${inCard ? t("removeFromCard") : t("addToCard")}
                            </button>`;
                          })()}
                          ${!isLeader && entityId && (member || player.can_group_with?.length !== 0)
                            ? html`<button
                                class="hm-player-btn"
                                data-role="group"
                                data-on=${member ? "true" : "false"}
                                data-disabled=${!current ? "true" : "false"}
                                title=${!current ? t("groupLeaderMissing") : ""}
                                ?disabled=${!current}
                                @click=${() => this._toggleMaGroup(player)}
                              >
                                ${member ? t("leaveGroup") : t("joinGroup")}
                              </button>`
                            : nothing}
                        </div>
                      </div>`;
                    })
                  : html`<div class="hm-players-empty">${t("playersEmpty")}</div>`}
              </div>
            </div>`
          : nothing}

        <div class="hm-toast ${this._toast ? "show" : ""}">${this._toast}</div>
      </div>
    `;
  }

  _fusionLayout() {
    const value = this._config?.visualizer || "bars";
    if (value !== "ring" && value !== "rail") return "";
    if (this._layoutKey() !== "full" || this._thumbPreview) return "";
    return value;
  }

  _fusionPercent() {
    const media = this._readMedia();
    const duration = Number(media.duration) || 0;
    if (!duration) return -1;
    const position = Number(this._seekPreview ?? media.position) || 0;
    return clamp(position / duration, 0, 1);
  }

  _renderFusionSeek(kind) {
    const state = this._state();
    const media = this._readMedia();
    const duration = Number(media.duration) || 0;
    const position = Number(this._seekPreview ?? media.position) || 0;
    const percent = duration ? clamp((position / duration) * 100, 0, 100) : 0;
    const canSeek = duration > 0 && hasFeature(state, FEATURES.SEEK);
    const t = translator(this._hass?.language);
    const flat = this._thumbPreview;
    return html`<div
      class="hm-fusion"
      data-kind=${kind}
      style=${styleMap({ "--pct": `${percent}%` })}
    >
      ${flat
        ? html`<div class="hm-spectrum hm-spectrum-flat" aria-hidden="true"></div>`
        : html`<canvas class="hm-spectrum" aria-hidden="true"></canvas>`}
      <div class="hm-fusion-track" aria-hidden="true">
        <span class="hm-fusion-fill"></span>
        <span class="hm-fusion-knob"></span>
      </div>
      <input
        class="hm-fusion-range"
        type="range"
        min="0"
        max=${duration || 1}
        step="0.01"
        .value=${String(position)}
        data-disabled=${canSeek ? "false" : "true"}
        aria-label=${t("seek")}
        @input=${(event) => this._onSeekInput(event)}
        @change=${(event) => this._onSeekCommit(event)}
      />
      <div class="hm-fusion-times" aria-hidden="true">
        <span data-role="fusion-start">${formatTime(position)}</span>
        <span data-role="fusion-end">${formatTime(duration)}</span>
      </div>
    </div>`;
  }

  _renderVisualizer(kind, media) {
    if (kind === "rail") return this._renderFusionSeek(kind);
    if (kind === "ring") return nothing;
    // 缩略预览只用静态渐变条：不创建 canvas、不跑 rAF，内存与合成层都归零。
    if (this._thumbMode()) {
      return html`<div class="hm-spectrum hm-spectrum-flat" aria-hidden="true"></div>`;
    }
    // 频谱统一画在一张 canvas 上：宽屏约 300 根细柱也不会生成几百个
    // 独立合成层，避免逐根写 --h 触发整卡样式重算。
    return html`<canvas class="hm-spectrum" aria-hidden="true"></canvas>`;
  }

  _stopSpectrum() {
    if (this._spectrumRaf) cancelAnimationFrame(this._spectrumRaf);
    this._spectrumRaf = null;
    this._spectrumLast = 0;
    this._spectrumPaintAt = 0;
  }

  _spectrumPlaying() {
    const state = this._state()?.state;
    return state === "playing" || state === "buffering";
  }

  _resetAudioShape() {
    this._bandLevels = Object.assign([0.18, 0.14, 0.1], { live: false });
    this._bandPeaks = [0, 0, 0];
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

  _studioAvailable() {
    return Boolean(this._hass?.services?.ha_music_studio);
  }

  _studioSpectrumReady() {
    return Boolean(
      this._studioBands?.length &&
        Date.now() - this._studioAt < 1600
    );
  }

  _resampleStudioBands(count) {
    const bands = this._studioBands;
    if (!bands?.length) return null;
    if (count === bands.length) return bands.slice();
    const out = new Array(count);
    for (let index = 0; index < count; index += 1) {
      const pos = count > 1 ? (index / (count - 1)) * (bands.length - 1) : 0;
      const lo = Math.floor(pos);
      const hi = Math.min(bands.length - 1, lo + 1);
      const mix = pos - lo;
      const a = Number(bands[lo]) || 0;
      const b = Number(bands[hi]) || 0;
      out[index] = a + (b - a) * mix;
    }
    return out;
  }

  _studioBandTriplet() {
    if (
      Array.isArray(this._studioZones) &&
      this._studioZones.length === 3 &&
      this._studioZones.every((value) => Number.isFinite(Number(value)))
    ) {
      return this._studioZones.map((value) => clamp(Number(value) || 0, 0, 1));
    }
    const bands = this._studioBands;
    if (!bands?.length) return null;
    const third = bands.length / 3;
    return [0, 1, 2].map((zone) => {
      const from = Math.floor(zone * third);
      const to = Math.max(from + 1, Math.round((zone + 1) * third));
      let sum = 0;
      let n = 0;
      for (let index = from; index < Math.min(bands.length, to); index += 1) {
        sum += Number(bands[index]) || 0;
        n += 1;
      }
      return n ? sum / n : 0;
    });
  }

  // 真实频段分界由集成按 250Hz / 2000Hz 给出；缩放到当前 canvas 柱数。
  _spectrumZoneSplit(count) {
    const bands = this._studioBands?.length || 0;
    const raw = this._studioSplit;
    if (!bands || !Array.isArray(raw) || raw.length !== 2) {
      return [Math.round(count / 3), Math.round((count * 2) / 3)];
    }
    const low = clamp(Math.round((Number(raw[0]) / bands) * count), 1, count - 2);
    const mid = clamp(Math.round((Number(raw[1]) / bands) * count), low + 1, count - 1);
    return [low, mid];
  }

  _ensureStudioSpectrum() {
    if (!this._studioAvailable() || !this._eid()) return;
    const key = this._eid();
    if (this._studioKey === key && (this._studioUnsub || this._studioPending)) {
      return;
    }
    if (this._studioFailedAt && Date.now() - this._studioFailedAt < 60 * 1000) {
      return;
    }
    this._studioUnsub?.();
    this._studioUnsub = null;
    this._studioKey = key;
    this._studioPending = true;
    const connection = this._hass?.connection;
    if (!connection?.subscribeMessage) {
      this._studioPending = false;
      return;
    }
    let request;
    try {
      request = connection.subscribeMessage(
        (event) => {
          if (!event || event.type !== "spectrum" || !Array.isArray(event.bands)) {
            return;
          }
          if (!protocolMatches(event)) {
            this._studioBands = [];
            this._studioProtocolError = true;
            if (!this._studioProtocolWarned) {
              this._studioProtocolWarned = true;
              console.warn(
                `[ha-music] ha_music_studio protocol ${event.protocol} != ${PROTOCOL_VERSION}; spectrum disabled`
              );
            }
            return;
          }
          this._studioProtocolError = false;
          this._studioBands = event.bands.map((value) => clamp(Number(value) || 0, 0, 1.6));
          this._studioZones = Array.isArray(event.zones)
            ? event.zones.slice(0, 3).map((value) => clamp(Number(value) || 0, 0, 1))
            : event.zones && typeof event.zones === "object"
              ? ["low", "mid", "high"].map((key) =>
                  clamp(Number(event.zones[key]) || 0, 0, 1)
                )
              : null;
          this._studioSplit = Array.isArray(event.zone_split)
            ? event.zone_split.slice(0, 2).map((value) => Number(value) || 0)
            : null;
          this._studioPeak = Number(event.peak) || 0;
          this._studioRms = Number(event.rms) || 0;
          this._studioFrames = Number(event.frames) || 0;
          this._studioAt = Date.now();
        },
        { type: "ha_music_studio/subscribe", entity_id: key }
      );
    } catch {
      this._studioPending = false;
      this._studioFailedAt = Date.now();
      return;
    }
    Promise.resolve(request)
      .then((unsub) => {
        if (this._studioKey !== key) {
          unsub?.();
          return;
        }
        this._studioUnsub = unsub;
      })
      .catch(() => {
        this._studioFailedAt = Date.now();
      })
      .finally(() => {
        if (this._studioKey === key) this._studioPending = false;
      });
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

  _spectrumAccent() {
    const theme = THEMES[this._themeKey()] || THEMES[DEFAULT_THEME];
    const custom = String(this._config?.accent || "");
    return [
      /^#[0-9a-f]{3,8}$/i.test(custom) ? custom : theme.accent[0],
      theme.accent[1],
    ];
  }

  _syncSpectrumCanvas() {
    if (this._thumbMode()) return false;
    const canvas = this.renderRoot?.querySelector?.(".hm-spectrum");
    if (!canvas) {
      this._spectrumCanvas = null;
      this._spectrumCtx = null;
      this._spectrumCount = 0;
      return false;
    }
    // 用容器宽度量而不是 canvas 自身：canvas 的 style.width 是我们写死的 px，
    // 直接量它会把上一次（更大）的尺寸当成当前宽度，卡片缩小时频谱只画半截。
    const host = canvas.parentElement || canvas;
    const rect = host.getBoundingClientRect();
    const cssH = Math.max(1, Math.round(canvas.getBoundingClientRect().height || rect.height));
    const width = Math.max(1, Math.round(rect.width));
    const height = cssH;
    if (!width || !height) return false;
    const dpr = Math.min(
      this._isMobileUi() ? 1.5 : 2,
      Math.max(1, Number(window.devicePixelRatio) || 1)
    );
    // 预览/极小卡片不再要求高分辨率，避免 iOS WebView 为一块 4000px 宽的画布
    // 分配内存；同时给像素宽高一个上限。
    const pixelWidth = Math.min(4096, Math.round(width * dpr));
    const pixelHeight = Math.min(1024, Math.round(height * dpr));
    if (canvas.width !== pixelWidth) canvas.width = pixelWidth;
    if (canvas.height !== pixelHeight) canvas.height = pixelHeight;
    if (canvas.style.width !== "100%") canvas.style.width = "100%";
    const cssHeight = `${height}px`;
    if (canvas.style.height !== cssHeight) canvas.style.height = cssHeight;
    this._spectrumCanvas = canvas;
    let nextCtx = null;
    try {
      nextCtx = canvas.getContext("2d");
    } catch {
      nextCtx = null;
    }
    if (nextCtx !== this._spectrumCtx) {
      this._spectrumGrad = null;
      this._spectrumZoneGrads = null;
    }
    this._spectrumCtx = nextCtx;
    this._spectrumCssW = width;
    this._spectrumCssH = height;
    this._spectrumDpr = dpr;
    // 约 7px 一根细柱；用一张 canvas 承载宽屏 300 根，避免 DOM 合成层爆炸。
    const count = clamp(Math.round(width / 7), 48, 300);
    if (count !== this._spectrumCount) {
      this._spectrumCount = count;
      this._spectrumLevels = new Array(count).fill(0.12);
    }
    return true;
  }

  _spectrumZoneGradients(width, split, count, zoneGap) {
    const accent = this._spectrumAccent();
    const key = `${accent[0]}|${accent[1]}|${width}|${count}|${split[0]}|${split[1]}|${zoneGap}`;
    if (this._spectrumZoneGrads && this._spectrumZoneGradKey === key) {
      return this._spectrumZoneGrads;
    }
    const ctx = this._spectrumCtx;
    if (!ctx) return null;
    const a0 = hexToHsl(accent[0]);
    const a1 = hexToHsl(accent[1]);
    const m1 = mixHsl(a0, a1, 0.28);
    const m2 = mixHsl(a0, a1, 0.72);
    const cell = (width - zoneGap * 2) / count;
    const spans = [
      [0, split[0]],
      [split[0], split[1]],
      [split[1], count],
    ].map(([from, to], zone) => {
      const x0 = zoneGap * zone;
      const x1 = x0 + (to - from) * cell;
      return [x0, Math.max(x0 + 1, x1)];
    });
    const stops = [
      [accent[0], m1.css],
      [m1.css, m2.css],
      [m2.css, accent[1]],
    ];
    const grads = spans.map(([x0, x1], zone) => {
      const grad = ctx.createLinearGradient(x0, 0, x1, 0);
      grad.addColorStop(0, stops[zone][0]);
      grad.addColorStop(1, stops[zone][1]);
      return grad;
    });
    this._spectrumZoneGrads = grads;
    this._spectrumZoneGradKey = key;
    return grads;
  }

  _drawSpectrum(levels, idle = false) {
    const ctx = this._spectrumCtx;
    const width = this._spectrumCssW;
    const height = this._spectrumCssH;
    const dpr = this._spectrumDpr;
    const count = levels?.length || 0;
    if (!ctx || !width || !height || !count) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    // 频谱进度模式下不切开频段，保持与 seek 位置逐柱对齐。
    const fusion = this._fusionLayout() === "rail";
    const split = this._spectrumZoneSplit(count);
    // 三块之间留出窄缝，低频/中频/高频一眼可分组。
    const zoneGap = fusion ? 0 : Math.min(14, Math.max(5, width * 0.009));
    const usableWidth = Math.max(1, width - zoneGap * 2);
    const cell = usableWidth / count;
    const gap = Math.min(2.4, Math.max(1.1, cell * 0.34));
    const barWidth = Math.max(1, cell - gap);
    const radius = Math.min(1.5, barWidth / 2);
    const accent = this._spectrumAccent();
    const mobile = this._isMobileUi();
    const labelH = !fusion && height >= 34 ? 11 : 0;
    const barArea = Math.max(4, height - labelH);
    const grads = this._spectrumZoneGradients(width, split, count, zoneGap);
    const fallbackKey = `${accent[0]}|${accent[1]}|${width}`;
    if (!grads && (!this._spectrumGrad || this._spectrumGradKey !== fallbackKey)) {
      const grad = ctx.createLinearGradient(0, 0, width, 0);
      grad.addColorStop(0, accent[0]);
      grad.addColorStop(1, accent[1]);
      this._spectrumGrad = grad;
      this._spectrumGradKey = fallbackKey;
    }
    // 频谱进度模式下：已播放区域亮色跟随频谱，未播放区域压成暗色轮廓，
    // 让一根频谱条同时承担“实时响应 + 播放进度”两种语义。
    const progress = fusion ? this._fusionPercent() : -1;
    const dimColor = "rgba(126, 108, 160, 0.55)";
    const zoneStarts = [0, split[0], split[1], count];
    for (let index = 0; index < count; index += 1) {
      const zone = index < split[0] ? 0 : index < split[1] ? 1 : 2;
      const zoneIndex = index - zoneStarts[zone];
      const level = clamp(Number(levels[index]) || 0, 0.02, 1);
      const barHeight = Math.max(2, level * barArea);
      const x = zoneGap * zone + zoneIndex * cell + (cell - barWidth) / 2;
      const y = height - barHeight;
      const played =
        progress < 0 || index / Math.max(1, count - 1) <= progress + 0.002;
      ctx.fillStyle = played
        ? grads?.[zone] || this._spectrumGrad || accent[0]
        : dimColor;
      if (mobile) ctx.globalAlpha = played ? (idle ? 0.5 : 0.84) : 0.18;
      if (!mobile) ctx.globalAlpha = played
        ? idle ? 0.5 : 0.58 + level * 0.36
        : idle ? 0.14 : 0.18;
      if (!mobile && typeof ctx.roundRect === "function" && barWidth >= 3) {
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, [radius, radius, 0, 0]);
        ctx.fill();
      } else {
        ctx.fillRect(x, y, barWidth, barHeight);
      }
    }
    ctx.globalAlpha = 1;
    if (labelH) {
      const labels = String(this._hass?.language || "").toLowerCase().startsWith("zh")
        ? ["低频", "中频", "高频"]
        : ["LOW", "MID", "HIGH"];
      ctx.font = '600 7.5px "Segoe UI", "PingFang SC", system-ui, sans-serif';
      ctx.textBaseline = "top";
      ctx.fillStyle = "rgba(255, 255, 255, 0.46)";
      for (let zone = 0; zone < 3; zone += 1) {
        const span = zoneStarts[zone + 1] - zoneStarts[zone];
        if (span * cell < 34) continue;
        const x = zoneGap * zone + 2;
        ctx.fillText(labels[zone], x, 0.5);
      }
    }
  }


  _syncSpectrum() {
    const canvas = this.renderRoot?.querySelector?.(".hm-spectrum");
    if (
      !canvas ||
      this._thumbPreview ||
      !["bars", "rail"].includes(this._config?.visualizer || "bars")
    ) {
      this._spectrumCanvas = null;
      this._spectrumCtx = null;
      this._spectrumCount = 0;
      this._stopSpectrum();
      return;
    }
    if (!this._syncSpectrumCanvas()) return;
    this._observeSpectrumResize();
    const reduceMotion =
      typeof matchMedia === "function" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!this._spectrumPlaying() || reduceMotion) {
      this._stopSpectrum();
      this._applySpectrumIdle();
      return;
    }
    this._ensureStudioSpectrum();
    if (this._spectrumRaf) return;
    this._spectrumLast = 0;
    this._spectrumRaf = requestAnimationFrame((now) => this._spectrumTick(now));
  }

  // 卡片尺寸变化（编辑器预览、旋转、拖拽格）时重新量宽并重算柱数，避免频谱只画一部分。
  _observeSpectrumResize() {
    if (typeof ResizeObserver === "undefined") return;
    const canvas = this._spectrumCanvas;
    if (!canvas?.parentElement) return;
    // 观察卡片本体而不是 canvas 的父容器：回调里会写 canvas 的 style，
    // 若观察父容器，iOS Safari 可能出现 ResizeObserver 回写死循环，把 App 拖崩。
    const target = this;
    if (this._spectrumResizeObserved === target) return;
    this._spectrumResizeObserver?.disconnect();
    this._spectrumResizeObserved = target;
    this._spectrumResizeObserver = new ResizeObserver(() => {
      if (this._spectrumResizeRaf) return;
      this._spectrumResizeRaf = requestAnimationFrame(() => {
        this._spectrumResizeRaf = 0;
        if (!this._syncSpectrumCanvas()) return;
        if (!this._spectrumPlaying()) this._applySpectrumIdle();
      });
    });
    this._spectrumResizeObserver.observe(target);
  }

  _applySpectrumIdle() {
    const frame = visualizerFrame(this._readMedia());
    const count = this._spectrumCount;
    if (!count) return;
    if (this._spectrumLevels.length !== count) {
      this._spectrumLevels = new Array(count).fill(0.12);
    }
    const levels = this._spectrumLevels;
    const third = count / 3;
    for (let index = 0; index < count; index += 1) {
      const band = index < third ? 0 : index < third * 2 ? 1 : 2;
      const base = 0.12 + [0.1, 0.06, 0.03][band];
      const level = Math.min(0.24, base + frame.energy * 0.04);
      levels[index] = level;
    }
    this._drawSpectrum(levels, true);
  }

  _spectrumTick(now) {
    if (!this._spectrumCanvas || !this._spectrumCount) {
      this._stopSpectrum();
      return;
    }
    if (!this._spectrumPlaying()) {
      this._applySpectrumIdle();
      this._stopSpectrum();
      return;
    }
    if (now - (this._spectrumSizeAt || 0) > 500) {
      this._spectrumSizeAt = now;
      if (!this._syncSpectrumCanvas()) {
        this._stopSpectrum();
        return;
      }
    }
    // 手机端 30fps 足够表现频谱律动；屏幕 90/120Hz 时不做上限会成倍放大合成开销。
    if (this._isMobileUi() && this._spectrumPaintAt && now - this._spectrumPaintAt < 32) {
      this._spectrumRaf = requestAnimationFrame((nextNow) => this._spectrumTick(nextNow));
      return;
    }
    this._spectrumPaintAt = now;
    const dt = this._spectrumLast
      ? Math.min(0.05, Math.max(0.001, (now - this._spectrumLast) / 1000))
      : 0.016;
    this._spectrumLast = now;
    const media = this._readMedia();
    const frame = visualizerFrame(media);
    const key = this._trackKey(this._state());
    if (key !== this._spectrumKey) {
      this._spectrumKey = key;
      this._spectrumLevels = new Array(this._spectrumCount).fill(0.12);
    }
    this._ensureStudioSpectrum();
    const time = now / 1000;
    const levels = this._spectrumLevels;
    const count = this._spectrumCount;
    // 频谱只由 ha_music_studio 集成提供：没有任何本地 Web Audio 分析。
    const studioReady = this._studioSpectrumReady();
    const studioRaw = studioReady ? this._resampleStudioBands(count) : null;
    const studioShaped = studioRaw ? this._shapeAudioBars(studioRaw) : null;
    const studioTargets = studioShaped?.bars || null;
    const liveBands = studioReady ? this._studioBandTriplet() : null;
    if (liveBands) {
      this._bandLevels.live = true;
      for (let band = 0; band < this._bandLevels.length; band += 1) {
        const current = this._bandLevels[band] || 0;
        const target = liveBands[band] || 0;
        const attack = target > current ? 0.42 : 0.16;
        this._bandLevels[band] = current + (target - current) * attack;
      }
    } else {
      this._bandLevels.live = false;
      for (let band = 0; band < this._bandLevels.length; band += 1) {
        this._bandLevels[band] = Math.max(0.06, this._bandLevels[band] * 0.9);
      }
    }
    for (let index = 0; index < count; index += 1) {
      let target;
      if (studioTargets) {
        target = studioTargets[index];
        const zoneSplit = this._spectrumZoneSplit(count);
        const zone = index < zoneSplit[0] ? 0 : index < zoneSplit[1] ? 1 : 2;
        const drive = this._bandLevels[zone] || 0;
        // 左/中/右三块用低频/中频/高频能量做增益，保留逐柱细节，避免整段被推到天花板。
        target = clamp(target * (0.58 + drive * 0.48), 0.03, 1);
      } else {
        const band = index < count / 3 ? 0 : index < (count * 2) / 3 ? 1 : 2;
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
      // 顶部留出约 18% 余量，并用 gamma 拉开强弱差，避免整排柱子顶满、只剩细小锯齿。
      target = clamp(
        0.07 + Math.pow(clamp(target, 0, 1), 1.32) * 0.84,
        0.06,
        0.9
      );
      if (this._isMobileUi()) target = clamp(target * 1.3 + 0.02, 0.08, 0.94);
      const current = Number.isFinite(levels[index]) ? levels[index] : 0.12;
      // 真实频谱响应更快，攻击段比程序化律动更硬，回落用稍慢的释放。
      const attack = target > current ? (studioTargets ? 0.72 : 0.52) : studioTargets ? 0.22 : 0.24;
      const next = current + (target - current) * (1 - Math.exp(-attack * dt * 60));
      levels[index] = next;
    }
    this._drawSpectrum(levels);
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
      const thumb =
        normalizeArt(this._hass, item.art) ||
        fallbackCover({
          title: item.title,
          artist: item.artist,
          album: item.album,
        });
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

