import { NextUIProvider } from "@nextui-org/react";
import type { Metadata } from "next";

import { ToastProvider } from "@/shared/providers/ToastProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextUIProvider>
          <ToastProvider>{children}</ToastProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
