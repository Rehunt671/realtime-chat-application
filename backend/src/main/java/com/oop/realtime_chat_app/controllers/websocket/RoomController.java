package com.oop.realtime_chat_app.controllers.websocket;

import com.oop.realtime_chat_app.db.Database;
import com.oop.realtime_chat_app.dtos.CreateRoomBody;
import com.oop.realtime_chat_app.models.Room;
import com.oop.realtime_chat_app.models.User;
import com.oop.realtime_chat_app.services.websocket.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
@RequiredArgsConstructor
public class RoomController {
    private final SimpMessageSendingOperations messagingTemplate;
    private final RoomService roomService;

    @MessageMapping("/createRoom")
    public void createRoom(CreateRoomBody roomBody) {
        String username = roomBody.getCreatedBy();
        User user = Database.getInstance().getUserDatabase().get(username);
        roomService.createRoom(roomBody);
        messagingTemplate.convertAndSendToUser(username, "topic/createRoom", user);
    }

    @MessageMapping("/getRoom")
    @SendTo("/topic/getRoom")
    public Room getRoom(int roomId) {
        return roomService.getRoomById(roomId);
    }

    @MessageMapping("/deleteRoom")
    @SendTo("/topic/deleteRoom")
    public Map<String, User> deleteRoom(int roomId) {
        roomService.deleteRoomById(roomId);
        return Database.getInstance().getUserDatabase();
    }
}
