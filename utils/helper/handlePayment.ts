import { HandlePaymentProps } from "../types";
import { DeliveryAddressSchema, DeliveryAddressData } from "../zod-schema";
import createOrder from "@/lib/createOrders";
import { showToast } from "../toast";

const handleError = (
  error: string,
  setIsProcessing: (value: boolean) => void,
) => {
  showToast.error(error);
  setIsProcessing(false);
};

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
      handleError(
        "Delivery address not found. Please save your delivery address first",
        setIsProcessing,
      );

      return;
    }

    const address = JSON.parse(savedAddress) as DeliveryAddressData;

    const parsed = DeliveryAddressSchema.safeParse(address);

    if (!parsed.success) {
      showToast.error(" Error saving address.Please review your details");

      return;
    }

    if (cart.length === 0) {
      handleError(
        "Your cart is empty. Please add items to your cart.",
        setIsProcessing,
      );

      return;
    }

    const start = Date.now();

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
      handleError("Order creation failed - no data returned", setIsProcessing);

      return;
    }

    const elapsed = Date.now() - start;

    if (elapsed < 2000) {
      await new Promise((resolve) => setTimeout(resolve, elapsed));
    }

    showToast.success("Order placed successfully! 🎉");

    clearCart();
    localStorage.removeItem("deliveryAddress");

    router.push("/order-confirmation/" + order?.id);
  } catch {
    handleError("Error processing payment. Please try again.", setIsProcessing);
  } finally {
    setIsProcessing(false);
  }
};

export default handlePayment;
