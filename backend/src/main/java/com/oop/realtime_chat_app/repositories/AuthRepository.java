package com.oop.realtime_chat_app.repositories;

import com.oop.realtime_chat_app.db.Database;
import com.oop.realtime_chat_app.models.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Map;

@Repository
public class AuthRepository {
    private final Map<String, User> userDatabase = Database.getInstance().getUserDatabase();

    public User login(String username) {
        return userDatabase.computeIfAbsent(username,
                key -> new User(key, null, new ArrayList<>()));
    }
}
