package com.oop.realtime_chat_app.models;
import lombok.*;

import java.nio.file.FileStore;

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

    public enum MessageType {
        ENTER , JOIN, CHAT, LEAVE , EXIT
    }
}