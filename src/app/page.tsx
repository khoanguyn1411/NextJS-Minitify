import { type Metadata } from "next";

import { MainLayout } from "@/shared/layouts/MainLayout";
import { getCurrentUser } from "@/shared/services/authService";

export const metadata: Metadata = {
  title: "Minitify",
  description: "To beautiful musics world.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default async function Home() {
  const currentUser = await getCurrentUser();
  return (
    <MainLayout user={currentUser}>
      <div>Home page</div>
    </MainLayout>
  );
}
