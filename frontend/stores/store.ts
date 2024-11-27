import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"; // Correct import for the user slice reducer
import roomReducer from "./slices/roomSlice"; // Correct import for the user slice reducer
import loadingReducer from "./slices/loadingSlice"; // Correct import for the user slice reducer
import websocketReducer from "./slices/websocketSlice"; // Correct import for the user slice reducer

const store = configureStore({
  reducer: {
    user: userReducer, // Use the reducer key 'user' to access the user state
    room: roomReducer, // Use the reducer key 'user' to access the user state
    loading: loadingReducer, // Adding the loading slice to the store
    websocket: websocketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
