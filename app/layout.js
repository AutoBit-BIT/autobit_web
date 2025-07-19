import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { Toaster } from "react-hot-toast";
import NavBarLogOut from "@/components/NavBarLogout";
import DashboardLayout from "./(dashboard)/dashboard/layout";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AutoBit",
  description:
    "AutoBit - Empowering the next generation of developers through community-driven learning.",
  keywords: [
    "AutoBit",
    "bit",
    "bengal institute of technology",
    "college",
    "software",
    "programming",
  ],
  authors: [{ name: "AutoBit Team" }],
  creator: "AutoBit",
  publisher: "AutoBit",
  metadataBase: new URL("https://autobit-web.vercel.app/"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AutoBit",
    description:
      "AutoBit - Empowering the next generation of developers through community-driven learning..",
    url: "https://autobit-web.vercel.app/", // Replace with your actual domain
    siteName: "AutoBit",
    images: [
      {
        url: "https://autobit-web.vercel.app/logo.png", // Add your OpenGraph image
        width: 1200,
        height: 630,
        alt: "AutoBit - Empowering the next generation of developers through community-driven learning.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoBit",
    description:
      "AutoBit - Empowering the next generation of developers through community-driven learning.",
    images: ["https://autobit-web.vercel.app/logo.png"], // Add your Twitter card image
    creator: "@Hack_It_On", // Replace with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({ children }) {
  const user = await getCurrentUser();
  function getNavBar() {
    if (user) return <NavBar user={user} />;
    else return <NavBarLogOut />;
  }
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="_s0GyUxPTPMtAtVkTYKEKo41k1OpgFyW09JeR0BTV-k"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <NavBar user={user} /> */}
          {getNavBar()}
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
