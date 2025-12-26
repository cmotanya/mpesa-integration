import { HandlePaymentProps } from "../types";
import toast from "react-hot-toast";
import { DeliveryAddressSchema, DeliveryAddressData } from "../zod-schema";
import createOrder from "@/lib/createOrders";

const handlePayment = async (
  {
    setIsProcessing,
    cart,
    subtotal,
    deliveryFee,
    clearCart,
    router,
  }: HandlePaymentProps,
  e: React.FormEvent<HTMLFormElement>,
) => {
  e.preventDefault();
  setIsProcessing(true);

  try {
    const savedAddress = localStorage.getItem("deliveryAddress");

    if (!savedAddress) {
      toast.error(
        "Delivery address not found. Please save your delivery address first.",
      );

      setIsProcessing(false);

      return;
    }

    const address = JSON.parse(savedAddress) as DeliveryAddressData;

    const parsed = DeliveryAddressSchema.safeParse(address);

    if (!parsed.success) {
      toast.error(" Error saving address.Please review your details", {
        position: "top-center",
        style: { color: "white" },
      });
      setIsProcessing(false);

      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const order = await createOrder({
      address: parsed.data,
      subtotal,
      deliveryFee,
      items: cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
      })),
    });

    if (!order) {
      toast.error("Error processing payment. Please try again.", {
        position: "top-center",
        style: { color: "white" },
      });
      return;
    }

    clearCart();
    localStorage.removeItem("deliveryAddress");

    router.push("/menu");
  } catch {
    toast.error("Error processing payment. Please try again.", {
      position: "top-center",
      style: { color: "white" },
    });
  }
};

export default handlePayment;
