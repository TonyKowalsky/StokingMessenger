import clsx from "clsx";
import styles from "./UserPreview.module.css";
import { Avatar } from "@/shared/ui/avatar";
import { getFullName } from "../../model/utils/getFullName";

interface UserPreviewProps {
  avatarUrl?: string;
  firstName: string;
  lastName: string;
  position?: string;
  onClick?: () => void;
  size: "sm" | "lg";
}

export const UserPreview = ({
  avatarUrl,
  firstName,
  lastName,
  position,
  onClick,
  size = "lg",
}: UserPreviewProps) => {
  const fullName = getFullName(firstName, lastName);
  return (
    <div className={clsx(styles.userInfo, styles[size])}>
      <Avatar
        size={size === "sm" ? 45 : 90}
        avatarUrl={avatarUrl}
        alt={fullName}
        onClick={onClick}
      />
      <div className={clsx(styles.userInfoText, styles[size])}>
        <p className={clsx(styles.name, styles[size])}>{fullName}</p>
        {position && (
          <p className={clsx(styles.position, styles[size])}>{position}</p>
        )}
      </div>
    </div>
  );
};
