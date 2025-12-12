"use client";

import { CartItem, Category } from "@/utils/types";
import { useEffect, useState } from "react";
import fetchMenu from "../components/FetchMenu";
import { CartModal } from "../components/CartModal";
import { MenuItemCard } from "../components/MenuItemCard";
import CategoryTabs from "../components/CategoryTabs";
import CartButton from "../components/CartButton";

export const FoodMenuOrder = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMenu = async () => {
      setIsLoading(true);

      const data = await fetchMenu();

      if (data && data.length > 0 && !selectedCategory) {
        setCategories(data);
        setSelectedCategory(data[0]);
      }

      setIsLoading(false);
    };

    loadMenu();
  }, [selectedCategory]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading menu...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 space-y-5">
        <div className="flex items-center justify-between">
          <p>
            <strong>Select Categories:</strong>
          </p>

          <CartButton
            showCart={showCart}
            setShowCart={setShowCart}
            cart={cart}
          />
        </div>

        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      <div>
        <p className="text-text/80 mb-3 text-sm font-bold">
          Selected Category:{" "}
          <span className="text-secondary uppercase">
            {selectedCategory?.name}
          </span>
        </p>
        <p>Cart Items: {cart.length}</p>
      </div>

      <MenuItemCard
        selectedCategory={selectedCategory}
        cart={cart}
        setCart={setCart}
      />

      <CartModal
        showCart={showCart}
        setShowCart={setShowCart}
        cart={cart}
        setCart={setCart}
        onBackToMenu={() => setShowCart(false)}
      />
    </div>
  );
};

export default FoodMenuOrder;
