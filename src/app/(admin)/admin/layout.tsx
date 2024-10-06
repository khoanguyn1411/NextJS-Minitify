import { type Metadata } from "next";

import { AdminLayout } from "@/shared/layouts/AdminLayout";

export const metadata: Metadata = {
  title: {
    template: `%s | Minitify Admin`,
    default: `Admin`,
  },
  description: "To beautiful musics world.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminLayout>{children}</AdminLayout>;
}
