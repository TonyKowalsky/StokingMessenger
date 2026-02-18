import { EMOJIS } from "@/entities/message";
import styles from "./EmojiPicker.module.css";
import { forwardRef } from "react";

interface EmojiPickerProps {
  onClick: (emoji: string) => void;
}

export const EmojiPicker = forwardRef<HTMLDivElement, EmojiPickerProps>(
  ({ onClick }, ref) => {
    return (
      <div
        className={styles.emojiPicker}
        onClick={e => e.stopPropagation()}
        ref={ref}
      >
        {EMOJIS.map(emoji => (
          <button
            key={emoji}
            className={styles.emojiItem}
            onClick={() => onClick(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    );
  },
);
