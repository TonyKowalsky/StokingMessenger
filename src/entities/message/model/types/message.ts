import type { User } from "@/entities/user/@x/message";

export type MessageVariant = "text" | "image" | "file" | "gif" | "smile";

export interface MessageType {
  id: string;
  type: MessageVariant;
  text?: string;
  src?: string;
  time: string;
  date: string;
  author: User;
  isMe: boolean;
}
export interface MessageSchema {
  messages: MessageType[];
}
