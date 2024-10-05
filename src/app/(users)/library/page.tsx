import { getPlaylists } from "@/core/apis/playlistApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { SquarePlaylistView } from "@/shared/components/items-view/SquarePlaylistView";
import { SectionWithTitle } from "@/shared/components/SectionWithTitle";
import { validateRequest } from "@/shared/services/authService";

export default async function Page() {
  const { user } = await validateRequest();
  const playlistsPage = await getPlaylists({
    ...BaseFilterParams.initialPagination,
    userId: user?.id,
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
