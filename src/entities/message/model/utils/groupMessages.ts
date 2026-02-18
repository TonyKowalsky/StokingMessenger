import type { MessageType } from "../types/message";

export interface MessageGroup {
  date: string;
  messages: MessageType[];
}

export const groupMessagesByDate = (
  messages: MessageType[],
): MessageGroup[] => {
  const groups: { [key: string]: MessageType[] } = {};

  messages.forEach((message) => {
    const date = message.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
  });

  return Object.keys(groups)
    .sort()
    .map((date) => ({
      date,
      messages: groups[date],
    }));
};
