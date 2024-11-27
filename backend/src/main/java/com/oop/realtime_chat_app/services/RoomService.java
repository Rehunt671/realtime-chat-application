package com.oop.realtime_chat_app.services;

import com.oop.realtime_chat_app.dtos.RoomBody;
import com.oop.realtime_chat_app.exceptions.room.RoomNotFoundException;
import com.oop.realtime_chat_app.models.Room;
import com.oop.realtime_chat_app.repositories.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoomService {
    private static int roomIDIncrement = 1;
    private final UserService userService;
    private final RoomRepository roomRepository;

    public Room createRoom(RoomBody roomBody) {
        Room room = Room.builder()
                .id(roomIDIncrement++)
                .name(roomBody.getName())
                .createdBy(roomBody.getCreatedBy())
                .build();

        room = roomRepository.save(room);

        userService.joinRoom(roomBody.getCreatedBy(), room);

        return room;
    }

    public Room getRoomById(int roomId) {
        return roomRepository.findById(roomId);
    }

    public void deleteRoomById(int roomId) {
        userService.leaveRoom(roomId);
        roomRepository.deleteRoomById(roomId);
    }
}
