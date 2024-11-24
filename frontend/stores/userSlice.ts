import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/user';

interface UserState {
  user: User | null;  // User object or null if not authenticated
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
