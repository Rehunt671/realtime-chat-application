package com.oop.realtime_chat_app.controllers;

import com.oop.realtime_chat_app.dtos.RoomBody;
import com.oop.realtime_chat_app.models.Room;
import com.oop.realtime_chat_app.services.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;

    @PostMapping("")
    public Room createRoom(@RequestBody RoomBody roomBody) {
        return roomService.createRoom(roomBody);
    }

    @GetMapping("/{roomId}")
    public Room getRoom(@PathVariable int roomId) {
        return roomService.getRoomById(roomId);
    }

    @DeleteMapping("/{roomId}")
    public void deleteRoom(@PathVariable int roomId) {
         roomService.deleteRoomById(roomId);
    }
}
