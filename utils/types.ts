import { orderItems } from "@/data/order-items";
import { CartModal } from "../app/components/CartModal";
import { MenuItemCard } from "../app/components/MenuItemCard";
import CategoryTabs from "../app/components/CategoryTabs";
import CartButton from "../app/components/CartButton";

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

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  image?: string;
};

export type Category = {
  id: string | number;
  name: string;
  display_order?: number;
  menu_items?: MenuItem[];
  items?: MenuItem[];
};

export type CartItem = MenuItem & {
  quantity: number;
};

export type FetchMenuProps = {
  setMenuCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CartModalProps = {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  cart: CartItem[];
};

export type MenuItemCardProps = {
  selectedCategory: Category | null;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

export type CategoryTabsProps = {
  categories: Category[];
  selectedCategory: Category | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
};

export type CartButtonProps = {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  cart: CartItem[];
};
