package com.oop.realtime_chat_app.services;

import com.oop.realtime_chat_app.models.Room;
import com.oop.realtime_chat_app.models.User;
import com.oop.realtime_chat_app.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User updateUser(User user) {
        return userRepository.updateUser(user);
    }

    public User getUser(String username) {
        return userRepository.getUser(username);
    }

    public User joinRoom(String username, Room room) {
        User user = userRepository.getUser(username);

        List<Room> joiningRooms = user.getJoiningRooms();
        joiningRooms.add(room);

        user.setJoiningRooms(joiningRooms);

        return updateUser(user);
    }

    public List<Room> getUserRooms(String username) {
        return userRepository.getUserRooms(username);
    }
}
