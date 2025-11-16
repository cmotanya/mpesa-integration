"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";

export const DeliveryInformation = () => {
  const [deliveryAddress] = useState("");

  return (
    <div>
      <Fade duration={150} direction="left" delay={300}>
        <h2 className="mb-2 flex items-center justify-center gap-2 text-4xl font-medium">
          {" "}
          <MapPin />
          Delivery Details
        </h2>
      </Fade>

      {deliveryAddress ? (
        <p>{deliveryAddress}</p>
      ) : (
        <div>
          <Fade duration={150} delay={400} direction="up" cascade>
            <p className="pb-1">
              Please enter your delivery address to get started.
            </p>

            <div className="shadow-secondary/5 ring-accent/30 flex flex-col gap-5 overflow-hidden rounded-lg p-2 shadow-lg ring">
              <div>
                <label htmlFor="address" className="text-text/85 font-medium">
                  Delivery Address
                </label>
                <input
                  type="text"
                  id="address"
                  placeholder="e.g., Nyali, Links Road, House No. 45"
                  className="ring-secondary/50 m-0.5 w-full rounded-lg p-2 ring"
                />
              </div>

              <div>
                <label htmlFor="notes" className="text-text/85 font-medium">
                  Delivery Instruction (Optional)
                </label>
                <textarea
                  name="notes"
                  id="notes"
                  placeholder="e.g., Gate code: 1234, Ring bell twice, Leave at door"
                  rows={3}
                  className="ring-secondary/50 mt-0.5 w-full resize-none rounded-lg p-1 ring"
                />
              </div>
            </div>
          </Fade>
        </div>
      )}
    </div>
  );
};
