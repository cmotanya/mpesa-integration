"use client";

import { Button } from "./button";
import Image from "next/image";

export const MPesaPayment = () => {
  const ImgSrc =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png?20191120100524";

  return (
    <div>
      <Button
        onClick={() => {}}
        className="hover:bg-mpesa-hover/20 text-mpesa ring-mpesa bg-mpesa/10 mx-auto py-0.5 font-bold uppercase ring-2 transition-transform duration-200 hover:-translate-y-1 active:scale-95"
      >
        {"Pay with "}

        <Image src={ImgSrc} alt="M-PESA Logo" width={80} height={60} />
      </Button>
    </div>
  );
};
