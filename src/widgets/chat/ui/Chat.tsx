import { useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  callIcon,
  logoIcon,
  menuIcon,
  notificationSound,
} from "@/shared/assets";
import styles from "./Chat.module.css";
import { MessageInput } from "@/features/messageInput";
import {
  formatDate,
  getMessages,
  groupMessagesByDate,
  Message,
} from "@/entities/message";
import { saveToLocalStorage } from "@/shared/libs";
import { Header } from "@/shared/ui/header";
import {
  BOT_ID,
  getPhoneHref,
  UserCardModal,
  UserPreview,
  type User,
  USERS,
} from "@/entities/user";
import { IconButton } from "@/shared/ui/iconButton";
import { EmojiPicker } from "@/features/emojiPicker";
import { GifPicker } from "@/features/gifPicker";
import { type GiphyGif } from "@/shared/api";

export const Chat = () => {
  const messages = useSelector(getMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const chatBot = USERS[BOT_ID];
  const [user, setUser] = useState<User>(chatBot);

  const phoneHref = useMemo(() => getPhoneHref(chatBot.phone), [chatBot.phone]);

  const handleUserClick = useCallback((user: User) => {
    setUser(user);
    setIsUserModalOpen(true);
  }, []);

  const renderEmojiPicker = useCallback(
    (
      onClick: (smile: string) => void,
      ref: React.RefObject<HTMLDivElement | null>,
    ) => <EmojiPicker onClick={onClick} ref={ref} />,
    [],
  );
  const renderGifPicker = useCallback(
    (
      onSelect: (gif: GiphyGif) => void,
      ref: React.RefObject<HTMLDivElement | null>,
    ) => <GifPicker onSelect={onSelect} ref={ref} />,
    [],
  );

  const isMounted = useRef(false);

  useEffect(() => {
    const localStorageKey = "messenger_messages";
    saveToLocalStorage(localStorageKey, messages);
  }, [messages]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if (messages.length === 0) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && !lastMessage.isMe) {
      new Audio(notificationSound).play().catch((e) => {
        console.warn("Audio playback blocked by browser:", e);
      });
    }
  }, [messages.length]);

  const groupedMessages = useMemo(
    () => groupMessagesByDate(messages),
    [messages],
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <img src={logoIcon} alt="logo" />
        <p>Messenger</p>
      </div>
      <div className={styles.chat}>
        <Header
          title={
            <UserPreview
              {...chatBot}
              onClick={() => handleUserClick(chatBot)}
              size="sm"
            />
          }
          actions={
            <>
              <IconButton
                icon={callIcon}
                alt="call"
                size={22}
                tag="a"
                href={phoneHref}
              />
              <IconButton
                icon={menuIcon}
                alt="menu"
                size={24}
                onClick={() => alert("Меню в стадии разработки")}
              />
            </>
          }
        />
        <div className={styles.messages}>
          {groupedMessages.map((group) => (
            <div key={group.date} className={styles.dateGroup}>
              <div className={styles.dateHeader}>{formatDate(group.date)}</div>
              {group.messages.map((message) => (
                <Message
                  key={message.id}
                  {...message}
                  onAvatarClick={handleUserClick}
                />
              ))}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <MessageInput
        renderEmojiPicker={renderEmojiPicker}
        renderGifPicker={renderGifPicker}
      />
      <UserCardModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        user={user}
      />
    </div>
  );
};
