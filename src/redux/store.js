import { configureStore } from "@reduxjs/toolkit";

import { musicApi } from "./services/musicAPI";
import playerReducer from "./features/playerSlice";

export const store = configureStore({
  reducer: {
    [musicApi.reducerPath]: musicApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(musicApi.middleware),
});
