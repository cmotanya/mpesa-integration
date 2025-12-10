"use client";

import { CartItem, Category } from "@/utils/types";
import { useEffect, useState } from "react";
import fetchMenu from "../components/FetchMenu";
import { addToCart } from "@/utils/helper";
import { ShoppingCart, X } from "lucide-react";
import { cn } from "@/utils/cn";

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

          <button
            onClick={() => setShowCart(!showCart)}
            className="relative transition-all duration-200 ease-in-out hover:scale-105 active:scale-105"
          >
            <ShoppingCart />
            {cart.length > 0 && (
              <span className="absolute -top-3 -right-3 flex size-6 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() =>
                setSelectedCategory(
                  category.id === selectedCategory?.id ? null : category,
                )
              }
              className={cn(
                "w-auto cursor-pointer rounded-md px-3 py-1 text-left font-medium transition-colors duration-200",
                selectedCategory?.id === category.id
                  ? "bg-accent/30"
                  : "bg-secondary/50 hover:bg-secondary/70",
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      <p className="text-text/80 mb-3 text-sm font-bold">
        Selected Category:{" "}
        <span className="text-secondary uppercase">
          {selectedCategory?.name}
        </span>
      </p>
      <p>Cart Items: {cart.length}</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {selectedCategory?.menu_items?.map((item) => (
          <div
            key={item.id}
            className="shadow-accent/30 border-accent/30 mb-4 rounded-md border p-4 pb-2 shadow-sm"
          >
            <h2 className="text-lg font-medium">{item.name}</h2>
            <p className="text-sm">{item.description}</p>

            <div className="flex items-center justify-between">
              <p className="p-0.5 text-sm font-bold">
                Price: KES {item.price.toLocaleString()}
              </p>
              <button
                onClick={() =>
                  addToCart<CartItem>(cart, { ...item, quantity: 1 }, setCart)
                }
                className="ring-secondary bg-accent/20 hover:bg-accent/60 flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium ring transition-all duration-200 ease-in-out active:scale-105"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {!showCart ? null : (
        <div className="fixed inset-0 top-0 right-0 bottom-0 left-0 z-50 flex w-full items-center justify-center overflow-auto bg-black/50 backdrop-blur-sm">
          <div className="bg-background/90 w-11/12 max-w-md rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold uppercase">Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="bg-error flex size-7 items-center justify-center gap-1 rounded-full text-sm font-medium text-white transition-all duration-200 ease-in-out active:scale-105"
              >
                <X />
              </button>
            </div>
            <div className="mt-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="border-b-secondary/30 flex items-center justify-between border-b py-2"
                >
                  <div>
                    <p className="text-sm">{item.name}</p>
                    <p className="text-xs font-medium">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-bold">
                      Total: KES {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodMenuOrder;
