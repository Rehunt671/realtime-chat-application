package com.oop.realtime_chat_app.services.websocket;

import com.oop.realtime_chat_app.dtos.room.CreateRoomBody;
import com.oop.realtime_chat_app.models.ChatMessage;
import com.oop.realtime_chat_app.models.Room;
import com.oop.realtime_chat_app.models.User;
import com.oop.realtime_chat_app.repositories.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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

    public void createRoom(CreateRoomBody roomBody) {
        // Validate the input
        if (roomBody == null || roomBody.getName() == null || roomBody.getCreatedBy() == null) {
            throw new IllegalArgumentException("Invalid roomBody: Name and CreatedBy are required.");
        }

        // Create the initial message for the room creation
        ChatMessage createRoomMessage = ChatMessage.builder()
                .id(ChatService.getNextChatId())
                .text(roomBody.getName() + " has been created")
                .type(ChatMessage.MessageType.CREATE)
                .datetime(LocalDateTime.now())
                .build();

        // Create the room and associate the message
        Room room = Room.builder()
                .id(getNextRoomId())
                .name(roomBody.getName())
                .createdBy(roomBody.getCreatedBy())
                .messages(new ArrayList<>()) // Initialize empty message list
                .build();

        // Add the initial message to the room's messages
        room.getMessages().add(createRoomMessage);

        // Persist the room
        room = roomRepository.save(room);

        // Let the user join the room
        userService.joinRoom(roomBody.getCreatedBy(), room);
    }


    public void joinRoom(User user, Room room) {
        if (user == null || room == null) {
            throw new IllegalArgumentException("User or room cannot be null");
        }

        user.setCurrentRoom(room);
        ChatMessage userEnterMessage = ChatMessage.builder()
                .id(ChatService.getNextChatId())
                .sender(user.getUsername())
                .datetime(LocalDateTime.now())
                .type(ChatMessage.MessageType.JOIN)
                .build();

        List<ChatMessage> messages = room.getMessages();
        messages.add(userEnterMessage);

        System.out.println(user.getUsername() + " joining room: " + room.getName());
    }

    public void exitRoom(User user , Room room){
        if (user == null || room == null) {
            throw new IllegalArgumentException("User or room cannot be null");
        }
        userService.leaveRoom(room.getId());
        ChatMessage exitRoomMessage = ChatMessage.builder()
                .id(ChatService.getNextChatId())
                .sender(user.getUsername())
                .datetime(LocalDateTime.now())
                .type(ChatMessage.MessageType.EXIT)
                .build();
        List<ChatMessage> messages = room.getMessages();
        messages.add(exitRoomMessage);
        System.out.println(user.getUsername() + " exit room: " + room.getName());
    }


    public Room enterRoom(User user, int roomId) {
        Room room = getRoomById(roomId);
        validateUserAndRoom(user, room);
        addRoomToUser(user, room);
        ChatMessage userEnterMessage = ChatMessage.builder()
                .id(ChatService.getNextChatId())
                .text(user.getUsername() + " has entered the room")
                .sender(user.getUsername())
                .type(ChatMessage.MessageType.ENTER)
                .build();

        room.getMessages().add(userEnterMessage);
        System.out.println(user.getUsername() + " entered room: " + room.getName());
        return room;
    }

    private void validateUserAndRoom(User user, Room room) {
        if (user == null || room == null) {
            throw new IllegalArgumentException("User or room cannot be null");
        }
    }

    private void addRoomToUser(User user, Room room) {
        List<Room> enteredRooms = user.getEnteredRooms();
        if (!enteredRooms.contains(room)) {
            enteredRooms.add(room);
        }
    }

    public Room getRoomById(int roomId) {
        return roomRepository.findById(roomId);
    }

    public void deleteRoomById(int roomId) {
        userService.leaveRoom(roomId);
        roomRepository.deleteRoomById(roomId);
    }

}
