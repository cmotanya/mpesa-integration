"use client";

import { ArrowLeft, Smartphone } from "lucide-react";
import { Fade } from "react-awesome-reveal";
import { MPesaPayment } from "../../components/MPesaPayment";
import { Button } from "../../components/button";
import { useRouter } from "next/navigation";
import OrderSummary from "@/components/OrderSummary";
import handlePayment from "@/utils/helper/handlePayment";
import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { subTotal } from "@/utils/helper/subTotal";
import FormInput from "@/components/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { DeliveryAddressData, DeliveryAddressSchema } from "@/utils/zod-schema";
import { useForm } from "react-hook-form";

export const FoodOrderCheckout = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<DeliveryAddressData>({
    defaultValues: {
      phoneNumber: "",
    },
    resolver: zodResolver(DeliveryAddressSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

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

  useEffect(() => {
    const savedAddress = localStorage.getItem("deliveryAddress");

    if (savedAddress) {
      try {
        const address: DeliveryAddressData = JSON.parse(savedAddress);
        form.setValue("phoneNumber", address.phoneNumber, {
          shouldValidate: true,
        });
      } catch (error) {
        console.error("Error parsing saved address:", error);
      }
    }
  }, [form]);

  return (
    <div className="relative container m-auto w-full max-w-4xl flex-col items-center justify-center space-y-6 px-4 py-8">
      <Fade duration={100} delay={400} direction="left" triggerOnce>
        <Button
          buttonType="button"
          onClick={() => router.back()}
          className="flex items-center justify-center gap-2 rounded-full p-4 uppercase ring transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1 group-active:-translate-x-1" />
        </Button>
      </Fade>

      <form
        onSubmit={(e) => handlePayment(paymentData, e)}
        className="space-y-6"
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
            <FormInput
              control={form.control}
              name="phoneNumber"
              label="Confirm Your M-Pesa Phone Number"
              placeholder="m-pesa number"
              type="tel"
              Icon={Smartphone}
              className="border-mpesa/30 focus:border-mpesa border ring-0"
            />
          </Fade>

          <Fade duration={100} delay={400} direction="up" triggerOnce>
            {/* MPesa Payment Form */}
            <MPesaPayment isProcessing={isProcessing} />
          </Fade>
        </div>
      </form>
    </div>
  );
};

export default FoodOrderCheckout;
