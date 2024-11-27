package com.oop.realtime_chat_app.controllers.websocket;

import com.oop.realtime_chat_app.models.Room;
import com.oop.realtime_chat_app.models.User;
import com.oop.realtime_chat_app.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class UserWebSocketController {

    private final UserService userService;

    // Endpoint to update a user
    @MessageMapping("/users/update")
    @SendTo("/topic/users")
    public User updateUser(User user) {
        return userService.updateUser(user);
    }

    // Endpoint to get user details by username
    @MessageMapping("/users/get")
    @SendTo("/topic/user-details")
    public User getUser(String username) {
        return userService.getUser(username);
    }

    // Endpoint to get rooms for a specific user
    @MessageMapping("/users/rooms")
    @SendTo("/topic/user-rooms")
    public List<Room> getUserRooms(String username) {
        return userService.getUserRooms(username);
    }
}
