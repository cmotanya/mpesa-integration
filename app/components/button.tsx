import { cn } from "@/utils/cn";
import { ButtonProps } from "@/utils/types";

export const Button = ({
  children,
  onClick,
  className,
  icon,
  iconPosition,
  ...props
}: ButtonProps) => {
  const baseStyle =
    "flex items-center group cursor-pointer w-full md:w-auto gap-2 rounded-full px-4 py-3.5 hover:bg-primary/80 active:primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed";
  return (
    <button onClick={onClick} className={cn(className, baseStyle)} {...props}>
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
    </button>
  );
};
