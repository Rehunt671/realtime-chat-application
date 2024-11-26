package com.oop.realtime_chat_app.repositories;

import com.oop.realtime_chat_app.models.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Repository
public class UserRepository {
    private final Map<String, User> userDatabase = new HashMap<>();

    public User login(String username) {
        return userDatabase.computeIfAbsent(username,
                key -> new User(key, new ArrayList<>()));
    }

    public User getUser(String username) {
        return userDatabase.get(username);
    }
}
