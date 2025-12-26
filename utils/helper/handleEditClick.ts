import { HandleEditClickProps } from "../types";

const handleEditClick = ({ form, router }: HandleEditClickProps) => {
  const values = form.getValues();
  localStorage.setItem("deliveryAddress", JSON.stringify(values));

  router.back();
};

export default handleEditClick;
