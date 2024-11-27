import { Room } from "./room";

export interface User {
  username: string;
  joiningRooms: Room[];
  currentRoom: Room | null;
}
