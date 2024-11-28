package com.oop.realtime_chat_app.configs;
import com.oop.realtime_chat_app.models.ChatMessage;
import com.oop.realtime_chat_app.models.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@Slf4j
@RequiredArgsConstructor
public class WebSocketEventListener {

    private final SimpMessageSendingOperations messagingTemplate;

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        User user = (User) headerAccessor.getSessionAttributes().get("user");

        if (user != null) {
            String username = user.getUsername();
            int roomId = user.getCurrentRoom().getId();

            log.info("User disconnected: {}", username);

            var chatMessage = ChatMessage.builder()
                    .type(ChatMessage.MessageType.LEAVE)
                    .sender(username)
                    .build();

            // Publish the message to the specific room topic.
            messagingTemplate.convertAndSend(String.format("/topic/room/%d", roomId), chatMessage);
        }
    }


}