package com.oop.realtime_chat_app.dtos;

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
