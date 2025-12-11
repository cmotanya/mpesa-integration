import { CartButtonProps } from "@/utils/types";
import { ShoppingCart } from "lucide-react";
import React from "react";

const CartButton = ({ showCart, setShowCart, cart }: CartButtonProps) => {
  return (
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
  );
};

export default CartButton;
