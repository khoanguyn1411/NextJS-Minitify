import { MainLayout } from "@/shared/layouts/MainLayout";
import { validateRequest } from "@/shared/services/authService";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();
  return <MainLayout user={user}>{children}</MainLayout>;
}
