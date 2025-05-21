import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { cn } from "@/lib/utils";
import ClientBody from "./ClientBody";

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['500', '600', '700', '800'],
  subsets: ["latin"],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Pnyx Institute - Empowering Future Innovators",
  description: "Join Pnyx Institute to gain cutting-edge skills in technology and design through innovative courses and expert-led bootcamps.",
  icons: {
    icon: [
      { url: '/phoenix-logo.svg' }
    ],
    apple: [
      { url: '/phoenix-logo.svg' }
    ]
  },
  openGraph: {
    title: "Pnyx Institute - Empowering Future Innovators",
    description: "Gain cutting-edge skills through Pnyx Institute's innovative courses.",
    type: "website",
    url: "https://www.pnyxinstitute.com", // Placeholder URL
    images: [{ url: "/phoenix-logo.svg" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Pnyx Institute - Empowering Future Innovators",
    description: "Gain cutting-edge skills through Pnyx Institute's innovative courses.",
    images: ["/phoenix-logo.svg"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add your analytics tracking scripts here (e.g., Google Analytics, Plausible) */}
      </head>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased flex flex-col",
        inter.variable,
        poppins.variable
      )}>
        <ClientBody>
          <Header />
          <main className="flex-grow w-full overflow-x-hidden">{children}</main>
          <Footer />
        </ClientBody>
      </body>
    </html>
  );
}
