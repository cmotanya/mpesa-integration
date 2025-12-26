import { CreateOrderProps } from "@/utils/types";
import { supabase } from "./supabase";
import { Database } from "./database.types";

const createOrder = async ({
  address,
  subtotal,
  deliveryFee,
  items,
}: CreateOrderProps): Promise<
  Database["public"]["Tables"]["orders"]["Row"] | null
> => {
  try {
    const total = subtotal + deliveryFee;

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: `ORD-${Date.now()}`,
        customer_name: address.name,
        delivery_address: `${address.streetAddress}, ${address.areaNeighborhood}`,
        customer_phone: address.phoneNumber,
        subtotal,
        delivery_fee: deliveryFee,
        total_amount: total,
        payment_method: "mpesa",
        payment_status: "pending",
        order_status: "pending",
      })
      .select()
      .single();

    if (orderError) throw orderError;

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

    if (itemError) throw itemError;

    return order;
  } catch (error) {
    console.error("Error creating order:", error);

    return null;
  }
};

export default createOrder;
