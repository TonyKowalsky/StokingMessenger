import { useEffect, useRef, type RefObject } from "react";

interface useClickOutsideProps {
  ref: RefObject<HTMLElement | null>;
  callback: () => void;
  enabled: boolean;
  ignoreRef?: RefObject<HTMLElement | null>;
}

export const useClickOutside = ({
  ref,
  callback,
  enabled = true,
  ignoreRef,
}: useClickOutsideProps) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      const isClickInsideRef = ref.current?.contains(target);
      const isClickInsideIgnore = ignoreRef?.current?.contains(target);
      if (!isClickInsideRef && !isClickInsideIgnore) {
        callbackRef.current();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, enabled, ignoreRef]);
};
