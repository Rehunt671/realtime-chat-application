package com.oop.realtime_chat_app.dtos.room;

import lombok.*;



@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateRoomBody {
    private String name;
    private String createdBy;
}
