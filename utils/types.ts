import type { SetStateAction, ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { DeliveryAddressData } from "./zod-schema";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
  href?: string;
  iconPosition?: "left" | "right";
  buttonType?: "button" | "submit" | "reset";
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  is_available: boolean;
};

export type Category = {
  id: string | number;
  name: string;
  display_order?: number;
  menu_items?: MenuItem[];
  items?: MenuItem[];
  slug: string;
};

export type DbCategory = Omit<Category, "slug"> & {
  menu_items: Omit<MenuItem, "is_available">[];
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

export type DeliveryAddressType = UseFormReturn<DeliveryAddressData>;

export type DeliveryAddressProps = {
  form: DeliveryAddressType;
  formState: DeliveryAddressType["formState"];
  isVerifying: boolean;
};

export type OnSubmitProps = {
  data: DeliveryAddressData;
  setIsVerifying: React.Dispatch<SetStateAction<boolean>>;
  form: DeliveryAddressType;
  router: AppRouterInstance;
};

export type DeliveryDataType = {
  streetAddress: string;
  areaNeighborhood: string;
  phoneNumber: string;
};

export type HandleLocationProps = {
  setIsGettingLocation: React.Dispatch<SetStateAction<boolean>>;
  setLocationError: React.Dispatch<SetStateAction<string | null>>;
  form: DeliveryAddressType;
};
