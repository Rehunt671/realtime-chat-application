package com.oop.realtime_chat_app.controllers.websocket;

import com.oop.realtime_chat_app.db.Database;
import com.oop.realtime_chat_app.models.Room;
import com.oop.realtime_chat_app.models.User;
import com.oop.realtime_chat_app.services.websocket.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @MessageMapping("/updateUser")
    @SendTo("/topic/updateUser")
    public User updateUser(User user) {
        userService.updateUser(user);
        return user;
    }

    @MessageMapping("/getUser")
    @SendTo("/topic/getUser")
    public Map<String, User> getUser() {
        return Database.getInstance().getUserDatabase();
    }

    @MessageMapping("/getUserRooms")
    @SendTo("/topic/userRooms")
    public List<Room> getUserRooms(String username) {
        return userService.getUserRooms(username);
    }
}
