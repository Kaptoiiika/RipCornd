import { MainPage } from "@/pages/MainPage"
import { RoomPage } from "@/pages/RoomPage"
import {
  AppRouteProps,
  AppRoutes,
} from "@/shared/config/routeConfig/routeConfig"

export const RoutesConfig: Record<string, AppRouteProps> = {
  [AppRoutes.INDEX]: {
    element: <MainPage />,
  },

  [AppRoutes.MAIN_PAGE]: {
    element: <MainPage />,
  },

  [AppRoutes.ROOM_ID]: {
    element: <RoomPage />,
  },
}
