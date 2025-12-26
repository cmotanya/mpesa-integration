import { HandleSaveProps } from "@/utils/types";
import toast from "react-hot-toast";

const handleSaveAddress = async ({
  data,
  setIsVerifying,
  router,
}: HandleSaveProps) => {
  setIsVerifying(true);

  try {
    localStorage.setItem("deliveryAddress", JSON.stringify(data));

    toast.success("Delivery address saved successfully!", {
      position: "top-center",
    });

    router.push("/checkout");
  } catch {
    toast.error("Error saving address", {
      position: "top-center",
      style: { color: "white" },
    });
  } finally {
    setIsVerifying(false);
  }
};

export default handleSaveAddress;
