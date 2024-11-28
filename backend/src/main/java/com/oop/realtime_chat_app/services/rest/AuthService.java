package com.oop.realtime_chat_app.services.rest;

import com.oop.realtime_chat_app.models.User;
import com.oop.realtime_chat_app.repositories.AuthRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthRepository authRepository;

    public User login(String username) {
        return authRepository.login(username);
    }
}
