"use client";

import { ArrowLeft } from "lucide-react";
import { Fade } from "react-awesome-reveal";
import { MPesaPayment } from "../../components/MPesaPayment";
import { Button } from "../../components/button";
import { useRouter } from "next/navigation";
import OrderSummary from "@/components/OrderSummary";
import handlePayment from "@/utils/helper/handlePayment";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { subTotal } from "@/utils/helper/subTotal";

export const FoodOrderCheckout = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();

  const { cart, clearCart } = useCart();

  const deliveryFee = 0;

  const paymentData = {
    setIsProcessing,
    cart,
    subtotal: subTotal(cart),
    deliveryFee,
    clearCart,
    router,
  };

  return (
    <form
      onSubmit={(e) => handlePayment(paymentData, e)}
      className="container m-auto flex min-h-screen w-full flex-col items-center justify-center space-y-6 px-3 py-8"
    >
      <div className="mb-6 text-center">
        <Fade duration={150} cascade triggerOnce>
          <h1 className="text-3xl font-bold uppercase">
            Complete your order 🚀
          </h1>
          <p className="text-text/70 mt-2 text-sm font-medium md:text-base">
            Confirm your delivery details and pay securely with M-PESA.
          </p>
        </Fade>
      </div>

      {/* Order Summary Card */}
      <Fade duration={100} delay={200} direction="up" triggerOnce>
        <OrderSummary />
      </Fade>

      <div className="w-full max-w-md space-y-6 p-6">
        <Fade duration={100} delay={300} direction="up" triggerOnce>
          {/* MPesa Payment Form */}
          <MPesaPayment isProcessing={isProcessing} />
        </Fade>

        <Fade duration={100} delay={400} direction="up" triggerOnce>
          <Button
            onClick={() => router.back()}
            className="bg-secondary/10 ring-secondary/50 text-text/80 flex w-full items-center justify-center gap-2 p-4 font-bold uppercase ring transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1 group-active:-translate-x-1" />
            Edit Address
          </Button>
        </Fade>
      </div>
    </form>
  );
};

export default FoodOrderCheckout;
