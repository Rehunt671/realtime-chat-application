import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';  // Correct import for the user slice reducer
import roomReducer from './roomSlice';  // Correct import for the user slice reducer

const store = configureStore({
  reducer: {
    user: userReducer,  // Use the reducer key 'user' to access the user state
    room: roomReducer,  // Use the reducer key 'user' to access the user state
  },
});

export default store;
