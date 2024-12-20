package com.oop.realtime_chat_app.controllers.websocket;

import com.oop.realtime_chat_app.db.Database;
import com.oop.realtime_chat_app.dtos.room.*;
import com.oop.realtime_chat_app.models.ChatMessage;
import com.oop.realtime_chat_app.models.Room;
import com.oop.realtime_chat_app.models.User;
import com.oop.realtime_chat_app.services.websocket.RoomService;
import com.oop.realtime_chat_app.services.websocket.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.util.List;
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
        String username = enteredRoomBody.getEnteredBy();
        User user = userService.getUser(username);
        int roomId = enteredRoomBody.getRoomId();

        try {
            // Call the refactored method in RoomService
            Room room = roomService.enterRoom(user, roomId);

            // Notify the user that they entered the room
            messagingTemplate.convertAndSendToUser(username, "/topic/enterRoom", user);

            // Notify all participants in the room
            messagingTemplate.convertAndSend(String.format("/topic/room/%d", roomId), room);
        } catch (IllegalArgumentException e) {
            messagingTemplate.convertAndSendToUser(username, "/topic/error", Map.of("message", e.getMessage()));
        }
    }

    @MessageMapping("/joinRoom")
    public void joinRoom(JoinRoomBody joinedRoomBody) {
        int roomId = joinedRoomBody.getRoomId();
        String username = joinedRoomBody.getJoinedBy();
        User user = userService.getUser(username);
        Room room = roomService.getRoomById(roomId);

        // Call the refactored joinRoom method in RoomService
        roomService.joinRoom(user, room);
        // Notify the user and other participants
        messagingTemplate.convertAndSendToUser(username, "/topic/joinRoom", user);
        messagingTemplate.convertAndSend(String.format("/topic/room/%d", roomId), room);
    }

    @MessageMapping("/exitRoom")
    public void exitRoom(ExitRoomBody exitRoomBody) {
        int roomId = exitRoomBody.getRoomId();
        String username = exitRoomBody.getExitedBy();
        User user = userService.getUser(username);
        Room room = roomService.getRoomById(roomId);

        // Call the exitRoom method in RoomService
        roomService.exitRoom(user, room);
        // Notify the user and other participants
        messagingTemplate.convertAndSendToUser(username, "/topic/exitRoom", user);
        messagingTemplate.convertAndSend(String.format("/topic/room/%d", roomId), room);
    }

    @MessageMapping("/getRoom")
    @SendTo("/topic/getRoom")
    public Room getRoom(int roomId) {
        return roomService.getRoomById(roomId);
    }

    @MessageMapping("/deleteRoom")
    @SendTo("/topic/deleteRoom")
    public Map<String, User> deleteRoom(DeleteRoomBody deleteRoomBody) {
        int roomId = deleteRoomBody.getRoomId();
        String username = deleteRoomBody.getDeletedBy();

        roomService.deleteRoomById(roomId);

        Map<String, Boolean> roomDeletedMessage = Map.of(
                "status" , true
        );
        messagingTemplate.convertAndSend(String.format("/topic/room/%d", roomId), roomDeletedMessage);
        return Database.getInstance().getUserDatabase();
    }
}
