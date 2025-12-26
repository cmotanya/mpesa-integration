import z from "zod";

export const DeliveryAddressSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters long"),

  phoneNumber: z
    .string()
    .nonempty("Phone number is required")
    .superRefine((val, ctx) => {
      if (val.startsWith("+254") || val.startsWith("254")) {
        const hasPlus = val.startsWith("+");
        const expectedLength = hasPlus ? 13 : 12;

        if (val.length !== expectedLength) {
          ctx.addIssue({
            code: "custom",
            message: `Phone number (${hasPlus ? "+254" : "254"}) must be ${expectedLength} digits`,
          });
        }

        const digitPattern = hasPlus ? /^\+254\d{9}$/ : /^254\d{9}$/;
        if (!digitPattern.test(val)) {
          ctx.addIssue({
            code: "custom",
            message: "Phone number must be by exactly 9 digits",
          });
        }
      } else if (val.startsWith("07") || val.startsWith("01")) {
        if (val.length !== 10) {
          ctx.addIssue({
            code: "custom",
            message: "Phone number must be exactly 10 digits",
          });
        }
        if (!/^\d+$/.test(val)) {
          ctx.addIssue({
            code: "custom",
            message: "Phone number must contain only digits",
          });
        }
      } else {
        ctx.addIssue({
          code: "custom",
          message: " Phone number must start with 07, 01, 254, or +254",
        });
      }
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
