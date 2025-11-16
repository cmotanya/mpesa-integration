import "./globals.css";
import { grotesk, sora } from "@/utils/font";
import { siteMetaData } from "@/data/metadata";
import { AppToast } from "@/utils/toast";

export const metadata = siteMetaData;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${grotesk.variable} ${sora.variable} antialiased`}>
        <AppToast />
        {children}
      </body>
    </html>
  );
}
