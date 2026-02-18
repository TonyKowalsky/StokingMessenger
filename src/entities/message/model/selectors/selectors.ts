import type { MessageSchema } from "../types/message";

export const getMessages = (state: { message: MessageSchema }) =>
  state.message.messages;
