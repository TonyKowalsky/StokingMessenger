import { Chat } from "@/widgets/chat";
import styles from "./ChatPage.module.css";

export const ChatPage = () => {
  return (
    <main className={styles.pageWrapper}>
      <Chat />
    </main>
  );
};
