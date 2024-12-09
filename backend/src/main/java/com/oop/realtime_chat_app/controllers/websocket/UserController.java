package com.oop.realtime_chat_app.controllers.websocket;

import com.oop.realtime_chat_app.dtos.user.GetUserBody;
import com.oop.realtime_chat_app.models.Room;
import com.oop.realtime_chat_app.models.User;
import com.oop.realtime_chat_app.services.websocket.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class UserController {
    private final SimpMessageSendingOperations messagingTemplate;
    private final UserService userService;

    @MessageMapping("/updateUser")
    public void updateUser(User user) {
        String username = user.getUsername();
        userService.updateUser(user);
        messagingTemplate.convertAndSendToUser(username, "/topic/updateUser", user);
    }



    @MessageMapping("/getMe")
    @SendToUser("/topic/getMe")
    public void getMe(GetUserBody getUserBody) {
        String username = getUserBody.getUsername();
        User user = userService.getUser(username);
        if (user == null) {
            messagingTemplate.convertAndSendToUser(username, "/topic/getMe", Map.of("error", "User not found"));
            return;
        }
        messagingTemplate.convertAndSendToUser(username, "/topic/getMe", user);
    }

    @MessageMapping("/getUserRooms")
    @SendTo("/topic/userRooms")
    public List<Room> getUserRooms(String username) {
        return userService.getUserRooms(username);
    }
}
