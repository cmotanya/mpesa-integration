import "./globals.css";
import { grotesk, sora } from "@/utils/font";
import { siteMetaData } from "@/data/metadata";
import AppProvider from "@/providers/QueryProvider";
import Footer from "./footer";
import Header from "./header/page";
import AppToast from "@/components/AppToast";
import CartProvider from "@/contexts/CartContext";

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
        <AppProvider>
          <CartProvider>
            <AppToast />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </AppProvider>
      </body>
    </html>
  );
}
