import { getPlaylists } from "@/core/apis/playlistApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { SquarePlaylistView } from "@/shared/components/items-view/SquarePlaylistView";
import { AddPlaylistButton } from "@/shared/components/playlists/AddPlaylistButton";
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
      <SectionWithTitle
        title={
          <div className="flex gap-2 items-center justify-between">
            <h1>Your playlists</h1>
            <AddPlaylistButton />
          </div>
        }
      >
        <div className="px-3 flex">
          {playlistsPage.items.length === 0 && (
            <p>You current have no playlist.</p>
          )}
          {playlistsPage.items.length > 0 &&
            playlistsPage.items.map((playlist) => (
              <SquarePlaylistView key={playlist.id} playlist={playlist} />
            ))}
        </div>
      </SectionWithTitle>
    </div>
  );
}
