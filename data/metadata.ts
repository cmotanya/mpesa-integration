import { Metadata } from "next";

export const siteMetaData: Metadata = {
  title: "Food Test Demo | Online Food Ordering",
  description:
    "A simple food ordering demo application for testing features such as menu browsing, cart, and checkout.",
  keywords: [
    "Food App",
    "Food Ordering Demo",
    "Food Test App",
    "Online Food Delivery",
    "Next.js Food App",
    "Restaurant Demo",
    "Food Menu Test",
    "Vercel Demo Project",
  ],
  authors: [{ name: "Cornelius Motanya" }],
  applicationName: "Food Test Demo",
  creator: "Cornelius Motanya",
  generator: "Next.js",
  openGraph: {
    title: "Food Test Demo | Online Food Ordering",
    description:
      "A demo food ordering system built for testing menu, cart, and ordering features.",
    url: "https://food-test-demo.vercel.app",
    siteName: "Food Test Demo",
    type: "website",
    locale: "en-US",
    images: [
      {
        url: "https://res.cloudinary.com/cornelius-motanya/image/upload/v1694985027/nextjs-food-test-demo/og-image.png",
        width: 800,
        height: 600,
      },
    ],
  },
};
