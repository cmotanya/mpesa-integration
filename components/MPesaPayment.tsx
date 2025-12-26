"use client";

import { Button } from "./button";
import Image from "next/image";

export const MPesaPayment = ({ isProcessing }: { isProcessing: boolean }) => {
  const ImgSrc =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png?20191120100524";

  return (
    <div className="w-full">
      <Button className="hover:bg-mpesa-hover/20 text-mpesa ring-mpesa bg-mpesa/10 flex w-full justify-center py-1.5 font-bold uppercase ring-2 transition-transform duration-200 hover:scale-105 active:scale-95">
        {isProcessing ? (
          "Processing Payment..."
        ) : (
          <div>
            {"Pay with "}
            <Image src={ImgSrc} alt="M-PESA Logo" width={80} height={60} />
          </div>
        )}
      </Button>
    </div>
  );
};
