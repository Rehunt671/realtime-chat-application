package com.oop.realtime_chat_app.repositories;


import com.oop.realtime_chat_app.models.ChatMessage;
import com.oop.realtime_chat_app.models.Room;
import org.springframework.stereotype.Repository;

@Repository
public class ChatRepository {
    public void addChatMessageToRoom(Room room , ChatMessage chatMessage){
        room.getMessages().add(chatMessage);
    }
}
