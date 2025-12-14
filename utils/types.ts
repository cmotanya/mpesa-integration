import type { SetStateAction, ReactNode } from "react";

export type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
  href?: string;
  iconPosition?: "left" | "right";
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export type Category = {
  id: string | number;
  name: string;
  display_order?: number;
  menu_items?: MenuItem[];
  items?: MenuItem[];
  slug: string;
};

export type CartItem = MenuItem & {
  quantity: number;
};

export type CartModalProps = {
  showCart: boolean;
  setShowCart: React.Dispatch<SetStateAction<boolean>>;
  onBackToMenu?: () => void;
};

export type MenuItemCardProps = {
  selectedCategory: Category | null;
};

export interface CartContextType {
  cart: CartItem[];
  addToCartItem: (item: CartItem) => void;
  updateQuantityToCart: (
    itemId: string,
    quantity: number,
    change: number,
  ) => void;
  removeFromCartItem: (itemId: string) => void;
  clearFromCart: () => void;
}

export type CategoryTabsProps = {
  categories: Category[];
  selectedCategory: Category | null;
  setSelectedCategory: React.Dispatch<SetStateAction<Category | null>>;
};

export type UseCategoryTabsProps = {
  selectedCategory: Category | null;
  searchParams: URLSearchParams;
  menuId: string;
};

export type UseMenuProps = {
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
  setCategories: React.Dispatch<SetStateAction<Category[]>>;
  setSelectedCategory: React.Dispatch<SetStateAction<Category | null>>;
  menuId?: string;
  searchParams: URLSearchParams;
  selectedItem?: string | null;
  setSelectedItem?: (id: string | null) => void;
};

export type CartButtonProps = {
  setShowCart: React.Dispatch<SetStateAction<boolean>>;
  cart: CartItem[];
};
