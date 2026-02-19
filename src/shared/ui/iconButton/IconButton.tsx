import { forwardRef } from "react";

interface IconButtonProps {
  icon: string;
  alt: string;
  onClick?: () => void;
  size?: number;
  className?: string;
  tag?: "button" | "a";
  href?: string;
}

export const IconButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  IconButtonProps
>(({ icon, alt, onClick, size, className, tag = "button", href }, ref) => {
  const Tag = tag;
  return (
    <Tag
      onClick={onClick}
      className={className}
      ref={ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>}
      href={href}
      aria-label={alt}
    >
      <img
        src={icon}
        alt={alt}
        width={size ? size : "auto"}
        height={size ? size : "auto"}
      />
    </Tag>
  );
});
