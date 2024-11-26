import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"; // Correct import for the user slice reducer
import roomReducer from "./slices/roomSlice"; // Correct import for the user slice reducer

const store = configureStore({
  reducer: {
    user: userReducer, // Use the reducer key 'user' to access the user state
    room: roomReducer, // Use the reducer key 'user' to access the user state
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
