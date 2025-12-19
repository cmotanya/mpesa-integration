import { cn } from "@/utils/cn";
import { CustomLinkProps } from "@/utils/types";
import Link from "next/link";

const CustomLink = ({ href, children, className, Icon }: CustomLinkProps) => {
  const baseStyle =
    "flex group items-center gap-2 text-text/80 hover:text-primary";

  const isExternalLink =
    href.startsWith("http://") || href.startsWith("https://");

  const target = isExternalLink ? "_blank" : undefined;
  const rel = isExternalLink ? "noopener noreferrer" : undefined;

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={cn(baseStyle, className)}
    >
      {Icon && (
        <Icon className="text-text/60 size-4.5 transition-all duration-200 ease-in-out group-hover:scale-105 group-active:scale-95" />
      )}{" "}
      {children}
    </Link>
  );
};

export default CustomLink;
