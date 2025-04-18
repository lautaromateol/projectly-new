import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs"
import { ClientProvider } from "@/providers/query-client-provider";
import { ModalsProvider } from "@/providers/modals-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Projectly",
  description: "Dev's oriented project management app. Developed by Lautaro Leguizamón.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProvider>
          <ClerkProvider>
            <ModalsProvider />
            <Toaster />
            {children}
          </ClerkProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
