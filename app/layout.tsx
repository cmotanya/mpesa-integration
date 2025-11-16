import "./globals.css";
import { grotesk, sora } from "@/utils/font";
import { siteMetaData } from "@/data/metadata";
import { AppToast } from "@/utils/toast";
import { Footer } from "./footer";

export const metadata = siteMetaData;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${grotesk.variable} ${sora.variable} relative min-h-screen antialiased`}
      >
        <AppToast />
        {children}
        <Footer />
      </body>
    </html>
  );
}
