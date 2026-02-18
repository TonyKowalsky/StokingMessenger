import clsx from "clsx";
import styles from "./Avatar.module.css";
import { defaultAvatar } from "../../assets";

interface AvatarProps {
  avatarUrl?: string;
  size?: number;
  alt?: string;
  onClick?: () => void;
}

export const Avatar = ({
  avatarUrl,
  size = 45,
  alt = "Avatar",
  onClick,
}: AvatarProps) => {
  const withBorder = avatarUrl ? true : false;
  const isClickable = onClick ? true : false;
  const Tag = isClickable ? "button" : "div";
  return (
    <Tag
      className={clsx(styles.avatar, {
        [styles.border]: withBorder,
      })}
      style={{ width: size, height: size, minWidth: size }}
      onClick={onClick}
    >
      <img
        src={avatarUrl ? avatarUrl : defaultAvatar}
        alt={alt}
        className={styles.img}
      />
    </Tag>
  );
};
