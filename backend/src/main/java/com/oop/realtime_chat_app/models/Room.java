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
    private int id;
    private String name;
    private List<ChatMessage> messages = new ArrayList<>();
    private String createdBy;
}
