import { NextUIProvider } from "@nextui-org/react";
import type { Metadata } from "next";

import { APP_NAME } from "@/shared/constants/appInfo";
import { ToastProvider } from "@/shared/providers/ToastProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: "To beautiful musics world.",
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
