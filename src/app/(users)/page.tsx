import { ChillingSongs } from "@/shared/components/home/ChillingSongs";
import { FamousArtists } from "@/shared/components/home/FamousArtists";
import { ForYou } from "@/shared/components/home/ForYou";
import { HotAlbums } from "@/shared/components/home/HotAlbums";

export default async function Home() {
  return (
    <div className="flex flex-col gap-2 p-container">
      <ForYou />
      <ChillingSongs />
      <HotAlbums />
      <FamousArtists />
    </div>
  );
}
