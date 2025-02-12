package com.oop.realtime_chat_app.dtos.room;


import com.oop.realtime_chat_app.models.Room;
import com.oop.realtime_chat_app.models.User;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeleteRoomBody {
    private int roomId;
    private String deletedBy;
}
