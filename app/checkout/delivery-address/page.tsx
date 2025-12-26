"use client";

import ContactAddress from "@/components/ContactAddress";
import { DeliveryAddressData, DeliveryAddressSchema } from "@/utils/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, MapPin, Navigation } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import PageSection from "./PageSection";
import handleSaveAddress from "@/utils/helper/handleSaveAddress";

const DeliveryAddressPage = () => {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const router = useRouter();

  const form = useForm<DeliveryAddressData>({
    defaultValues: {
      name: "",
      phoneNumber: "",
      streetAddress: "",
      areaNeighborhood: "",
    },
    resolver: zodResolver(DeliveryAddressSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const { formState } = form;

  const watchedValues = useWatch({ control: form.control });

  useEffect(() => {
    const savedAddress = localStorage.getItem("deliveryAddress");

    if (savedAddress) form.reset(JSON.parse(savedAddress));
  }, [form]);

  useEffect(() => {
    if (!watchedValues) return;

    localStorage.setItem("deliveryAddress", JSON.stringify(watchedValues));
  }, [watchedValues]);

  return (
    <form
      onSubmit={form.handleSubmit((data) =>
        handleSaveAddress({ data, setIsVerifying, router }),
      )}
      className="container my-8 flex min-h-screen w-full flex-col gap-8"
      noValidate
    >
      <PageSection
        form={form}
        formState={formState}
        isGettingLocation={isGettingLocation}
        title="Delivery Address"
        description="Enter your delivery address"
        text="We will use this address to deliver your order."
        IconNavigation={Navigation}
        IconMap={MapPin}
        IconAlertCircle={AlertCircle}
        setIsGettingLocation={setIsGettingLocation}
        setLocationError={setLocationError}
        locationError={locationError}
      >
        <ContactAddress
          isVerifying={isVerifying}
          form={form}
          formState={formState}
        />
      </PageSection>
    </form>
  );
};

export default DeliveryAddressPage;
