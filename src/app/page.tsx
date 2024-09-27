import { type Metadata } from "next";

import { ChillingSongs } from "@/shared/components/home/ChillingSongs";
import { ForYou } from "@/shared/components/home/ForYou";
import { HotAlbums } from "@/shared/components/home/HotAlbums";
import { MainLayout } from "@/shared/layouts/MainLayout";
import { getCurrentUser } from "@/shared/services/authService";
import { FamousArtists } from "@/shared/components/home/FamousArtists";

export const metadata: Metadata = {
  title: "Minitify",
  description: "To beautiful musics world.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default async function Home() {
  const currentUser = await getCurrentUser();
  return (
    <MainLayout user={currentUser}>
      <div className="flex flex-col gap-2">
        <ForYou />
        <ChillingSongs />
        <HotAlbums />
        <FamousArtists />
      </div>
    </MainLayout>
  );
}
