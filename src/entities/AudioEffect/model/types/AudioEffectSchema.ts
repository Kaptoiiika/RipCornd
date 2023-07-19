export const enum AudioName {
  "notification" = "notification",
  "joinToRoom" = "joinToRoom",
  "exitFromRoom" = "exitFromRoom",
}

type AudioNames = keyof typeof AudioName | AudioName
type AudioSettings = {
  muted?: boolean
  volume: number
}

export type AudioSettingsList = Record<string, AudioSettings>

export interface AudioEffectSchema {
  audioSettings: AudioSettingsList
  play: (audioName: AudioNames) => Promise<void>
  changeVolume: (audioName: AudioNames, volume: number) => void
  changeMuted: (audioName: AudioNames, mute: boolean) => void
}
