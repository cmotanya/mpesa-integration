import toast from "react-hot-toast";
import { DeliveryAddressType } from "./types";

export const saveDeliveryData = (form: DeliveryAddressType) => {
  const isDataValid = form.trigger();

  if (!isDataValid) return;

  const data = form.getValues();

  localStorage.setItem("deliveryAddress", JSON.stringify(data));

  try {
    const item = localStorage.getItem("deliveryAddress");

    if (item) {
      const parsedItem = JSON.parse(item);

      toast.success("Delivery address saved successfully!", {
        position: "top-center",
      });
      console.log(parsedItem);
    } else {
      throw new Error("Local storage write failed.");
    }
  } catch (error) {
    toast.error("Failed to save delivery address.");

    console.error(error);

    return false;
  }
};
