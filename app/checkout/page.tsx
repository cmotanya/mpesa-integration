"use client";

import { ArrowLeft, ClipboardList } from "lucide-react";
import { Fade } from "react-awesome-reveal";
import { MPesaPayment } from "../../components/MPesaPayment";
import { Button } from "../../components/button";
import { total, subTotal } from "@/utils/helper";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";

export const FoodOrderCheckout = () => {
  const router = useRouter();

  const { cart } = useCart();
  const deliveryFee = 150;

  return (
    <div className="m-auto flex min-h-screen w-full flex-col items-center justify-center space-y-8">
      <div className="mb-6 space-y-1">
        <Fade duration={150} cascade>
          <h1 className="font-primary text-center text-3xl font-bold uppercase">
            Complete your order
          </h1>
          <p className="text-text/80 capitalize">
            Review your order and pay with M-PESA.
          </p>
        </Fade>
      </div>

      <div className="border-secondary/30 h-fit overflow-hidden rounded-lg border-2 p-2 shadow-lg">
        <Fade direction="down" duration={150} damping={0.5} triggerOnce>
          <p className="mb-4 flex items-center justify-center gap-2 text-2xl font-bold uppercase">
            <ClipboardList size={30} />
            Order Summary
          </p>
        </Fade>

        <div>
          <Fade
            cascade
            duration={150}
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

      <div className="flex w-auto flex-col items-center gap-4">
        <Button
          onClick={() => router.back()}
          className="flex w-full items-center justify-center md:w-auto"
        >
          <ArrowLeft /> Back to Menu
        </Button>

        <MPesaPayment />
      </div>
    </div>
  );
};

export default FoodOrderCheckout;
