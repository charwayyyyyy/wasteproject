import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] });

export const metadata: Metadata = {
  title: "EcoLoop | Community Waste Coordination",
  description: "Responsible waste disposal should not be the hardest option. Request pickups, report waste hotspots, and find approved disposal points.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable, spaceGrotesk.variable)}>
      <body className={cn("min-h-screen bg-background font-sans antialiased text-foreground")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
