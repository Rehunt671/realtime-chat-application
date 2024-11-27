package com.oop.realtime_chat_app.db;

import com.oop.realtime_chat_app.models.User;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class Database {
    private static final Database INSTANCE = new Database();
    private final Map<String, User> userDatabase = new ConcurrentHashMap<>();

    private Database() {
        // Private constructor to prevent instantiation
    }

    public static Database getInstance() {
        return INSTANCE;
    }

    public Map<String, User> getUserDatabase() {
        return userDatabase;
    }
}
