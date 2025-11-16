import { DeliveryInformation } from "./components/delivery-details";
import { FoodOrderCheckout } from "./components/food-order-checkout";
import { MPesaPayment } from "./components/mpesa-payment";

export default function Home() {
  return (
    <main className="mb-15 flex min-h-screen flex-col items-center justify-center gap-10 py-10">
      <FoodOrderCheckout />
      <DeliveryInformation />
      <MPesaPayment />
    </main>
  );
}
