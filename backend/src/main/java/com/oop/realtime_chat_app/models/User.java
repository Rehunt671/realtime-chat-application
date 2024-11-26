package com.oop.realtime_chat_app.models;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    private String username;
    private Room currentRoom = null;
}
