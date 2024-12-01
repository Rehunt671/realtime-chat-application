package com.oop.realtime_chat_app.services.websocket;

import org.springframework.stereotype.Service;

@Service
public class ChatService {
    private static int chatIDIncrement = 1;

    // Method to get the next chat ID and increment the counter
    public static int getNextChatId() {
        return chatIDIncrement++;
    }
}
