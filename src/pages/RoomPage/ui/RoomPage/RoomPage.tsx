import { PageWrapper } from "@/widgets/Page"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { socketClient } from "@/shared/api/socket/socket"
import { RoomLobby } from "../RoomLobby/RoomLobby"
import { useUserStore } from "@/entities/User"
import { useRoomRTCStore } from "../../model/store/RoomRTCStore"

const joinToRoom = (id: string) => {
  const username = useUserStore.getState().localUser.username
  socketClient.emit("join", {
    name: id,
    username: username,
  })

  return () => {
    useRoomRTCStore.getState().close()
    socketClient.emit("leave", { name: id })
  }
}

export const RoomPage = () => {
  const { id = "" } = useParams()

  useEffect(() => joinToRoom(id), [id])

  return (
    <PageWrapper>
      <RoomLobby />
    </PageWrapper>
  )
}
