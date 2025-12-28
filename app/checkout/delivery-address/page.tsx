"use client";

import ContactAddress from "@/components/ContactAddress";
import { DeliveryAddressData, DeliveryAddressSchema } from "@/utils/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Navigation,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import PageSection from "./PageSection";
import handleSaveAddress from "@/utils/helper/handleSaveAddress";
import { Button } from "@/components/button";
import handleEditClick from "@/utils/helper/handleEditClick";
import { Fade } from "react-awesome-reveal";

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
    <div className="container my-8 w-full">
      <div className="flex justify-between px-5">
        <Fade direction="left" duration={100} damping={0.5} triggerOnce>
          <Button
            buttonType="button"
            onClick={() => handleEditClick({ form, router })}
            className="group bg-primary/10 ring-primary/50 text-primary flex items-center justify-center rounded-full font-medium uppercase ring transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 md:w-auto"
          >
            <ArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1 group-active:-translate-x-1" />{" "}
          </Button>
        </Fade>

        <Fade direction="right" duration={100} damping={0.5} triggerOnce>
          <Button
            buttonType="button"
            onClick={() => router.push("/checkout")}
            className="group flex items-center justify-center rounded-full font-medium uppercase ring transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 md:w-auto"
          >
            <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-1" />{" "}
          </Button>
        </Fade>
      </div>

      <form
        onSubmit={form.handleSubmit((data) =>
          handleSaveAddress({ data, setIsVerifying, router }),
        )}
        className="flex flex-col gap-8"
        noValidate
      >
        <PageSection
          form={form}
          formState={formState}
          isGettingLocation={isGettingLocation}
          title="Delivery Address"
          description="Enter your delivery address"
          text="Or manually enter your address"
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
    </div>
  );
};

export default DeliveryAddressPage;
