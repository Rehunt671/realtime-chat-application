package com.oop.realtime_chat_app.db;

import com.oop.realtime_chat_app.models.Room;
import com.oop.realtime_chat_app.models.User;
import lombok.Getter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
@Getter
public class Database {
    private static final Database INSTANCE = new Database();
    private final Map<String, User> userDatabase = new ConcurrentHashMap<>();
    private final List<Room> roomDatabase = Collections.synchronizedList(new ArrayList<>());

    private Database() {
    }

    public static Database getInstance() {
        return INSTANCE;
    }
}
