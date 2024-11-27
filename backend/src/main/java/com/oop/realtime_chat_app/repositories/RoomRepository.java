package com.oop.realtime_chat_app.repositories;

import com.oop.realtime_chat_app.db.Database;
import com.oop.realtime_chat_app.models.Room;
import com.oop.realtime_chat_app.models.User;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class RoomRepository {

    private final List<Room> roomDatabase = Database.getInstance().getRoomDatabase();
    private final Map<String, User> userDatabase = Database.getInstance().getUserDatabase();

    public Room save(Room room) {
        roomDatabase.add(room);
        return room;
    }

    public Room findById(int roomId) {
        return roomDatabase.stream()
                .filter(room -> room.getId() == roomId)
                .findFirst()
                .orElse(null);
    }

    public void deleteRoomById(int roomId) {
        roomDatabase.removeIf(room -> room.getId() == roomId);
    }




}
