package com.oop.realtime_chat_app.controllers;
import com.oop.realtime_chat_app.models.User;
import com.oop.realtime_chat_app.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userService.login(user.getUsername());
    }

    // Get a user by username
    @GetMapping("/get")
    public User getUser(@RequestParam String username) {
        return userService.getUser(username);
    }
}
