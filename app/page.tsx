import FoodMenuOrder from "./menu/page";

export default function Home() {
  return (
    <main className="relative mb-15 flex min-h-screen flex-col items-center gap-10 py-10">
      {/* <FoodOrderCheckout />
      <DeliveryInformation />
      <MPesaPayment /> */}

      <h1 className="text-4xl font-bold">Welcome to the Food Ordering App</h1>
      <FoodMenuOrder />
    </main>
  );
}
