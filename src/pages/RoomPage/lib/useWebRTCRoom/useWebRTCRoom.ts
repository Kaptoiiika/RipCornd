import { UserModel } from "@/entities/User"
import { socketClient } from "@/shared/api/socket/socket"
import { useRef, useEffect } from "react"
import {
  getActionDeleteConnectedUsers,
  getRoomUsers,
} from "../../model/selectors/RoomRTCSelectors"
import { useRoomRTCStore } from "../../model/store/RoomRTCStore"
import { Answer, ClientId, Ice, Offer, RTCClient } from "../RTCClient/RTCClient"

export const useWebRTCRoom = () => {
  const users = useRoomRTCStore(getRoomUsers)
  const deleteUser = useRoomRTCStore(getActionDeleteConnectedUsers)

  const usersRef = useRef(users)
  usersRef.current = users
  const deleteRef = useRef(deleteUser)
  deleteRef.current = deleteUser

  const createNewUser = (user: UserModel, createOffer?: boolean) => {
    const newUser = new RTCClient(user, createOffer)
    return newUser
  }

  const getUserById = (id: string): RTCClient | undefined => {
    const user = usersRef.current[id]
    return user
  }

  useEffect(() => {
    const initClients = (users: UserModel[]) => {
      users.map((user) => createNewUser(user, true))
    }

    const addUser = (user: UserModel) => {
      const alreadyInList = getUserById(user.id)
      if (alreadyInList) {
        console.warn(`User ${alreadyInList} is already in list`)
      }
      createNewUser(user)
    }

    const userDisconnect = (user: ClientId) => {
      getUserById(user.id)?.close()
      deleteRef.current(user.id)
    }

    const saveAnswer = (data: Answer & ClientId) => {
      const { id, answer } = data
      const user = getUserById(id)
      user?.saveAnswer(answer)
    }
    const createAnswer = (data: Offer & ClientId) => {
      const { id, offer } = data
      const user = getUserById(id)
      user?.createAnswer(offer)
    }
    const saveIce = (data: Ice & ClientId) => {
      const { id, ice } = data
      const user = getUserById(id)
      user?.saveIce(ice)
    }

    socketClient.on("users_in_room", initClients)
    socketClient.on("user_join", addUser)
    socketClient.on("user_leave", userDisconnect)

    socketClient.on("new_answer", saveAnswer)
    socketClient.on("new_offer", createAnswer)
    socketClient.on("new_ice", saveIce)

    return () => {
      socketClient.off("users_in_room", initClients)
      socketClient.off("user_join", addUser)
      socketClient.off("user_leave", userDisconnect)
      socketClient.off("new_answer", saveAnswer)
      socketClient.off("new_offer", createAnswer)
      socketClient.off("new_ice", saveIce)
      Object.values(usersRef.current).forEach((users) => users.close())
    }
  }, [])

  const handleSendMessage = (msg: string) => {
    Object.values(users).forEach((user) => {
      user.channel.sendMessage(msg)
    })
  }

  const handleSendBlob = (blob: Blob) => {
    Object.values(users).forEach((user) => {
      user.channel.sendBlob(blob)
    })
  }

  return {
    handleSendMessage,
    handleSendBlob,
  }
}
