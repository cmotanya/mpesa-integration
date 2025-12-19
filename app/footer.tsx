import CustomLink from "@/components/CustomLink";
import { Mail, Phone, Clock, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-accent/10 border-accent/20 mt-auto w-full border-t">
      <div className="container grid grid-cols-1 gap-8 px-4 py-8 md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <h3 className="text-text/80 font-bold tracking-wide uppercase">
            About Us
          </h3>

          <div className="text-text/70 flex flex-col gap-1.5 text-sm">
            <CustomLink href="/about">Our Story</CustomLink>
            <CustomLink href="/restaurant">Partner Restaurant</CustomLink>
            <CustomLink href="/careers">Career</CustomLink>
            <CustomLink href="/blog">Blog & News</CustomLink>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-text/80 font-bold tracking-wide uppercase">
            Need Help?
          </h3>

          <div className="text-text/70 flex flex-col gap-2 text-sm">
            <CustomLink href="mailto:support@food.com" Icon={Mail}>
              support@food.com
            </CustomLink>
            <CustomLink href="tel:070-000-0000" Icon={Phone}>
              {" "}
              070-000-0000
            </CustomLink>
          </div>
        </div>

        <div className="text-text/70 flex items-center gap-2 text-sm">
          <Clock />
          24/7 Customer Service
        </div>

        <div className="space-y-2">
          <h3 className="text-text/80 font-bold tracking-wide uppercase">
            Quick Links
          </h3>

          <div className="text-text/70 flex flex-col gap-2 text-sm">
            <CustomLink href="/faqs">FAQS</CustomLink>
            <CustomLink href="/terms">Terms of Service</CustomLink>
            <CustomLink href="/privacy-policy">Privacy Policy</CustomLink>
            <CustomLink href="/refund">Refund Policy</CustomLink>
          </div>
        </div>
      </div>

      <div className="border-secondary/40 text-text/80 mt-4 flex flex-col items-center justify-center border-t py-5 text-sm">
        <p>&copy; {new Date().getFullYear()} Food. All rights reserved</p>

        <p>
          Made with{" "}
          <Heart className="fill-error text-error inline-block animate-pulse" />{" "}
          by <a href="https://github.com/cmotanya">Cornelius Motanya</a>
        </p>
      </div>
    </footer>
  );
};
