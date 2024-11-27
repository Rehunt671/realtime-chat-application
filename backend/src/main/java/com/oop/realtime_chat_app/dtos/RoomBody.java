package com.oop.realtime_chat_app.dtos;

import com.oop.realtime_chat_app.models.User;
import lombok.*;



@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoomBody {
    private String name;
    private String createdBy;
}
