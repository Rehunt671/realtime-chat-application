package com.oop.realtime_chat_app.services;

import com.oop.realtime_chat_app.models.User;
import com.oop.realtime_chat_app.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    public User upsertUser(User user) {
        return userRepository.upsertUser(user);
    }

    public User getUser(String username) {
        return userRepository.getUser(username);
    }
}
