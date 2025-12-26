import z from "zod";

export const DeliveryAddressSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters long"),

  phoneNumber: z
    .string()
    .nonempty("Phone number is required")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .regex(/^(\+254|07|01)\d{9}$/, {
      message:
        "Phone number must start with +254, 07, or 01 and be 10 digits long.",
    }),

  streetAddress: z
    .string()
    .nonempty("Street address is required")
    .min(3, "Street address must be at least 3 characters long"),

  areaNeighborhood: z
    .string()
    .nonempty("Area/neighborhood is required")
    .min(3, "Area/neighborhood must be at least 3 characters long"),
});

export type DeliveryAddressData = z.infer<typeof DeliveryAddressSchema>;
