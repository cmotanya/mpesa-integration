"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

import { useCategoryTabs } from "@/hooks/useCategoryTabs";
import { Category } from "@/utils/types";
import { useMenu } from "@/hooks/useMenu";
import { useSearchParams } from "next/navigation";
import { Fade } from "react-awesome-reveal";
import CategoryTabs from "./CategoryTabs";
import CartButton from "./CartButton";
import { MenuItemCard } from "./MenuItemCard";
import { CartModal } from "./CartModal";

export const FoodMenuOrder = () => {
  const searchParams = useSearchParams();

  const [showCart, setShowCart] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const { cart } = useCart();

  useMenu({
    searchParams,
    setCategories,
    setSelectedCategory,
    menuId: "menu",
  });

  useCategoryTabs({
    selectedCategory,
    searchParams,
    menuId: "menu",
  });

  return (
    <section
      id="menu"
      className="relative container flex flex-col items-center justify-center space-y-6"
    >
      <div className="bg-accent/20 sticky top-0 z-40 mb-6 w-full backdrop-blur-md">
        <div className="border-primary/40 mt-8 h-fit space-y-5 rounded-lg border-b-2 p-2 px-3 shadow-lg">
          <div className="flex items-center justify-between">
            <Fade duration={150} direction="left" cascade triggerOnce>
              <h2 className="text-2xl font-bold">Select Categories:</h2>
            </Fade>

            <CartButton setShowCart={setShowCart} cart={cart} />
          </div>

          <CategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        {selectedCategory && (
          <div className="mb-4 flex items-center justify-between gap-2 font-bold">
            <p className="uppercase">{selectedCategory.name}: </p>

            <p className="text-secondary">
              {selectedCategory.menu_items?.length} items available
            </p>
          </div>
        )}

        <MenuItemCard selectedCategory={selectedCategory} />

        <CartModal showCart={showCart} setShowCart={setShowCart} />
      </div>
    </section>
  );
};

export default FoodMenuOrder;
