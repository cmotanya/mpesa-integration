import { cn } from "@/utils/cn";
import { DeliveryAddressProps } from "@/utils/types";
import { MapPin, MapIcon, Phone, ArrowRight, ArrowLeft } from "lucide-react";
import { Fade } from "react-awesome-reveal";
import { Controller } from "react-hook-form";
import { Button } from "./button";
import { useRouter } from "next/navigation";

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
          <Controller
            control={form.control}
            name="streetAddress"
            render={({ field, fieldState }) => (
              <div>
                <label
                  htmlFor={field.name}
                  className="text-text text-sm font-medium"
                >
                  Street Address
                </label>
                <div className="group relative">
                  <div className="border-r-accent/50 absolute inset-y-0 left-10 flex items-center border-r-2"></div>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <MapPin className="group-focus-within:text-accent text-accent transition-all duration-200 ease-in-out group-focus-within:animate-pulse" />
                  </div>
                  <input
                    type="text"
                    {...field}
                    id={field.name}
                    placeholder="Street Address"
                    className={cn(
                      "ring-accent/50 bg-accent/10 focus:ring-accent/80 shadow-accent/30 w-full rounded-full py-3 ps-12 shadow-md ring transition-all duration-200 ease-in-out focus:ring focus:outline-none",
                      fieldState.error && "ring-error",
                    )}
                  />
                </div>

                {fieldState.error && (
                  <span className="text-error text-sm font-medium">
                    {fieldState.error.message}
                  </span>
                )}
              </div>
            )}
          />

          <Controller
            control={form.control}
            name="areaNeighborhood"
            render={({ field, fieldState }) => (
              <fieldset>
                <label
                  htmlFor={field.name}
                  className="text-text text-sm font-medium"
                >
                  Area/Neighborhood
                </label>
                <div className="group relative">
                  <div className="border-r-accent/50 absolute inset-y-0 left-10 flex items-center border-r-2"></div>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <MapIcon className="group-focus-within:text-accent text-accent transition-all duration-200 ease-in-out group-focus-within:animate-pulse" />
                  </div>
                  <input
                    type="text"
                    {...field}
                    id={field.name}
                    placeholder="e.g., Nyali, Bamburi, Likoni, etc."
                    className={cn(
                      "ring-accent/50 bg-accent/10 focus:ring-accent/80 shadow-accent/30 w-full rounded-full py-3 ps-12 shadow-md ring transition-all duration-200 ease-in-out focus:ring focus:outline-none",
                      fieldState.error && "ring-error",
                    )}
                  />
                </div>

                {fieldState.error && (
                  <span className="text-error text-sm font-medium">
                    {fieldState.error.message}
                  </span>
                )}
              </fieldset>
            )}
          />

          <Controller
            control={form.control}
            name={"phoneNumber"}
            render={({ field, fieldState }) => (
              <fieldset>
                <label
                  htmlFor={field.name}
                  className="text-text text-sm font-medium"
                >
                  Mobile Number
                </label>
                <div className="group relative">
                  <div className="border-r-accent/50 absolute inset-y-0 left-10 flex items-center border-r-2"></div>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Phone className="group-focus-within:text-accent text-accent transition-all duration-200 ease-in-out group-focus-within:animate-pulse" />
                  </div>
                  <input
                    type="tel"
                    {...field}
                    id={field.name}
                    placeholder="+254 700 000 000"
                    className={cn(
                      "ring-accent/50 bg-accent/10 focus:ring-accent/80 shadow-accent/30 w-full rounded-full py-3 ps-12 shadow-md ring transition-all duration-200 ease-in-out focus:ring focus:outline-none",
                      fieldState.error && "ring-error",
                    )}
                  />
                </div>

                {fieldState.error && (
                  <span className="text-error text-sm font-medium">
                    {fieldState.error.message}
                  </span>
                )}
              </fieldset>
            )}
          />
        </fieldset>
      </Fade>

      <div className="mt-8 flex w-full flex-col items-center gap-4 px-8 md:flex-row">
        <Button
          onClick={() => router.push("/menu")}
          className="group bg-secondary/10 ring-secondary/50 text-text flex w-full items-center justify-center font-medium uppercase ring transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 md:w-auto"
        >
          <ArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1 group-active:-translate-x-1" />{" "}
          Back to Menu
        </Button>

        <Button
          buttonType="submit"
          className={cn(
            "group flex w-full items-center justify-center uppercase transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 md:w-auto",
            formState.errors.root && "cursor-not-allowed opacity-50",
            isVerifying && "cursor-not-allowed opacity-50",
          )}
        >
          {isVerifying ? (
            <span className="mr-2">Saving your Details...</span>
          ) : (
            <>
              <span>Save & Continue </span>
              <ArrowRight className="transition-transform duration-200 group-hover:-translate-x-1 group-active:-translate-x-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ContactAddress;
