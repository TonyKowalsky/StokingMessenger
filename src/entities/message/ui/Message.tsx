import clsx from "clsx";
import styles from "./Message.module.css";
import { Avatar } from "@/shared/ui/avatar";
import { type MessageType } from "../model/types/message";
import { getFullName, type User } from "@/entities/user/@x/message";
import { CLIP_EMOJI } from "../model/constants/emojis";

interface MessageProps extends MessageType {
  onAvatarClick?: (user: User) => void;
}

export const Message = ({
  type,
  text,
  src,
  time,
  author,
  isMe,
  onAvatarClick,
}: MessageProps) => {
  const fullName = getFullName(author.firstName, author.lastName);
  const avatarUrl = author.avatarUrl ?? "";

  const renderContent = () => {
    switch (type) {
      case "image":
      case "gif":
        return <img src={src} alt="attachment" className={styles.image} />;
      case "file":
        return (
          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            className={styles.file}
          >
            {CLIP_EMOJI} Файл: {text || "скачать"}
          </a>
        );
      case "smile":
        return <span className={styles.smile}>{text}</span>;
      default:
        return <p className={styles.text}>{text}</p>;
    }
  };

  return (
    <div className={styles.wrapper}>
      <Avatar
        avatarUrl={avatarUrl}
        alt={fullName}
        onClick={() => onAvatarClick?.(author)}
      />
      <div className={clsx(styles.message, { [styles.me]: isMe })}>
        <div className={styles.header}>
          <p className={styles.author}>{isMe ? "Я" : fullName}</p>
          <p className={styles.time}>{time}</p>
        </div>
        <div>{renderContent()}</div>
      </div>
    </div>
  );
};
