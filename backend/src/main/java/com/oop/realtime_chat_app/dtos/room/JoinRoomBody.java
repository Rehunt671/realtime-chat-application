package com.oop.realtime_chat_app.dtos.room;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JoinRoomBody {
    private int roomId;
    private String joinedBy;
}
