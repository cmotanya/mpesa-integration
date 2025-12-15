import { useCart } from "@/contexts/CartContext";
import { subTotal, total } from "@/utils/helper";
import { ClipboardList } from "lucide-react";
import React from "react";
import { Fade } from "react-awesome-reveal";

const OrderSummary = () => {
  const { cart } = useCart();

  const deliveryFee = 150;

  return (
    <div className="border-secondary/30 h-fit overflow-hidden rounded-lg border-2 p-2 shadow-lg">
      <Fade direction="down" duration={100} damping={0.5} triggerOnce>
        <p className="mb-4 flex items-center justify-center gap-2 text-2xl font-bold uppercase">
          <ClipboardList size={30} />
          Order Summary
        </p>
      </Fade>

      <div>
        <Fade
          cascade
          duration={100}
          delay={200}
          direction="up"
          damping={0.5}
          triggerOnce
        >
          <div className="flex justify-between pt-4 font-bold">
            <span className="uppercase">Subtotal:</span>
            <span>KES {subTotal(cart).toLocaleString()}</span>
          </div>

          <div className="flex justify-between py-3 text-sm">
            <span>Delivery Fee</span>
            <span>KES {deliveryFee.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-xl font-bold">
            <span className="uppercase">Total</span>
            <span>KES {total(cart, deliveryFee).toLocaleString()}</span>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default OrderSummary;
