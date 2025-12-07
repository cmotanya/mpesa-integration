import { orderItems } from "@/data/order-items";

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  href?: string;
  iconPosition?: "left" | "right";
};

export const subtotal = orderItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0,
);
