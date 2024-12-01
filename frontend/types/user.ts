import { Room } from "./room";

export interface User {
  username: string;
  enteredRooms: Room[];
  currentRoom: Room | null;
}
