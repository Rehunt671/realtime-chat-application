package com.oop.realtime_chat_app.controllers;

import com.oop.realtime_chat_app.dtos.AuthBody;
import com.oop.realtime_chat_app.models.User;
import com.oop.realtime_chat_app.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public User login(@RequestBody AuthBody auth) {
        return authService.login(auth.getUsername());
    }
}
