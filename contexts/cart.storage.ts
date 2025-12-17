import { CartItem } from "@/utils/types";

const CART_KEY = "food_order_cart";

export const getCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const storedCart = localStorage.getItem(CART_KEY);
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];
    return parsedCart as CartItem[];
  } catch (error) {
    console.error("Error retrieving cart from localStorage:", error);
    return [];
  }
};

export const saveCartToStorage = (cart: CartItem[]) => {
  if (typeof window === "undefined") return null;

  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
  return null;
};

export const clearCartFromStorage = () => {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(CART_KEY);
  } catch (error) {
    console.error("Error clearing cart from localStorage:", error);
  }
};

export const CATEGORY_KEY = "selected-category";

export const getCategoryTabsStorage = (): string | null => {
  if (typeof window === "undefined") return null;

  try {
    return localStorage.getItem(CATEGORY_KEY);
  } catch (error) {
    console.error("Error reading category from localStorage:", error);
    return null;
  }
};

export const setCategoryTabsStorage = (categoryId: string) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(CATEGORY_KEY, categoryId);
  } catch (error) {
    console.error("Error saving category to localStorage:", error);
  }
};
