package com.oop.realtime_chat_app.models;
import lombok.*;

import java.nio.file.FileStore;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessage {
    private int chatMessageId;
    private String content;
    private String sender;
    private MessageType type;

    public enum MessageType {
        CHAT, LEAVE, JOIN , EXIT
    }
}