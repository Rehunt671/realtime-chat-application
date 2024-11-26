package com.oop.realtime_chat_app.models;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Room {
    private String roomId;
    private String roomName;
//    private List<User> joiningUsers = new ArrayList<>();
    private List<ChatMessage> messages = new ArrayList<>();
    private User createdBy;
}
