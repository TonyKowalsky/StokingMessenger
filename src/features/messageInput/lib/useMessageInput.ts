import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { addMessage, generateTime } from "@/entities/message";
import type { GiphyGif } from "@/shared/api";
import { ME_ID, USERS } from "@/entities/user";
import { MAX_FILE_SIZE } from "../model/constants/messageConstants";

export const useMessageInput = () => {
  const [message, setMessage] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isGifPickerOpen, setIsGifPickerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const me = USERS[ME_ID];

  const handleGifSelect = (gif: GiphyGif) => {
    dispatch(
      addMessage({
        id: nanoid(),
        type: "gif",
        text: gif.title,
        src: gif.images.original.url,
        ...generateTime(),
        author: me,
        isMe: true,
      }),
    );
    setIsGifPickerOpen(false);
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    dispatch(
      addMessage({
        id: nanoid(),
        type: "text",
        text: message,
        ...generateTime(),
        author: me,
        isMe: true,
      }),
    );
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const createdUrls = useRef<string[]>([]);

  useEffect(() => {
    return () => {
      createdUrls.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert(`Файл слишком большой. Максимум 10MB`);
      e.target.value = "";
      return;
    }

    const type = file.type.startsWith("image/") ? "image" : "file";
    const blobUrl = URL.createObjectURL(file);
    createdUrls.current.push(blobUrl);

    dispatch(
      addMessage({
        id: nanoid(),
        type,
        text: file.name,
        src: blobUrl,
        ...generateTime(),
        author: me,
        isMe: true,
      }),
    );

    e.target.value = "";
  };

  const handleSendSmile = (smile: string) => {
    dispatch(
      addMessage({
        id: nanoid(),
        type: "smile",
        text: smile,
        ...generateTime(),
        author: me,
        isMe: true,
      }),
    );
    setIsEmojiPickerOpen(false);
  };

  const toggleEmojiPicker = () => setIsEmojiPickerOpen(!isEmojiPickerOpen);
  const toggleGifPicker = () => setIsGifPickerOpen(!isGifPickerOpen);
  const triggerFileInput = () => fileInputRef.current?.click();

  return {
    message,
    isEmojiPickerOpen,
    isGifPickerOpen,
    fileInputRef,
    setMessage,
    handleSendMessage,
    handleKeyDown,
    handleFileUpload,
    handleGifSelect,
    handleSendSmile,
    toggleEmojiPicker,
    toggleGifPicker,
    triggerFileInput,
  };
};
