package com.oop.realtime_chat_app.repositories;

import com.oop.realtime_chat_app.models.User;

import java.util.HashMap;
import java.util.Map;

public class UserRepository {

    private final Map<String, User> userDatabase = new HashMap<>();

    public User upsertUser(User user) {
        userDatabase.put(user.getUsername(), user);
        return user;
    }

    public User getUser(String username) {
        return userDatabase.get(username);
    }
}
