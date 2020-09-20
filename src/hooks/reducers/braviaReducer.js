import MQTT from "@/lib/MQTT";

const codes = [
  "*AD",
  "ActionMenu",
  "Analog",
  "Analog2",
  "AnalogRgb1",
  "AndroidMenu",
  "Assists",
  "Audio",
  "AudioMixDown",
  "AudioMixUp",
  "BS",
  "BSCS",
  "Blue",
  "CS",
  "ChannelDown",
  "ChannelUp",
  "ClosedCaption",
  "Component1",
  "Component2",
  "Confirm",
  "CursorDown",
  "CursorLeft",
  "CursorRight",
  "CursorUp",
  "DOT",
  "DUX",
  "Ddata",
  "DemoMode",
  "DemoSurround",
  "Digital",
  "DigitalToggle",
  "Display",
  "Down",
  "DpadCenter",
  "EPG",
  "Enter",
  "Exit",
  "FeaturedApp",
  "FeaturedAppVOD",
  "FlashMinus",
  "FlashPlus",
  "FootballMode",
  "Forward",
  "GGuide",
  "GooglePlay",
  "Green",
  "Hdmi1",
  "Hdmi2",
  "Hdmi3",
  "Hdmi4",
  "Help",
  "Home",
  "Input",
  "Jump",
  "Left",
  "Media",
  "MediaAudioTrack",
  "Mode3D",
  "Mute",
  "Netflix",
  "Next",
  "Num0",
  "Num1",
  "Num11",
  "Num12",
  "Num2",
  "Num3",
  "Num4",
  "Num5",
  "Num6",
  "Num7",
  "Num8",
  "Num9",
  "OneTouchTimeRec",
  "OneTouchView",
  "Options",
  "PAP",
  "Pause",
  "PhotoFrame",
  "PicOff",
  "PictureMode",
  "PictureOff",
  "Play",
  "PopUpMenu",
  "PowerOff",
  "Prev",
  "Rec",
  "Red",
  "Return",
  "Rewind",
  "Right",
  "ShopRemoteControlForcedDynamic",
  "Sleep",
  "SleepTimer",
  "Stop",
  "SubTitle",
  "SyncMenu",
  "Teletext",
  "TenKey",
  "TopMenu",
  "Tv",
  "TvAnalog",
  "TvAntennaCable",
  "TvInput",
  "TvPower",
  "TvSatellite",
  "Tv_Radio",
  "Up",
  "Video1",
  "Video2",
  "VolumeDown",
  "VolumeUp",
  "WakeUp",
  "Wide",
  "WirelessSubwoofer",
  "Yellow",
  "iManual",
];

const commandMap = (() => {
  const m = {};
  for (const code of codes) {
    m[code.toLowerCase()] = code;
  }
  return m;
})();

export default (state, action) => {
  const { type } = action,
    device = state.device,
    hostname = device,
    status_topic = "bravia/" + hostname + "/status/",
    set_topic = status_topic.replace("status", "set") + "command";

  const command = commandMap[action.type.toLowerCase()];
  if (command) {
    MQTT.publish(set_topic, command);
    return state;
  }

  switch (type.toLowerCase) {
    default:
      console.error("useBravia reducer invalid action", action.type);
  }

  //
  return state;
};
