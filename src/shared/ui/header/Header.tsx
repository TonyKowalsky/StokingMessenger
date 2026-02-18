import clsx from "clsx";
import { Avatar } from "../avatar";
import styles from "./Header.module.css";

interface HeaderProps {
  avatar?: string;
  title?: string | React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const Header = ({ avatar, title, actions, className }: HeaderProps) => {
  return (
    <div className={clsx(styles.header, className)}>
      <div className={styles.info}>
        {avatar && <Avatar avatarUrl={avatar} />}
        <div className={styles.title}>{title}</div>
      </div>
      {actions && <div className={styles.controls}>{actions}</div>}
    </div>
  );
};
