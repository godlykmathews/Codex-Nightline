import type { Metadata } from "next";
import { IntroLoader } from "@/components/IntroLoader";
import "./globals.css";

export const metadata: Metadata = { title: "NEXUS // Temporal Control", description: "Alternate-history timeline console" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><IntroLoader />{children}</body></html>;
}
