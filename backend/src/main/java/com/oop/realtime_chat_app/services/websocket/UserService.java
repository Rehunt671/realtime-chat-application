package com.oop.realtime_chat_app.services.rest;
import com.oop.realtime_chat_app.models.Room;
import com.oop.realtime_chat_app.models.User;
import com.oop.realtime_chat_app.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public void updateUser(User user) {
        userRepository.updateUser(user);
    }

    public User getUser(String username) {
        return userRepository.getUser(username);
    }

    public void joinRoom(String username, Room room) {
        User user = userRepository.getUser(username);
        if (user == null) {
            throw new IllegalArgumentException("User not found: " + username);
        }

        List<Room> joiningRooms = user.getJoiningRooms();
        joiningRooms.add(room);

        user.setJoiningRooms(joiningRooms);

        updateUser(user);
    }

    public void leaveRoom(int roomId) {
        userRepository.deleteJoiningRoom(roomId);
    }

    public List<Room> getUserRooms(String username) {
        return userRepository.getUserRooms(username);
    }

}