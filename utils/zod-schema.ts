import z from "zod";

export const DeliveryAddressSchema = z.object({
  streetAddress: z
    .string()
    .min(1, "Street address is required")
    .min(5, "Street address must be at least 3 characters long"),

  areaNeighborhood: z
    .string()
    .min(1, "Area/neighborhood is required")
    .min(5, "Area/neighborhood must be at least 3 characters long"),

  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .min(10, "Phone number must be at least 10 characters long")
    .regex(
      /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      "Invalid phone number format",
    ),
});

export type DeliveryAddressData = z.infer<typeof DeliveryAddressSchema>;
