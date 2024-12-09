import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"; // Correct import for the user slice reducer
import loadingReducer from "./slices/loadingSlice"; // Correct import for the user slice reducer
import webSocketReducer from "./slices/webSocketSlice"; // Correct import for the user slice reducer

const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
    websocket: webSocketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
