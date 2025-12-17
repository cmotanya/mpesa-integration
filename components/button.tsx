import { cn } from "@/utils/cn";
import { ButtonProps } from "@/utils/types";
import Link from "next/link";

export const Button = ({
  children,
  onClick,
  className,
  icon,
  iconPosition,
  href,
  buttonType,
  ...props
}: ButtonProps) => {
  const baseStyle =
    "flex items-center group cursor-pointer bg-primary text-white text-center w-auto gap-2 rounded-full px-4 py-4 disabled:cursor-not-allowed";

  const buttonContent = (
    <>
      {iconPosition === "left" && (
        <span className="mr-2 size-5 transition-transform duration-200 group-hover:-translate-x-1 group-active:-translate-x-1">
          {icon}
        </span>
      )}
      {children}
      {iconPosition === "right" && (
        <span className="ml-2 size-5 transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-1">
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn(baseStyle, className)}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={buttonType}
      onClick={onClick}
      className={cn(baseStyle, className)}
      {...props}
    >
      {buttonContent}
    </button>
  );
};
