import styles from "./UserCard.module.css";
import { callIcon, closeIcon } from "@/shared/assets";
import { Header } from "@/shared/ui/header";
import { IconButton } from "@/shared/ui/iconButton";
import { UserPreview } from "../UserPreview/UserPreview";
import { ContactField } from "../ContactField/ContactField";
import { type User } from "../../model/types/types";
import { getPhoneHref } from "../../model/utils/getPhoneHref";

interface UserCardProps extends User {
  onClose: () => void;
}

export const UserCard = ({ onClose, ...user }: UserCardProps) => {
  const { avatarUrl, firstName, lastName, email, phone, position } = user;
  const phoneHref = getPhoneHref(phone);

  return (
    <div className={styles.card}>
      <Header
        title="Информация"
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
              icon={closeIcon}
              alt="close"
              size={19}
              onClick={onClose}
            />
          </>
        }
      />
      <div className={styles.body}>
        <UserPreview
          avatarUrl={avatarUrl}
          firstName={firstName}
          lastName={lastName}
          position={position}
          size="lg"
        />
        <div className={styles.contacts}>
          <ContactField
            field="Почта"
            value={email}
            valueColor="var(--color-red)"
          />
          <ContactField field="Телефон" value={phone} />
        </div>
      </div>
    </div>
  );
};
