import React from "react";
import style from "./Chat.module.css";
const Chat = ({ messages }) => {
  return (
    <ul>
      {messages.map((message) => (
        <li key={message.idMessage}>
          <div>Отправитель:{message.senderName}</div>
          <div>Сообщение: {message.textMessage}</div>
        </li>
      ))}
    </ul>
  );
};

export default Chat;
