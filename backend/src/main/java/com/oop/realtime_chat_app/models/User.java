package com.oop.realtime_chat_app.models;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    private String username;
    private Room currentRoom;
    private List<Room> joiningRooms = new ArrayList<>();
}
