package com.oop.realtime_chat_app.repositories;

import com.oop.realtime_chat_app.models.Room;
import com.oop.realtime_chat_app.models.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Repository
public class RoomRepository {

    private List<Room> rooms = new ArrayList<>();

    public Room save(Room room) {
        rooms.add(room);
        return room;
    }

    public Optional<Room> findById(String roomId) {
        return rooms.stream()
                .filter(room -> room.getRoomId().equals(roomId))
                .findFirst();
    }

}
