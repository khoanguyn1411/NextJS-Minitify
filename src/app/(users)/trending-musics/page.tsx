import { getSongs } from "@/core/apis/songApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { TrendingMusic } from "@/shared/components/trending-musics/TrendingMusic";
import { TrendingSongsListView } from "@/shared/components/trending-musics/TrendingSongsListView";

export default async function Page() {
  const songsPage = await getSongs({
    ...BaseFilterParams.initialPagination,
    sortOptions: {
      playTime: "desc",
    },
    search: "",
  });

  return (
    <div className="flex flex-col gap-2">
      <TrendingMusic songsPage={songsPage} />
      <TrendingSongsListView songsPage={songsPage} />
    </div>
  );
}
