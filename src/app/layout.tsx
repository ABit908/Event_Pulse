import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProviderWrapper from "@/components/provider-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EventPulse | Management Portal",
  description: "Manage events and attendees with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ProviderWrapper>
          <main className="min-h-screen bg-background">
            {children}
          </main>
        </ProviderWrapper>
      </body>
    </html>
  );
}