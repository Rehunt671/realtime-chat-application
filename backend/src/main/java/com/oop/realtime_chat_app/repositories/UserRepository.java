package com.oop.realtime_chat_app.repositories;

import com.oop.realtime_chat_app.db.Database;
import com.oop.realtime_chat_app.models.Room;
import com.oop.realtime_chat_app.models.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class UserRepository {
    private final Map<String, User> userDatabase = Database.getInstance().getUserDatabase();

    public void updateUser(User updatedUser) {
        String username = updatedUser.getUsername();
        if (userDatabase.containsKey(username)) {
            userDatabase.put(username, updatedUser);
            return;
        }
        throw new IllegalArgumentException("User not found: " + username);
    }

    public User getUser(String username) {
        return userDatabase.get(username);
    }

    public List<Room> getUserRooms(String username) {
        User user = getUser(username);
        return user.getEnteredRooms();
    }

    public void deleteJoiningRoom(int roomId) {
        for (User user : userDatabase.values()) {
            String username = user.getUsername();
            List<Room> enteredRooms = user.getEnteredRooms();
            Room currentRoom = user.getCurrentRoom();
            if(currentRoom != null && currentRoom.getId() == roomId) {
                user.setCurrentRoom(null);
            }
            enteredRooms.removeIf(room -> room.getId() == roomId);
            user.setEnteredRooms(new ArrayList<>(enteredRooms));
            if (userDatabase.containsKey(username)) {
                userDatabase.put(username, user);
            }
        }
    }

}
