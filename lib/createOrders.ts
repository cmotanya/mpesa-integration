import { CreateOrderProps } from "@/utils/types";
import { supabase } from "./supabase";
import { Database } from "./database.types";
import toast from "react-hot-toast";
import { formatPhoneNumber } from "@/utils/formatters";

const createOrder = async ({
  address,
  subtotal,
  deliveryFee,
  items,
}: CreateOrderProps): Promise<
  Database["public"]["Tables"]["orders"]["Row"] | null
> => {
  try {
    const total = Math.round(subtotal + deliveryFee * 100) / 100;

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        customer_name: address.name,
        delivery_address: `${address.streetAddress}, ${address.areaNeighborhood}`,
        customer_phone: formatPhoneNumber(address.phoneNumber),
        subtotal: Math.round(subtotal * 100) / 100,
        delivery_fee: deliveryFee,
        total_amount: total,
        payment_method: "mpesa",
        payment_status: "pending",
        order_status: "pending",
      })
      .select()
      .single();

    if (orderError) throw orderError;

    if (!order) {
      toast.error("Order creation failed - no data returned");
      return null;
    }

    const orderItem = items.map((item) => ({
      order_id: order.id,
      menu_item_id: item.id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      subtotal: item.unit_price * item.quantity,
    }));

    const { error: itemError } = await supabase
      .from("order_items")
      .insert(orderItem);

    if (itemError) {
      toast.error(
        "Order items failed, but order was created. Order ID:" + order.id,
      );
    }

    return order;
  } catch {
    toast.error("Order creation failed.");

    return null;
  }
};

export default createOrder;
