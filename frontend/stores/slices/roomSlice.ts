import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMessage } from "types/chat_message";
import { Room } from "types/room";
import { User } from "types/user";
import { RootState } from "../store";

const initialState: Room = null;

// Create the slice
const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoom(state, action: PayloadAction<Room>) {
      state = action.payload;
    },
    addUser(state, action: PayloadAction<User>) {
      state.joiningUsers.push(action.payload);
    },
    addMessage(state, action: PayloadAction<ChatMessage>) {
      state.messages.push(action.payload);
    },
    clearRoom(state) {
      state = initialState;
    },
  },
});

export const { setRoom, addUser, addMessage, clearRoom } = roomSlice.actions;
export const selectRoom = (state: RootState) => state.room;
export default roomSlice.reducer;
