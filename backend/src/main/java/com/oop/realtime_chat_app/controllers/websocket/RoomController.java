package com.oop.realtime_chat_app.controllers.websocket;

import com.oop.realtime_chat_app.db.Database;
import com.oop.realtime_chat_app.dtos.room.CreateRoomBody;
import com.oop.realtime_chat_app.dtos.room.EnterRoomBody;
import com.oop.realtime_chat_app.dtos.room.JoinRoomBody;
import com.oop.realtime_chat_app.models.Room;
import com.oop.realtime_chat_app.models.User;
import com.oop.realtime_chat_app.services.websocket.RoomService;
import com.oop.realtime_chat_app.services.websocket.UserService;
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
    private final UserService userService;

    @MessageMapping("/createRoom")
    public void createRoom(CreateRoomBody createdRoomBody) {
        String username = createdRoomBody.getCreatedBy();
        User user = userService.getUser(username);
        roomService.createRoom(createdRoomBody);
        messagingTemplate.convertAndSendToUser(username, "/topic/createRoom", user);
    }

    @MessageMapping("/enterRoom")
    public void enterRoom(EnterRoomBody enteredRoomBody) {
        //หา User เพื่อจะนำ User enter เข้าห้องแชทจากการ ใช้ room ID
        String username = enteredRoomBody.getEnteredBy();
        User user = userService.getUser(username);
        //หาห้องเพื่อจะนำ User เข้าห้องแชท
        int roomId = enteredRoomBody.getRoomId();
        Room room = roomService.getRoomById(roomId);
        roomService.enterRoom(user,room);
        //publish ตัวเองว่า Enter ห้องใหม่แล้ว
        messagingTemplate.convertAndSendToUser(username, "/topic/enterRoom", user);
        // publish คนที่อยู่ในห้องนั้นๆ ว่ามีคนใหม่เข้ามาแล้ว
        messagingTemplate.convertAndSend(String.format("/topic/room/%d", roomId), room);
    }
    @MessageMapping("/joinRoom")
    public void joinRoom(JoinRoomBody joinedRoomBody) {
        //หา User เพื่อจะนำ User เพื่อเข้าร่วมการแชท
        String username = joinedRoomBody.getJoinedBy();
        User user = userService.getUser(username);
        //หาห้องเพื่อจะนำ User เข้าห้องแชท
        int roomId = joinedRoomBody.getRoomId();
        Room room = roomService.getRoomById(roomId);
        roomService.joinRoom(user,room);
        //publish ตัวเองว่า Enter ห้องใหม่แล้ว
        messagingTemplate.convertAndSendToUser(username, "/topic/joinRoom", user);
        // publish คนที่อยู่ในห้องนั้นๆ ว่ามีคนใหม่เข้ามาแล้ว
        messagingTemplate.convertAndSend(String.format("/topic/room/%d", roomId), room);
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
