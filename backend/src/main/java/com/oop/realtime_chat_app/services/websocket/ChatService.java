package com.oop.realtime_chat_app.services.websocket;

import com.oop.realtime_chat_app.models.ChatMessage;
import com.oop.realtime_chat_app.models.Room;
import com.oop.realtime_chat_app.repositories.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ChatService {
    private static int chatIDIncrement = 1;
    private final RoomService roomService;
    private final ChatRepository chatRepository;

    public static int getNextChatId() {
        return chatIDIncrement++;
    }


    public Room sendChatMessage(String username , int roomId, String text){

        Room room = roomService.getRoomById(roomId);

        ChatMessage chatMessage = ChatMessage.builder()
                .text(text)
                .type(ChatMessage.MessageType.CHAT)
                .sender(username)
                .datetime(LocalDateTime.now())
                .build();

       chatRepository.addChatMessageToRoom(room,chatMessage);

       return room;
    }
}
