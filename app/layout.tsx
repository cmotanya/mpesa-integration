import "./globals.css";
import { grotesk, sora } from "@/utils/font";
import { siteMetaData } from "@/data/metadata";
import { AppToast } from "@/utils/toast";
import { Footer } from "./footer";
import { CartProvider } from "@/contexts/CartContext";
import Header from "./header/page";

export const metadata = siteMetaData;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${grotesk.variable} ${sora.variable} flex min-h-screen flex-col antialiased`}
      >
        <CartProvider>
          <AppToast />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
