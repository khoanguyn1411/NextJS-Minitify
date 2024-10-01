import { getSongs } from "@/core/apis/songApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { TrendingMusic } from "@/shared/components/trending-musics/TrendingMusic";

export default async function Page() {
  const songsPage = await getSongs({
    ...BaseFilterParams.initialPagination,
    sortOptions: {
      playTime: "desc",
    },
    pageSize: 5,
    search: "",
  });

  return (
    <div className="p-container">
      <TrendingMusic songsPage={songsPage} />
    </div>
  );
}
