package com.oop.realtime_chat_app.dtos.room;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LeaveRoomBody {
    private int roomId;
    private String leavedBy;
}
