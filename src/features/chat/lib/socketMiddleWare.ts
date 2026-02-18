import type { Middleware } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { generateTime, addMessage, type MessageType } from "@/entities/message";
import { BOT_ID, USERS } from "@/entities/user";

const delay = 2000;

const chatBot = USERS[BOT_ID];

const getReply = (message: MessageType): string => {
  switch (message.type) {
    case "image":
      return "Классная фотография! 👍";
    case "file":
      return `Файл "${message.text}" получен, спасибо!`;
    case "smile":
      return "Классный смайлик! 😊";
    case "gif":
      return "О, обожаю эту гифку! 😂";
    default:
      return `Вы написали: "${message.text}"`;
  }
};

export const socketMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (addMessage.match(action) && action.payload.isMe) {
    const originalMessage = action.payload;

    setTimeout(() => {
      const reply: MessageType = {
        id: nanoid(),
        type: "text",
        text: getReply(originalMessage),
        ...generateTime(),
        author: chatBot,
        isMe: false,
      };

      store.dispatch(addMessage(reply));
    }, delay);
  }

  return result;
};
