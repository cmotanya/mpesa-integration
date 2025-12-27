import { CreateOrderProps } from "@/utils/types";
import { supabase } from "./supabase";
import { Database } from "./database.types";
import toast from "react-hot-toast";
import formatPhoneNumber from "@/utils/formatters";

type OrderRow = Database["public"]["Tables"]["orders"]["Row"];

const createOrder = async ({
  address,
  subtotal,
  deliveryFee,
  items,
}: CreateOrderProps): Promise<OrderRow | null> => {
  try {
    if (!items || items.length === 0) {
      throw new Error("Cannot create orders without items");
    }

    if (!address.name || !address.phoneNumber) {
      throw new Error("Customer name and phone number are required");
    }

    deliveryFee = Math.round(deliveryFee * 100) / 100;
    subtotal = Math.round(subtotal * 100) / 100;
    const total = Math.round(subtotal + deliveryFee * 100) / 100;

    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    const orderNumber = `ORD-${timestamp}-${random}`;

    const orderData = {
      order_number: orderNumber,
      customer_name: address.name.trim(),
      delivery_address:
        `${address.streetAddress}, ${address.areaNeighborhood}`.trim(),
      customer_phone: formatPhoneNumber(address.phoneNumber),
      subtotal: Math.round(subtotal * 100) / 100,
      delivery_fee: deliveryFee,
      total_amount: total,
      payment_method: "mpesa",
      payment_status: "pending",
      order_status: "pending",
    };

    const itemsData = items.map((item) => ({
      menu_item_id: item.id,
      quantity: item.quantity,
      unit_price: Math.round(item.unit_price * 100) / 100,
      subtotal: Math.round(item.unit_price * item.quantity * 100) / 100,
    }));

    const { data, error } = await supabase.rpc("create_order_transaction", {
      order_data: orderData,
      items_data: itemsData,
    });

    if (error) throw error;

    if (!data) throw new Error("Order creation failed - no data returned");

    return data as OrderRow;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    toast.error(
      errorMessage.includes("items") ? "Order already exists" : errorMessage,
      { position: "top-center", style: { color: "white" } },
    );

    return null;
  }
};

export default createOrder;
