import { ClientKeyPressEvent, ClientKeys } from "@/shared/types/ClientKeys"

const formatedKeys: Record<ClientKeys, string | null> = {
  ScrollLock: null,
  Pause: null,
  NumLock: null,
  ContextMenu: null,
  ControlRight: null,
  MetaLeft: null,
  AltRight: null,
  Backquote: "`",
  Digit1: "1",
  Digit2: "2",
  Digit3: "3",
  Digit4: "4",
  Digit5: "5",
  Digit6: "6",
  Digit7: "7",
  Digit8: "8",
  Digit9: "9",
  Digit0: "0",
  Minus: "-",
  Equal: "=",
  KeyQ: "q",
  KeyW: "w",
  KeyE: "e",
  KeyR: "r",
  KeyT: "t",
  KeyY: "y",
  KeyU: "u",
  KeyI: "i",
  KeyO: "o",
  KeyP: "p",
  KeyA: "a",
  KeyS: "s",
  KeyD: "d",
  KeyF: "f",
  KeyG: "g",
  KeyH: "h",
  KeyJ: "j",
  KeyK: "k",
  KeyL: "l",
  KeyZ: "z",
  KeyX: "x",
  KeyC: "c",
  KeyV: "v",
  KeyB: "b",
  KeyN: "n",
  KeyM: "m",
  BracketLeft: "[",
  BracketRight: "]",
  Backslash: "|",
  Semicolon: ";",
  Quote: "'",
  NumpadSubtract: "-",
  NumpadMultiply: "*",
  NumpadAdd: "+",
  NumpadDivide: "/",
  NumpadDecimal: ",",
  Numpad0: "numpad_0",
  Numpad1: "numpad_1",
  Numpad2: "numpad_2",
  Numpad3: "numpad_3",
  Numpad4: "numpad_4",
  Numpad5: "numpad_5",
  Numpad6: "numpad_6",
  Numpad7: "numpad_7",
  Numpad8: "numpad_8",
  Numpad9: "numpad_9",
  ShiftLeft: "shift",
  Comma: ",",
  Period: ".",
  Slash: "/",
  ShiftRight: "right_shift",
  NumpadEnter: "enter",
  ControlLeft: "control",
  AltLeft: "alt",
  ArrowUp: "up",
  ArrowRight: "right",
  ArrowDown: "down",
  ArrowLeft: "left",
  //no formated
  Escape: "escape",
  F1: "f1",
  F2: "f2",
  F3: "f3",
  F4: "f4",
  F5: "f5",
  F6: "f6",
  F7: "f7",
  F8: "f8",
  F9: "f9",
  F10: "f10",
  F11: "f11",
  F12: "f12",
  Backspace: "backspace",
  Insert: "insert",
  Home: "home",
  PageUp: "pageup",
  Tab: "tab",
  Delete: "delete",
  End: "end",
  PageDown: "pagedown",
  CapsLock: "capslock",
  Enter: "enter",
  Space: "space",
}

export const KeyHtmltoRobotJs = (keyEvent: ClientKeyPressEvent) => {
  return formatedKeys[keyEvent.code] || null
}
