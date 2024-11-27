package com.oop.realtime_chat_app.controllers;
import com.oop.realtime_chat_app.models.Room;
import com.oop.realtime_chat_app.models.User;
import com.oop.realtime_chat_app.services.RoomService;
import com.oop.realtime_chat_app.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PutMapping("")
    public User updateUser(@RequestBody User user){
        return userService.updateUser(user);
    }
    @GetMapping("")
    public User getUser(@RequestParam String username) {
        return userService.getUser(username);
    }

    @GetMapping("/rooms")
    public List<Room> getUserRooms(@RequestParam String username) {
        return userService.getUserRooms(username);
    }
}
