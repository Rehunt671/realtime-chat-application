package com.oop.realtime_chat_app.repositories;

import com.oop.realtime_chat_app.db.Database;
import com.oop.realtime_chat_app.models.Room;
import com.oop.realtime_chat_app.models.User;
import org.springframework.stereotype.Repository;

import javax.xml.crypto.Data;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class UserRepository {
    private final Map<String, User> userDatabase = Database.getInstance().getUserDatabase();

    public User updateUser(User updatedUser) {
        String username = updatedUser.getUsername();
        if (userDatabase.containsKey(username)) {
            userDatabase.put(username, updatedUser);
            return updatedUser;
        }
        throw new IllegalArgumentException("User not found: " + username);
    }

    public User getUser(String username) {
        return userDatabase.get(username);
    }

    public List<Room> getUserRooms(String username) {
        User user = getUser(username);
        return user.getJoiningRooms();
    }
}
