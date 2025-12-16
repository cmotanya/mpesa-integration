import { useCart } from "@/contexts/CartContext";
import { MenuItemCardProps } from "@/utils/types";
import { Fade } from "react-awesome-reveal";
import { useState } from "react";
import { SkeletonCard } from "./SkeletonCard";
import { Check, Plus } from "lucide-react";
import { cn } from "@/utils/cn";

export const MenuItemCard = ({ selectedCategory }: MenuItemCardProps) => {
  const { addToCartItem } = useCart();
  const [activeId, setActiveId] = useState<string | null>(null);

  const menuItems = selectedCategory?.menu_items || [];
  const hasItems = menuItems && menuItems.length > 0;

  const SKELETON_COUNT = 6;

  return (
    <div className="grid gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
      {hasItems ? (
        <>
          {menuItems.map((item) => {
            const isActive = activeId === item.id;

            return (
              <Fade key={item.id} duration={150} direction="up" triggerOnce>
                <div
                  key={item.id}
                  className={`shadow-secondary/50 group bg-secondary/10 hover:bg-secondary/20 border-secondary/50 mb-4 rounded-lg border p-3 shadow-sm transition-all duration-200 ease-in-out ${
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
                        setTimeout(() => setActiveId(null), 2000);
                      }}
                      className={cn(
                        "bg-primary flex min-w-30 cursor-pointer items-center justify-center gap-1 rounded-md py-2 text-xs text-white transition-all duration-200 ease-in-out hover:scale-105 active:scale-95",
                        isActive && "bg-primary/50 pointer-events-none",
                      )}
                    >
                      {isActive ? (
                        <span className="flex items-center gap-1">
                          <Check className="size-5" />
                          Added to Cart
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Plus className="size-5" />
                          Add to Cart
                        </span>
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
