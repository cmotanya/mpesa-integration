import { cn } from "@/utils/cn";
import { DeliveryAddressProps } from "@/utils/types";
import { MapPin, MapIcon, Phone, ArrowRight, ArrowLeft } from "lucide-react";
import { Fade } from "react-awesome-reveal";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import FormInput from "./FormInput";

const ContactAddress = ({
  form,
  formState,
  isVerifying,
}: DeliveryAddressProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 px-4">
      <Fade cascade duration={100} delay={400} direction="up" damping={0.5}>
        <fieldset disabled={isVerifying}>
          <FormInput
            control={form.control}
            name="streetAddress"
            label="Street  Address"
            type="text"
            Icon={MapPin}
          />

          <FormInput
            control={form.control}
            name="areaNeighborhood"
            label="Area / Neighborhood"
            type="text"
            Icon={MapIcon}
          />

          <FormInput
            control={form.control}
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            Icon={Phone}
          />
        </fieldset>
      </Fade>

      <div className="mt-8 flex w-full flex-col items-center gap-4 px-8 md:flex-row">
        <Button
          onClick={() => router.back()}
          className="group bg-secondary/10 ring-secondary/50 text-text flex w-full items-center justify-center font-medium uppercase ring transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 md:w-auto"
        >
          <ArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1 group-active:-translate-x-1" />{" "}
          Back to Menu
        </Button>

        <Button
          buttonType="submit"
          className={cn(
            "group flex w-full items-center justify-center uppercase transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 md:w-auto",
            formState.errors.root &&
              isVerifying &&
              "cursor-not-allowed opacity-50",
          )}
        >
          {isVerifying ? (
            <span className="mr-2">Saving your Details...</span>
          ) : (
            <>
              <span>Save & Continue </span>
              <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ContactAddress;
