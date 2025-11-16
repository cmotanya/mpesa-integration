import { Lock } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-accent/20 absolute right-0.5 bottom-0 left-0.5 flex w-full -translate-x-0.5 -translate-y-0.5 flex-col items-center justify-center gap-1 p-2 text-xs">
      <p className="flex gap-1">
        <Lock size={14} /> Your payment is secure and encrypted.
      </p>
      <p>Need help? Contact us at support@food.com</p>
    </footer>
  );
};
