package com.oop.realtime_chat_app.configs;
import com.oop.realtime_chat_app.models.ChatMessage;
import com.oop.realtime_chat_app.models.Room;
import com.oop.realtime_chat_app.models.User;
import com.oop.realtime_chat_app.services.websocket.RoomService;
import com.oop.realtime_chat_app.services.websocket.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class WebSocketEventListener {

    private final SimpMessageSendingOperations messagingTemplate;
    private final UserService userService;
    private final RoomService roomService;
    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");

        if (username != null) {
            User user = userService.getUser(username);
            int currentUserRoomId = user.getCurrentRoom().getId();
            Room room = roomService.getRoomById(currentUserRoomId);
            List<ChatMessage> chatMessages = room.getMessages();
            log.info("User disconnected: {}", username);

            var leaveMessage = ChatMessage.builder()
                    .text(user.getUsername() + " has leaved the room")
                    .type(ChatMessage.MessageType.LEAVE)
                    .sender(username)
                    .build();

            chatMessages.add(leaveMessage);

            messagingTemplate.convertAndSend(String.format("/topic/room/%d", currentUserRoomId), room);
        }
    }
}