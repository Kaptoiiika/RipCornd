import React, { memo, useState } from "react"
import { useGetRooms } from "../../model/api/RoomApi"
import {
  Button,
  Divider,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { AppRoutes } from "@/shared/config/routeConfig/routeConfig"
import styles from "./RoomList.module.scss"

type RoomListProps = {
  className?: string
}

export const RoomList = memo(function RoomList(props: RoomListProps) {
  const { data, isLoading } = useGetRooms({})
  const navigate = useNavigate()
  const [roomName, setRoomName] = useState("")

  const hundleCreateRoom = () => {
    navigate(AppRoutes.ROOM_ID.replace(":id", roomName))
  }

  const hundleChangeRoomName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.currentTarget.value)
  }

  return (
    <Stack gap={1}>
      <Stack direction="row" gap={1}>
        <TextField
          variant="outlined"
          value={roomName}
          onChange={hundleChangeRoomName}
        />
        <Button
          disabled={!roomName}
          onClick={hundleCreateRoom}
          variant="contained"
        >
          CreateRoom
        </Button>
      </Stack>

      <Typography variant="h5">Open rooms</Typography>
      <Stack gap={1}>
        {data?.map((room) => (
          <Link
            className={styles.roomlink}
            to={AppRoutes.ROOM_ID.replace(":id", room.name)}
            key={room.id}
          >
            {room.name}
            <Divider />
          </Link>
        ))}
        {data?.length === 0 && !isLoading && <Typography>nothing💤</Typography>}
        {isLoading && (
          <>
            <Skeleton className={styles.roomlink} animation="wave" />
            <Skeleton className={styles.roomlink} animation="wave" />
            <Skeleton className={styles.roomlink} animation="wave" />
          </>
        )}
      </Stack>
    </Stack>
  )
})
