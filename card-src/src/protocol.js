// Wire protocol shared with ha_music_studio. Keep this value in sync with
// custom_components/ha_music_studio/protocol.py.
export const PROTOCOL_VERSION = 1;

export function protocolMatches(event) {
  return Number(event?.protocol) === PROTOCOL_VERSION;
}

export function protocolErrorText(language) {
  if (String(language || "").toLowerCase().startsWith("zh")) {
    return "后端协议不匹配，请更新 HA Music Studio";
  }
  return "Backend protocol mismatch. Update HA Music Studio.";
}
