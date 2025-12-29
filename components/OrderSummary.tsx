import { useCart } from "@/contexts/CartContext";
import { subTotal } from "@/utils/helper/subTotal";
import { total } from "@/utils/helper/totalSum";
import { ClipboardList } from "lucide-react";
import { Fade } from "react-awesome-reveal";
import DeliveryLocationPicker from "./DeliveryLocationPicker";

const OrderSummary = () => {
  const { cart, area, fee } = useCart();

  return (
    <div className="border-secondary/50 bg-secondary/10 shadow-secondary/50 h-fit space-y-5 overflow-hidden rounded-lg border-2 p-2 shadow-lg">
      <Fade direction="down" duration={100} damping={0.5} triggerOnce>
        <p className="mb-4 flex items-center justify-center gap-2 text-2xl font-bold uppercase">
          <ClipboardList size={30} />
          Order Summary
        </p>
      </Fade>

      <div>
        <DeliveryLocationPicker />
      </div>

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

          <div className="border-text/40 my-3 border-t border-dashed"> </div>
          <div className="text-text/70 my-3 text-xs font-medium uppercase">
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>KES {fee.toLocaleString()}</span>
            </div>

            <Fade direction="up" duration={100} delay={250} triggerOnce>
              {area && (
                <div className="flex justify-between font-medium">
                  <span className="">Pick up location:</span>
                  <span>{area}</span>
                </div>
              )}
            </Fade>
          </div>

          <div className="flex justify-between text-xl font-bold">
            <span className="uppercase">Total</span>
            <span>KES {total(cart, fee).toLocaleString()}</span>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default OrderSummary;
