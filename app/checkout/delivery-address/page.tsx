"use client";

import { Button } from "@/components/button";
import ContactAddress from "@/components/contact-address";
import handleSubmit from "@/hooks/onSubmit";
import { cn } from "@/utils/cn";
import { handleLocationClick } from "@/utils/handleLocation";
import { DeliveryAddressData, DeliveryAddressSchema } from "@/utils/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Navigation, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useForm } from "react-hook-form";

const DeliveryAddressPage = () => {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const router = useRouter();

  const form = useForm<DeliveryAddressData>({
    defaultValues: {
      streetAddress: "",
      areaNeighborhood: "",
      phoneNumber: "",
    },
    resolver: zodResolver(DeliveryAddressSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const { formState } = form;

  // Reverse geocode coordinates to address

  return (
    <form
      onSubmit={form.handleSubmit((data) =>
        handleSubmit({ data, setIsVerifying, form, router }),
      )}
      className="container my-8 flex min-h-screen w-full flex-col gap-8"
      noValidate
    >
      <div className="mb-4 text-center">
        <Fade cascade duration={100} delay={100} direction="down" damping={0.5}>
          <div className="bg-primary mb-4 inline-flex size-15 items-center justify-center rounded-full">
            <MapPin className="text-background size-10" />
          </div>

          <p className="text-3xl font-bold uppercase">Delivery Address</p>

          <p className="text-text/70 text-sm">
            Where should we deliver your order?
          </p>
        </Fade>
      </div>

      <div
        className={cn(
          "flex flex-col gap-3 space-y-2",
          isGettingLocation && "pointer-events-none opacity-50",
        )}
      >
        <Fade cascade duration={100} delay={200} direction="down" damping={0.5}>
          <div className="flex flex-col items-center justify-center gap-3">
            <Button
              buttonType="button"
              onClick={() =>
                handleLocationClick({
                  setIsGettingLocation,
                  setLocationError,
                  form,
                })
              }
              className="transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              <Navigation
                className={cn("mr-2", isGettingLocation && "animate-spin")}
                size={20}
              />
              {isGettingLocation
                ? "Getting Current Location..."
                : "Use Current Location"}
            </Button>

            {locationError && (
              <div className="flex max-w-md items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle size={20} className="mt-0.5 shrink-0" />
                <p>{locationError}</p>
              </div>
            )}
          </div>
        </Fade>

        <Fade cascade duration={100} delay={300} direction="up" damping={0.5}>
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="border-accent/50 w-full border-t-2"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background text-text/50 px-2 text-sm font-medium">
                or enter your address manually
              </span>
            </div>
          </div>
        </Fade>

        <ContactAddress
          isVerifying={isVerifying}
          form={form}
          formState={formState}
        />
      </div>
    </form>
  );
};

export default DeliveryAddressPage;
