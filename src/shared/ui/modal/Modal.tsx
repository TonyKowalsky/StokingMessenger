import { type ReactNode, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import styles from "./Modal.module.css";

interface ModalProps {
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

export const Modal = ({ children, isOpen, onClose, className }: ModalProps) => {
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const onContentClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
  };

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    },
    [handleClose],
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onKeyDown]);

  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) return null;

  return createPortal(
    <div
      className={clsx(styles.modal, className, {
        [styles.opened]: isOpen,
      })}
    >
      <div className={styles.overlay} onClick={handleClose}>
        <div className={styles.content} onClick={onContentClick}>
          {children}
        </div>
      </div>
    </div>,
    modalRoot,
  );
};
