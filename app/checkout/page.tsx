"use client";

import { orderItems } from "@/data/order-items";
import { cn } from "@/utils/cn";
import { subtotal } from "@/utils/types";
import { ClipboardList } from "lucide-react";
import { Fade } from "react-awesome-reveal";
import { MPesaPayment } from "../components/MPesaPayment";

export const FoodOrderCheckout = () => {
  const deliveryFee = 150;
  const totalAmount = subtotal + deliveryFee;

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
            {orderItems.map((item) => {
              const isLastItem = item.id === orderItems.length;
              const isEvenItem = item.id % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={cn(
                    "border-primary/15 flex justify-between border-b py-2 text-sm",
                    isLastItem && "border-0",
                    isEvenItem && "bg-secondary/5",
                  )}
                >
                  <div className="block space-x-3">
                    <span>{item.quantity}</span>
                    <span>{item.name}</span>
                  </div>

                  <p className="font-medium">
                    KES {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              );
            })}

            <div className="flex justify-between pt-4 font-bold">
              <span className="uppercase">Subtotal:</span>
              <span>KES {subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between py-3 text-sm">
              <span>Delivery Fee</span>
              <span>KES {deliveryFee.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-xl font-bold">
              <span className="uppercase">Total</span>
              <span>KES {totalAmount.toLocaleString()}</span>
            </div>
          </Fade>
        </div>
      </div>

      <MPesaPayment />
    </div>
  );
};

export default FoodOrderCheckout;
