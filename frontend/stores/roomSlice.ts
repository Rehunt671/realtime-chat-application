import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage } from 'types/chat_message';
import { Room} from 'types/room';
import { User } from 'types/user';

interface RoomState {
    room: Room | null; 
}

const initialState: RoomState = {
    room : null,
};

// Create the slice
const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoom(state, action: PayloadAction<Room>) {
      state.room =  action.payload;
    },
    addUser(state, action: PayloadAction<User>) {
      state.room.joiningUsers.push(action.payload);
    },
    addMessage(state, action: PayloadAction<ChatMessage>) {
      state.room.messages.push(action.payload);
    },
    clearRoom(state) {
      state =  initialState;  
    },
  },
});

export const { setRoom, addUser, addMessage, clearRoom } = roomSlice.actions;

export default roomSlice.reducer;
