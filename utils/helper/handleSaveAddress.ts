import { HandleSubmitProps } from "@/utils/types";
import toast from "react-hot-toast";

const handleSaveAddress = async ({
  data,
  setIsVerifying,
  form,
  router,
}: HandleSubmitProps) => {
  setIsVerifying(true);

  console.log("🚀 ~ file: onSubmit.ts:6 ~ onSubmit ~ data:", {
    streetAddress: form.getValues("streetAddress"),
    areaNeighborhood: form.getValues("areaNeighborhood"),
    phoneNumber: form.getValues("phoneNumber"),
  });

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
