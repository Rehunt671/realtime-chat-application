package com.oop.realtime_chat_app.dtos.chat;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SendChatMessageBody {
    private String sender;
    private String text;
    private int roomId ;
}
