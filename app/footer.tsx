import { Lock } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-accent/20 flex w-full flex-col items-center justify-center gap-1 p-2 text-xs font-medium">
      <p className="flex gap-1">
        <Lock size={14} /> Your payment is secure and encrypted.
      </p>
      <p>Need help? Contact us at oak-kitchen-support@food.com</p>
    </footer>
  );
};
