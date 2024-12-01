package com.oop.realtime_chat_app.dtos.user;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetUserBody {
    String username;
}
