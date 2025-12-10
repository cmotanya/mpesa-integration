"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";

export const DeliveryInformation = () => {
  const [deliveryAddress] = useState("");

  return (
    <div>
      <Fade duration={150} direction="left" delay={300}>
        <p className="mb-2 flex items-center justify-center gap-2 text-3xl font-medium">
          {" "}
          <MapPin />
          Delivery Details.
        </p>
      </Fade>

      {deliveryAddress ? (
        <p>{deliveryAddress}</p>
      ) : (
        <div>
          <Fade duration={150} delay={400} direction="up" cascade>
            <p className="pb-1 text-sm">
              Please enter your delivery address to proceed.
            </p>

            <div>
              <label
                htmlFor="address"
                className="text-text/85 text-sm font-bold"
              >
                Confirm Your Delivery Location
              </label>
              <textarea
                id="address"
                rows={3}
                placeholder="e.g., Nyali, Links Road, House No. 45"
                className="ring-secondary/50 focus:ring-accent/80 bg-secondary/5 m-0.5 w-full resize-none rounded-lg p-2 ring focus:ring-2"
              />
            </div>
          </Fade>
        </div>
      )}
    </div>
  );
};
