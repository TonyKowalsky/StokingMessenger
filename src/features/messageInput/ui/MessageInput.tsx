import { useRef, type ReactNode } from "react";
import { useMessageInput } from "../lib/useMessageInput";
import { IconButton } from "@/shared/ui/iconButton";
import { clipIcon, emojiIcon, gifIcon, sendIcon } from "@/shared/assets";
import styles from "./MessageInput.module.css";
import { useClickOutside } from "@/shared/libs";
import { type GiphyGif } from "@/shared/api";

interface MessageInputProps {
  renderEmojiPicker?: (
    onClick: (smile: string) => void,
    ref: React.RefObject<HTMLDivElement | null>,
  ) => ReactNode;
  renderGifPicker?: (
    onSelect: (gif: GiphyGif) => void,
    ref: React.RefObject<HTMLDivElement | null>,
  ) => ReactNode;
}

export const MessageInput = ({
  renderEmojiPicker,
  renderGifPicker,
}: MessageInputProps) => {
  const {
    message,
    isEmojiPickerOpen,
    fileInputRef,
    setMessage,
    handleSendMessage,
    handleKeyDown,
    handleFileUpload,
    handleSendSmile,
    toggleEmojiPicker,
    triggerFileInput,
    isGifPickerOpen,
    handleGifSelect,
    toggleGifPicker,
  } = useMessageInput();

  const gifPickerRef = useRef<HTMLDivElement>(null);
  const gifIgnoreRef = useRef<HTMLButtonElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const emojiIgnoreRef = useRef<HTMLButtonElement>(null);

  useClickOutside({
    ref: emojiPickerRef,
    callback: () => toggleEmojiPicker(),
    enabled: isEmojiPickerOpen,
    ignoreRef: emojiIgnoreRef,
  });

  useClickOutside({
    ref: gifPickerRef,
    callback: () => toggleGifPicker(),
    enabled: isGifPickerOpen,
    ignoreRef: gifIgnoreRef,
  });

  return (
    <>
      <div className={styles.wrapper}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className={styles.hiddenInput}
        />

        {isEmojiPickerOpen &&
          renderEmojiPicker?.(handleSendSmile, emojiPickerRef)}

        {isGifPickerOpen && renderGifPicker?.(handleGifSelect, gifPickerRef)}

        <input
          type="text"
          placeholder="Введите текст..."
          className={styles.input}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div className={styles.icons}>
          <IconButton icon={clipIcon} alt="clip" onClick={triggerFileInput} />
          <IconButton
            ref={emojiIgnoreRef}
            icon={emojiIcon}
            alt="emoji"
            onClick={() => toggleEmojiPicker()}
          />
          <IconButton
            ref={gifIgnoreRef}
            icon={gifIcon}
            alt="gif"
            onClick={() => toggleGifPicker()}
          />
          <IconButton
            icon={sendIcon}
            className={styles.sendButton}
            alt="send"
            onClick={handleSendMessage}
          />
        </div>
      </div>
    </>
  );
};
