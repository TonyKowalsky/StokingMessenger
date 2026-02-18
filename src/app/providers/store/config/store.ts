import { configureStore, type ReducersMapObject } from "@reduxjs/toolkit";
import { messageReducer } from "@/entities/message";
import { type StateSchema } from "./StateSchema";
import { socketMiddleware } from "@/features/chat";
import { giphyApi } from "@/shared/api";

function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    message: messageReducer,
    [giphyApi.reducerPath]: giphyApi.reducer,
  };

  return configureStore({
    reducer: rootReducers,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(socketMiddleware, giphyApi.middleware),
    devTools: true,
  });
}

export const store = createReduxStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
