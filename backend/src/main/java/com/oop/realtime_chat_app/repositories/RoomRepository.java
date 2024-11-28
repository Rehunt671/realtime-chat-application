package com.oop.realtime_chat_app.repositories;

import com.oop.realtime_chat_app.db.Database;
import com.oop.realtime_chat_app.models.Room;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class RoomRepository {
    private final Map<Integer, Room> roomDatabase = Database.getInstance().getRoomDatabase();

    public Room save(Room room) {
        roomDatabase.put(room.getId(), room);
        return room;
    }

    public Room findById(int roomId) {
        return roomDatabase.get(roomId);
    }

    public void deleteRoomById(int roomId) {
        roomDatabase.remove(roomId);
    }
}
