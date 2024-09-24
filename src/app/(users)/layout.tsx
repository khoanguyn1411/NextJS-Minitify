import { MainLayout } from "@/shared/layouts/MainLayout";
import { getCurrentUser } from "@/shared/services/authService";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return <MainLayout user={currentUser}>{children}</MainLayout>;
}
