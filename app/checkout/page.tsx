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
      className="m-auto flex min-h-screen w-full flex-col items-center justify-center space-y-6 px-3"
    >
      <div className="mb-6">
        <Fade duration={150} cascade>
          <h1 className="font-primary text-center text-2xl font-bold uppercase">
            Complete your order 🚀
          </h1>
          <p className="text-text/70 mt-2 text-sm font-medium md:text-base">
            Confirm your delivery details and pay securely with M-PESA.
          </p>
        </Fade>
      </div>

      <OrderSummary />

      <div className="mt-8 flex w-full flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <MPesaPayment isProcessing={isProcessing} />

        <Button
          onClick={() => router.back()}
          className="flex w-full justify-center uppercase md:w-auto"
        >
          <ArrowLeft /> Edit Address
        </Button>
      </div>
    </form>
  );
};

export default FoodOrderCheckout;
