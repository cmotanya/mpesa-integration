import { useCart } from "@/contexts/CartContext";
import { MenuItemCardProps } from "@/utils/types";
import { Fade } from "react-awesome-reveal";
import { useState } from "react";
import { SkeletonCard } from "./SkeletonCard";
import { Check, Plus } from "lucide-react";

export const MenuItemCard = ({ selectedCategory }: MenuItemCardProps) => {
  const { addToCartItem } = useCart();
  const [activeId, setActiveId] = useState<string | null>(null);

  const menuItems = selectedCategory?.menu_items || [];
  const hasItems = menuItems && menuItems.length > 0;

  const SKELETON_COUNT = 6;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3">
      {hasItems ? (
        <>
          {menuItems.map((item) => {
            const isActive = activeId === item.id;

            return (
              <Fade key={item.id} duration={150} direction="up" triggerOnce>
                <div
                  key={item.id}
                  className={`shadow-secondary/50 group bg-secondary/10 hover:bg-secondary/20 mb-4 rounded-lg p-4 pb-2 shadow-sm transition-all duration-200 ease-in-out ${
                    activeId === item.id ? "ring-secondary/60 ring" : ""
                  }`}
                >
                  <h2 className="text-lg font-medium">{item.name}</h2>
                  <p className="text-sm">{item.description}</p>

                  <div className="flex items-center justify-between">
                    <p className="p-0.5 text-sm font-bold">
                      Price: KES {item.price.toLocaleString()}
                    </p>
                    <button
                      onClick={() => {
                        setActiveId(item.id);
                        addToCartItem({ ...item, quantity: 1 });
                        setTimeout(() => setActiveId(null), 2500);
                      }}
                      className="ring-primary bg-primary flex min-w-30 cursor-pointer items-center gap-1 rounded-md px-1 py-2 text-xs font-medium text-white ring transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
                    >
                      {isActive ? (
                        <>
                          <Check className="size-5" />
                          Added to Cart
                        </>
                      ) : (
                        <>
                          <Plus className="size-5" />
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </Fade>
            );
          })}
        </>
      ) : (
        Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <SkeletonCard key={i} />
        ))
      )}
    </div>
  );
};
