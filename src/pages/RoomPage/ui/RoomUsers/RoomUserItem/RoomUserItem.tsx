import { RTCClient } from "@/entities/RTCClient"
import { classNames } from "@/shared/lib/classNames/classNames"
import { UserAvatar, UserAvatarStatus } from "@/shared/ui/UserAvatar/UserAvatar"
import {
  Typography,
  IconButton,
  Menu,
  Slider,
  Stack,
  Tooltip,
} from "@mui/material"
import { useEffect, useRef, useState } from "react"
import styles from "./RoomUserItem.module.scss"

type RoomUserItemProps = {
  client: RTCClient
}

const getUserStatusOnConnectionState = (
  connectionsState?: RTCIceConnectionState
): UserAvatarStatus => {
  switch (connectionsState) {
    case "completed":
    case "connected":
      return "online"
    case "checking":
    case "new":
      return "idle"
    case "closed":
    case "disconnected":
    case "failed":
    default:
      return "offline"
  }
}

export const RoomUserItem = (props: RoomUserItemProps) => {
  const { client } = props
  const [status, setStatus] = useState(
    getUserStatusOnConnectionState(client.peer?.iceConnectionState)
  )
  const microphoneStream = client.media.remoteStream.microphone
  const [, update] = useState(0)
  const [microphoneStreamVolume, setMicroVolume] = useState(
    microphoneStream?.volume ?? 1
  )

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const audioRef = useRef<HTMLAudioElement | null>(new Audio())

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    const fn = () => {
      setStatus(getUserStatusOnConnectionState(client.peer?.iceConnectionState))
    }
    client.on("iceconnectionStatusChange", fn)
    return () => {
      client.off("iceconnectionStatusChange", fn)
    }
  }, [client])

  useEffect(() => {
    const fn = () => {
      update((prev) => prev + 1)
    }
    client.media.on("newstream", fn)
    return () => {
      client.media.off("newstream", fn)
    }
  }, [client])

  const username = client.user?.username || client.id

  useEffect(() => {
    if (microphoneStream && audioRef.current) {
      audioRef.current.srcObject = microphoneStream.stream
      audioRef.current.volume = microphoneStream.volume
      audioRef.current.play()
    }
  }, [microphoneStream])

  useEffect(() => {
    if (microphoneStream && audioRef.current) {
      microphoneStream.volume = microphoneStreamVolume
      audioRef.current.volume = microphoneStreamVolume
    }
  }, [microphoneStream, microphoneStreamVolume])

  const handleChangeVolume = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    if (typeof value === "number") {
      setMicroVolume(value)
    }
  }

  const formatedMicroVolume = (microphoneStreamVolume * 100).toFixed(0)
  return (
    <>
      <Tooltip title={username} describeChild>
        <IconButton
          sx={{ p: 0 }}
          onContextMenu={handleClick}
          onClick={handleClick}
          aria-label={username}
        >
          <UserAvatar
            className={classNames("", {
              [styles.micOnline]: !!microphoneStream?.isOpen,
            })}
            key={client.id}
            alt={username}
            status={status}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        keepMounted
        disablePortal
      >
        <Stack className={styles.menu}>
          <Typography variant="h6">{username}</Typography>
          <Typography>Volume: {formatedMicroVolume}</Typography>
          <Slider
            aria-label="microphone volume"
            value={microphoneStreamVolume}
            onChange={handleChangeVolume}
            step={0.01}
            min={0}
            max={1}
          />
        </Stack>
      </Menu>
    </>
  )
}
