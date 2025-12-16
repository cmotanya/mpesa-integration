"use client";

import { Button } from "@/components/button";
import { cn } from "@/utils/cn";
import {
  ArrowLeft,
  ArrowRight,
  MapIcon,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";

const DeliveryAddressPage = () => {
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const handleLocationClick = () => {
    setUseCurrentLocation(!useCurrentLocation);

    setTimeout(() => {
      window.scrollTo(0, 0);

      setUseCurrentLocation(false);
    }, 2000);
  };

  return (
    <div className="container my-8 flex min-h-screen w-full flex-col gap-8">
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
          useCurrentLocation && "pointer-events-none opacity-50",
        )}
      >
        <Fade cascade duration={100} delay={200} direction="down" damping={0.5}>
          <div className="flex items-center justify-center">
            <Button
              onClick={handleLocationClick}
              className="active:95 transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md"
            >
              <Navigation
                className={cn("mr-2", useCurrentLocation && "animate-spin")}
                size={20}
              />
              {useCurrentLocation
                ? "Getting Current Location..."
                : "Use Current Location"}
            </Button>
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

        <div className="flex flex-col gap-4 px-4">
          <Fade cascade duration={100} delay={400} direction="up" damping={0.5}>
            <div>
              <label htmlFor="" className="text-text text-sm font-medium">
                Street Address
              </label>
              <div className="group relative">
                <div className="border-r-accent/50 absolute inset-y-0 left-10 flex items-center border-r-2"></div>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <MapPin className="group-focus-within:text-accent text-accent transition-all duration-200 ease-in-out group-focus-within:animate-pulse" />
                </div>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Street Address"
                  className="ring-accent/50 bg-accent/10 focus:ring-accent/80 shadow-accent/30 w-full rounded-full py-3 ps-12 shadow-md ring transition-all duration-200 ease-in-out focus:ring focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="" className="text-text text-sm font-medium">
                Area/Neighborhood
              </label>
              <div className="group relative">
                <div className="border-r-accent/50 absolute inset-y-0 left-10 flex items-center border-r-2"></div>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <MapIcon className="group-focus-within:text-accent text-accent transition-all duration-200 ease-in-out group-focus-within:animate-pulse" />
                </div>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="e.g., Nyali, Bamburi, Likoni, etc."
                  className="ring-accent/50 bg-accent/10 focus:ring-accent/80 shadow-accent/30 w-full rounded-full py-3 ps-12 shadow-md ring transition-all duration-200 ease-in-out focus:ring focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="" className="text-text text-sm font-medium">
                Mobile Number
              </label>
              <div className="group relative">
                <div className="border-r-accent/50 absolute inset-y-0 left-10 flex items-center border-r-2"></div>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Phone className="group-focus-within:text-accent text-accent transition-all duration-200 ease-in-out group-focus-within:animate-pulse" />
                </div>
                <input
                  type="tel"
                  placeholder="+254 700 000 000"
                  className="ring-accent/50 bg-accent/10 focus:ring-accent/80 shadow-accent/30 w-full rounded-full py-3 ps-12 shadow-md ring transition-all duration-200 ease-in-out focus:ring focus:outline-none"
                />
              </div>
            </div>
          </Fade>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 px-8 md:flex-row">
          <Fade duration={100} delay={500} direction="up">
            <Button
              href="/menu"
              className="group bg-secondary/10 ring-secondary/50 text-text flex w-full items-center justify-center font-medium uppercase ring transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 md:w-auto"
            >
              <ArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1 group-active:-translate-x-1" />{" "}
              Back to Menu
            </Button>
          </Fade>

          <Fade duration={100} delay={600} direction="up">
            <Button
              href="/checkout"
              className="group flex w-full items-center justify-center uppercase transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 md:w-auto"
            >
              Save & Continue{" "}
              <ArrowRight className="transition-transform duration-200 group-hover:-translate-x-1 group-active:-translate-x-1" />
            </Button>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddressPage;
