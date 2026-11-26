// HA Music —— 常量、主题、特性位、文案

export const CARD_VERSION = "2.38.0";
export const CARD_TYPE = "ha-music";
export const CARD_NAME = "HA Music";

// HA media_player 能力位（MediaPlayerEntityFeature）
export const FEATURES = {
  PAUSE: 1,
  SEEK: 2,
  VOLUME_SET: 4,
  VOLUME_MUTE: 8,
  PREVIOUS_TRACK: 16,
  NEXT_TRACK: 32,
  TURN_ON: 128,
  TURN_OFF: 256,
  PLAY_MEDIA: 512,
  VOLUME_STEP: 1024,
  SELECT_SOURCE: 2048,
  STOP: 4096,
  CLEAR_PLAYLIST: 8192,
  PLAY: 16384,
  SHUFFLE_SET: 32768,
  SELECT_SOUND_MODE: 65536,
  BROWSE_MEDIA: 131072,
  REPEAT_SET: 262144,
  GROUPING: 524288,
  SELECT: 1048576,
};

export const DEFAULT_LAYOUT = "adaptive";
export const DEFAULT_THEME = "cyber";
export const DEFAULT_COVER = "ambient";
export const DEFAULT_VISUALIZER = "bars";


export const SFX_PRESETS = ["off", "hifi", "vocal", "bass"];

export const LAYOUTS = {
  adaptive: { en: "Adaptive", zh: "自适应" },
  full: { en: "Full", zh: "完整" },
  compact: { en: "Compact", zh: "紧凑" },
  mini: { en: "Mini", zh: "迷你" },
};

export const COVER_MODES = {
  ambient: { en: "Ambient blur", zh: "环境模糊" },
  art: { en: "Cover fill", zh: "封面铺满" },
  palette: { en: "Palette only", zh: "纯色彩" },
  none: { en: "Plain", zh: "无背景" },
};

export const VISUALIZERS = {
  bars: { en: "Live spectrum", zh: "实时频谱" },
  ring: { en: "Ring spectrum + seek", zh: "环形频谱进度" },
  rail: { en: "Spectrum seek bar", zh: "频谱进度条" },
  none: { en: "Off", zh: "关闭" },
};

export const THEMES = {
  aurora: {
    label: { en: "Aurora", zh: "极光" },
    accent: ["#2ee6c5", "#7b5cff"],
    base: "#050a12",
    glow: 1,
    grid: false,
  },
  cyber: {
    label: { en: "Cyberpunk", zh: "赛博朋克" },
    accent: ["#ff2fd0", "#22e6ff"],
    base: "#08030f",
    glow: 1.4,
    grid: true,
  },
  liquid: {
    label: { en: "Liquid Glass", zh: "液态玻璃" },
    accent: ["#a9d8ff", "#cdb6ff"],
    base: "#090c16",
    glow: 0.8,
    grid: false,
    glass: true,
  },
  velvet: {
    label: { en: "Velvet", zh: "天鹅绒" },
    accent: ["#ff7a9c", "#a86bff"],
    base: "#0d050c",
    glow: 1.15,
    grid: false,
  },
  mono: {
    label: { en: "Monochrome", zh: "黑白" },
    accent: ["#e9ecf5", "#8d95a8"],
    base: "#08090c",
    glow: 0.4,
    grid: false,
  },
  sunset: {
    label: { en: "Sunset", zh: "日落" },
    accent: ["#ffa45c", "#ff4d8d"],
    base: "#120806",
    glow: 1.1,
    grid: false,
  },
  ocean: {
    label: { en: "Ocean", zh: "海洋" },
    accent: ["#39d0ff", "#2f7bff"],
    base: "#04101c",
    glow: 0.9,
    grid: false,
  },
};

const EN = {
  play: "Play",
  pause: "Pause",
  playing: "Now playing",
  paused: "Paused",
  idle: "Standby",
  off: "Off",
  buffering: "Buffering",
  previous: "Previous track",
  next: "Next track",
  volume: "Volume",
  volumeUp: "Volume up",
  volumeDown: "Volume down",
  mute: "Mute",
  unmute: "Unmute",
  shuffle: "Shuffle",
  repeat: "Repeat",
  repeatAll: "Repeat all",
  repeatOne: "Repeat one",
  repeatOff: "Repeat off",
  source: "Source",
  soundMode: "Sound mode",
  queue: "Current playlist",
  library: "Library",
  assistant: "Music Assistant",
  playlists: "Playlists",
  playlistsEmpty: "No playlists found",
  playlistEmpty: "This playlist is empty or unavailable in Music Assistant",
  maPlayerRequired: "Playlists need a Music Assistant player",
  playlistUnavailable: "Unavailable",
  playingPlaylist: "Playing",
  openAssistant: "Open Music Assistant",
  more: "More info",
  power: "Power",
  group: "Group",
  groupLeave: "Leave group",
  loading: "Loading…",
  queueEmpty: "Queue is empty",
  queueWindow: "Showing nearby tracks only; open Music Assistant for the full queue",
  queueLimited: "Could not load the full queue. Install the Music Assistant add-on (or Mass Queue integration), or open Music Assistant for every track.",
  browseFailed: "Media library is unavailable",
  noMedia: "Nothing is playing",
  unknownArtist: "Unknown artist",
  noTitle: "No title",
  close: "Close",
  back: "Back",
  track: "Track",
  album: "Album",
  volumeEntityMissing: "Volume entity unavailable",
  seek: "Seek",
  remaining: "Toggle remaining time",
  lyrics: "Lyrics",
  lyricsLoading: "Matching lyrics…",
  lyricsNone: "No lyrics found",
  lyricsNoneHint: "Not found in Music Assistant or LRCLIB. Add a same-name .lrc beside the track, or retry.",
  lyricsError: "Lyrics unavailable",
  lyricsErrorHint: "The lyrics source is temporarily unavailable. Retry in a moment.",
  lyricsRetry: "Retry",
  lyricsOffset: "Lyric timing offset",
  lyricsInstrumental: "Instrumental · no lyrics",
  favorite: "Favorite",
  favoriteOn: "Remove from favorites",
  favoriteUnavailable: "Favorites need a track with a source URI",
  autoplay: "Autoplay",
  crossfade: "Crossfade",
  devices: "Devices & grouping",
  selectDevice: "Switch",
  addToCard: "Add to card",
  removeFromCard: "Remove from card",
  cardNeedsPlayer: "The card must keep at least one player",
  cardConfigMissing: "Could not find this card in the dashboard configuration",
  joinGroup: "Join group",
  leaveGroup: "Leave group",
  groupLeader: "Leader",
  groupMember: "In group",
  groupUnits: "devices",
  groupLeaderMissing: "Select a Music Assistant player first",
  deviceUnavailable: "No Home Assistant entity for this player",
  playersEmpty: "No players available",
  webPlayer: "This device",
  webPlayerHint: "Play audio in this browser",
  webPlayerConnect: "Connect",
  webPlayerDisconnect: "Disconnect",
  webPlayerPlayHere: "Play here",
  webPlayerConnecting: "Connecting…",
  webPlayerConnected: "This browser is ready to play",
  webPlayerWaitEntity: "Player connected; waiting for Home Assistant entity",
  queueEmpty: "Nothing queued on this player — pick a track in Music Assistant",
  mediaLost: "Source unavailable — re-authenticate the provider in MA",
  bitPerfect: "Bit-perfect",
  webPlayerExposeFailed: "Connected, but registering with Home Assistant failed",
  webPlayerExposePending: "Connected; registering with Home Assistant…",
  webPlayerFailed: "Could not start the browser player",
  webPlayerAutoFailed: "Automatic browser player connection failed",
  webPlayerRetry: "Retry",
  themeTitle: "Theme",
  soundFx: "Sound effects",
  soundFxHint: "Applies to the playing track",
  sfxOff: "Off",
  sfxHifi: "HiFi Surround",
  sfxVocal: "Clear vocal",
  sfxBass: "Deep bass",
  soundFxFailed: "Failed to change the sound effect",
  fullscreen: "Fullscreen",
  exitFullscreen: "Exit fullscreen",
  fullscreenUnsupported: "Fullscreen is not supported here",
  entitiesScrollPrev: "Scroll players left",
  entitiesScrollNext: "Scroll players right",
};

const ZH = {
  play: "播放",
  pause: "暂停",
  playing: "正在播放",
  paused: "已暂停",
  idle: "待机",
  off: "已关闭",
  buffering: "缓冲中",
  previous: "上一首",
  next: "下一首",
  volume: "音量",
  volumeUp: "增大音量",
  volumeDown: "减小音量",
  mute: "静音",
  unmute: "取消静音",
  shuffle: "随机播放",
  repeat: "循环",
  repeatAll: "列表循环",
  repeatOne: "单曲循环",
  repeatOff: "关闭循环",
  source: "音源",
  soundMode: "声音模式",
  queue: "当前播放列表",
  library: "媒体库",
  assistant: "Music Assistant",
  playlists: "播放列表",
  playlistsEmpty: "没有找到播放列表",
  playlistEmpty: "该歌单为空或曲目在 Music Assistant 中不可用",
  maPlayerRequired: "当前播放器不是 Music Assistant 播放器，请先切换到 MA 播放器",
  playlistUnavailable: "不可用",
  playingPlaylist: "开始播放",
  openAssistant: "打开 Music Assistant",
  more: "更多信息",
  power: "开关",
  group: "分组",
  groupLeave: "退出分组",
  loading: "加载中…",
  queueEmpty: "播放队列为空",
  queueWindow: "仅显示当前曲目附近；完整队列请打开 Music Assistant",
  queueLimited: "未能读取完整队列；需安装 Music Assistant 加载项（或 Mass Queue 集成），或点右上角在 Music Assistant 查看全部曲目。",
  browseFailed: "媒体库暂不可用",
  noMedia: "当前没有播放内容",
  unknownArtist: "未知艺术家",
  noTitle: "未知曲目",
  close: "关闭",
  back: "返回",
  track: "曲目",
  album: "专辑",
  volumeEntityMissing: "音量实体不可用",
  seek: "进度",
  remaining: "切换剩余时间",
  lyrics: "歌词",
  lyricsLoading: "正在匹配歌词…",
  lyricsNone: "未找到歌词",
  lyricsNoneHint: "Music Assistant 与 LRCLIB 均未收录；可在歌曲目录放置同名 .lrc 后重试。",
  lyricsError: "歌词暂不可用",
  lyricsErrorHint: "歌词来源暂时不可用，可稍后重试。",
  lyricsRetry: "重试",
  lyricsOffset: "歌词时间偏移",
  lyricsInstrumental: "纯音乐 · 无歌词",
  favorite: "收藏",
  favoriteOn: "取消收藏",
  favoriteUnavailable: "当前曲目缺少来源地址，无法收藏",
  autoplay: "自动播放",
  crossfade: "淡入淡出",
  devices: "设备与分组",
  selectDevice: "切换",
  addToCard: "加入卡片",
  removeFromCard: "移出卡片",
  cardNeedsPlayer: "卡片至少保留一个播放器",
  cardConfigMissing: "未在仪表盘配置中找到这张卡片",
  joinGroup: "加入分组",
  leaveGroup: "移出分组",
  groupLeader: "主设备",
  groupMember: "已加入",
  groupUnits: "台设备",
  groupLeaderMissing: "请先选择 Music Assistant 播放器",
  deviceUnavailable: "该播放器没有对应的 Home Assistant 实体",
  playersEmpty: "没有可用播放器",
  webPlayer: "此设备",
  webPlayerHint: "在这台设备的浏览器里播放",
  webPlayerConnect: "连接",
  webPlayerDisconnect: "断开",
  webPlayerPlayHere: "在本机播放",
  webPlayerConnecting: "正在连接…",
  webPlayerConnected: "本机浏览器已可播放",
  webPlayerWaitEntity: "播放器已连接，正在等待 Home Assistant 实体",
  queueEmpty: "这个播放器队列里没有曲目，先去 Music Assistant 里选一首",
  mediaLost: "音源不可用，请重新登录音乐提供器",
  bitPerfect: "比特完美",
  webPlayerExposeFailed: "已连接，但注册到 Home Assistant 失败",
  webPlayerExposePending: "已连接，正在注册到 Home Assistant…",
  webPlayerFailed: "本机浏览器播放器启动失败",
  webPlayerAutoFailed: "本机浏览器播放器自动连接失败",
  webPlayerRetry: "重试",
  themeTitle: "主题",
  soundFx: "音效",
  soundFxHint: "作用于正在播放的音乐",
  sfxOff: "关闭",
  sfxHifi: "模拟Hifi环绕",
  sfxVocal: "清澈人声",
  sfxBass: "重低音",
  soundFxFailed: "音效切换失败",
  fullscreen: "全屏播放",
  exitFullscreen: "退出全屏",
  fullscreenUnsupported: "当前环境不支持全屏",
  entitiesScrollPrev: "向左查看更多播放器",
  entitiesScrollNext: "向右查看更多播放器",
};

export function isChinese(language) {
  return /^zh/i.test(language || "");
}

export function translator(language) {
  const dict = isChinese(language) ? ZH : EN;
  return (key) => dict[key] ?? EN[key] ?? key;
}

export function optionLabel(options, value, language) {
  const item = options[value];
  if (!item) return value;
  return isChinese(language) ? item.zh : item.en;
}


const MEDIA_CLASS_LABELS = {
  playlist: { en: "Playlist", zh: "播放列表" },
  album: { en: "Album", zh: "专辑" },
  artist: { en: "Artist", zh: "艺术家" },
  track: { en: "Track", zh: "曲目" },
  music: { en: "Music", zh: "音乐" },
  video: { en: "Video", zh: "视频" },
  directory: { en: "Folder", zh: "文件夹" },
  image: { en: "Image", zh: "图片" },
  url: { en: "Link", zh: "链接" },
  app: { en: "App", zh: "应用" },
  genre: { en: "Genre", zh: "风格" },
};

export function mediaClassLabel(mediaClass, language) {
  if (!mediaClass) return "";
  const item = MEDIA_CLASS_LABELS[String(mediaClass).toLowerCase()];
  if (!item) return mediaClass;
  return isChinese(language) ? item.zh : item.en;
}













