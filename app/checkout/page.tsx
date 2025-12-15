"use client";

import { ArrowLeft } from "lucide-react";
import { Fade } from "react-awesome-reveal";
import { MPesaPayment } from "../../components/MPesaPayment";
import { Button } from "../../components/button";
import { useRouter } from "next/navigation";
import DeliveryAddress from "@/components/DeliveryAddress";
import OrderSummary from "@/components/OrderSummary";

export const FoodOrderCheckout = () => {
  const router = useRouter();

  return (
    <div className="m-auto flex min-h-screen w-full flex-col items-center justify-center space-y-6 px-3">
      <div className="mb-6 space-y-5">
        <div>
          <Fade duration={150} cascade>
            <h1 className="font-primary text-center text-2xl font-bold uppercase">
              Complete your order 🚀
            </h1>
            <p className="text-text/70 mt-2 text-sm font-medium md:text-base">
              Confirm your delivery details and pay securely with M-PESA.
            </p>
          </Fade>
        </div>

        <DeliveryAddress />
      </div>

      <OrderSummary />

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
