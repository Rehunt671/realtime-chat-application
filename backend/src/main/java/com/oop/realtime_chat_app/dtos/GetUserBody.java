package com.oop.realtime_chat_app.dtos;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetUserBody {
    String username;
}
