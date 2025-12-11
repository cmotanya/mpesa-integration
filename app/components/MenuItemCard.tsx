import { addToCart } from "@/utils/helper";
import { CartItem, MenuItemCardProps } from "@/utils/types";

export const MenuItemCard = ({
  selectedCategory,
  cart,
  setCart,
}: MenuItemCardProps) => {
  return (
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
  );
};
