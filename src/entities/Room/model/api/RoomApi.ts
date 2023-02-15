import { rtkApi } from "@/shared/api/RtkApi"
import { socketClient } from "@/shared/api/socket/socket"
import { SocketActions } from "@/shared/api/socket/actions"
import { RoomModel } from "../types/RoomSchema"
import { FormateAtributedRoom } from "../service/formateRoom"

const RoomApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getRooms: build.query({
      query: () => `/rooms`,
      transformResponse: (baseQueryReturnValue: {
        data: RoomModel[]
      }): RoomModel[] => {
        const { data } = baseQueryReturnValue
        return data.map((room) => FormateAtributedRoom(room))
      },
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        const hundleUpdateRooms = (rooms: RoomModel[]) =>
          updateCachedData(() => rooms)
        try {
          await cacheDataLoaded
          socketClient.on(SocketActions.SHARE_ROOMS, hundleUpdateRooms)
        } catch (error) {}

        await cacheEntryRemoved
        socketClient.off(SocketActions.SHARE_ROOMS, hundleUpdateRooms)
      },
    }),
  }),
})

export const useGetRooms = RoomApi.useGetRoomsQuery
