import { getPlaylists } from "@/core/apis/playlistApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { SquarePlaylistView } from "@/shared/components/items-view/SquarePlaylistView";
import { SectionWithTitle } from "@/shared/components/SectionWithTitle";

export default async function Page() {
  const playlistsPage = await getPlaylists({
    ...BaseFilterParams.initialPagination,
    pageSize: 99999,
    search: "",
  });
  return (
    <div className="p-container">
      <SectionWithTitle title="Your playlists">
        {playlistsPage.items.map((playlist) => (
          <SquarePlaylistView key={playlist.id} playlist={playlist} />
        ))}
      </SectionWithTitle>
    </div>
  );
}
