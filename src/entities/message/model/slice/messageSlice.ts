import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MessageType, MessageSchema } from "../types/message";
import { BOT_ID, ME_ID, USERS } from "@/entities/user/@x/message";
import { DEFAULT_GIF } from "../constants/gif";
import { loadFromLocalStorage } from "@/shared/libs";

const localStorageKey = "messenger_messages";

const defaultMessages: MessageType[] = [
  {
    id: "1",
    type: "text",
    text: "Привет! Как дела?",
    time: "21:00:48",
    date: "2026-02-16",
    author: USERS[BOT_ID],
    isMe: false,
  },
  {
    id: "2",
    type: "image",
    src: DEFAULT_GIF,
    time: "21:00:57",
    date: "2026-02-16",
    author: USERS[BOT_ID],
    isMe: false,
  },
  {
    id: "3",
    type: "text",
    text: "Все отлично, работаю над тестовым! ))",
    time: "21:01:43",
    date: "2026-02-16",
    author: USERS[ME_ID],
    isMe: true,
  },
];

const initialState: MessageSchema = {
  messages:
    loadFromLocalStorage<MessageType[]>(localStorageKey) || defaultMessages,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageType>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage } = messageSlice.actions;
export const messageReducer = messageSlice.reducer;
