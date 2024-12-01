package com.oop.realtime_chat_app.services.websocket;

import com.oop.realtime_chat_app.dtos.room.CreateRoomBody;
import com.oop.realtime_chat_app.models.ChatMessage;
import com.oop.realtime_chat_app.models.Room;
import com.oop.realtime_chat_app.models.User;
import com.oop.realtime_chat_app.repositories.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {
    private static int roomIDIncrement = 1;
    private final UserService userService;
    private final RoomRepository roomRepository;

    public static int getNextRoomId() {
        return roomIDIncrement++;
    }
    public Room createRoom(CreateRoomBody roomBody) {
        Room room = Room.builder()
                .id(getNextRoomId())
                .name(roomBody.getName())
                .createdBy(roomBody.getCreatedBy())
                .messages(new ArrayList<>())
                .build();

        room = roomRepository.save(room);

        userService.joinRoom(roomBody.getCreatedBy(), room);

        return room;
    }

    public void joinRoom(User user, Room room) {
        if (user == null || room == null) {
            throw new IllegalArgumentException("User or room cannot be null");
        }

        user.setCurrentRoom(room);
        ChatMessage userEnterMessage = ChatMessage.builder()
                .id(ChatService.getNextChatId())
                .text(user.getUsername() + " has join the room")
                .sender(user.getUsername())
                .type(ChatMessage.MessageType.JOIN)
                .build();

        List<ChatMessage> messages = room.getMessages();
        messages.add(userEnterMessage);

        System.out.println(user.getUsername() + " joining room: " + room.getName());
    }

    public void enterRoom(User user, Room room) {
        if (user == null || room == null) {
            throw new IllegalArgumentException("User or room cannot be null");
        }

        List<Room> enteredRooms = user.getEnteredRooms();
        if (!enteredRooms.contains(room)) {
            enteredRooms.add(room);
        }

        ChatMessage userEnterMessage = ChatMessage.builder()
                .id(ChatService.getNextChatId())
                .text(user.getUsername() + " has entered the room")
                .sender(user.getUsername())
                .type(ChatMessage.MessageType.ENTER)
                .build();

        List<ChatMessage> messages = room.getMessages();
        messages.add(userEnterMessage);

        System.out.println(user.getUsername() + " entered room: " + room.getName());
    }

    public Room getRoomById(int roomId) {
        return roomRepository.findById(roomId);
    }

    public void deleteRoomById(int roomId) {
        userService.leaveRoom(roomId);
        roomRepository.deleteRoomById(roomId);
    }
}
