package com.oop.realtime_chat_app.models;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessage {
    private int id;
    private String text;
    private String sender;
    private MessageType type;
    private LocalDateTime datetime = LocalDateTime.now();

    public enum MessageType {
        CREATE, ENTER, JOIN, CHAT, LEAVE, EXIT
    }
}
