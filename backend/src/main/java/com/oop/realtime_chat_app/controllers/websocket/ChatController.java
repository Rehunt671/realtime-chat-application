package com.oop.realtime_chat_app.controllers.websocket;

import com.oop.realtime_chat_app.dtos.chat.SendChatMessageBody;
import com.oop.realtime_chat_app.models.Room;
import com.oop.realtime_chat_app.services.websocket.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {
    private final SimpMessageSendingOperations messagingTemplate;
    private final ChatService chatService;

    @MessageMapping("/sendChatMessage")
    public void sendChatMessage(SendChatMessageBody sendChatMessageBody){
        String username  = sendChatMessageBody.getSender();
        int roomId = sendChatMessageBody.getRoomId();
        String message = sendChatMessageBody.getText();

        Room room = chatService.sendChatMessage(username, roomId, message);
        // publish คนที่อยู่ในห้องนั้นๆ ว่ามีข้อความใหม่เข้ามาแล้ว
        messagingTemplate.convertAndSend(String.format("/topic/room/%d", roomId), room);
    }
}
