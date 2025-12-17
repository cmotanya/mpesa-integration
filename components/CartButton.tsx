import { cn } from "@/utils/cn";
import { CartButtonProps } from "@/utils/types";
import { ShoppingCart } from "lucide-react";
import { Fade } from "react-awesome-reveal";

const CartButton = ({ setShowCart, cart }: CartButtonProps) => {
  return (
    <Fade duration={150} direction="right" cascade triggerOnce>
      <button
        onClick={() => setShowCart((prev) => !prev)}
        className={cn(
          "bg-primary z-50 flex cursor-pointer items-center justify-center rounded-full p-2 shadow-lg backdrop-blur-lg transition-all duration-200 ease-in-out hover:scale-105 active:scale-95",
          cart.length === 0 && "bg-primary/50 pointer-events-none",
        )}
      >
        <ShoppingCart className="text-white" />
        {cart.length > 0 && (
          <div className="absolute -top-3 -right-2.5 flex size-6 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </div>
        )}
      </button>
    </Fade>
  );
};

export default CartButton;
