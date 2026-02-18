import { Modal } from "@/shared/ui/modal";
import { UserCard } from "../UserCard/UserCard";
import { type User } from "../../model/types/types";

interface UserCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export const UserCardModal = ({
  isOpen,
  onClose,
  user,
}: UserCardModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <UserCard {...user} onClose={onClose} />
    </Modal>
  );
};
