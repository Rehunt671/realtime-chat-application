import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "types/user";
import { RootState } from "../store";

const initialState: User = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state = action.payload;
    },
    logout(state) {
      state = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
