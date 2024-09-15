import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { ArtistCreationButton } from "@/shared/components/admin/artists/ArtistCreationButton";
import { ArtistInputSearch } from "@/shared/components/admin/artists/ArtistInputSearch";
import { ArtistsTableServer } from "@/shared/components/admin/artists/ArtistTableServer";

export default function Page({
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const filters: BaseFilterParams.Combined = {
    search: searchParams.search?.toString() ?? "",
    pageNumber: searchParams.pageNumber
      ? Number(searchParams.pageNumber)
      : BaseFilterParams.initialPagination.pageNumber,
    pageSize: searchParams.pageSize
      ? Number(searchParams.pageSize)
      : BaseFilterParams.initialPagination.pageSize,
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex gap-2 justify-between items-center">
          <h1 className="text-xl font-semibold">Artists</h1>
          <div className="flex gap-4">
            <ArtistInputSearch />
            <ArtistCreationButton />
          </div>
        </div>
        <ArtistsTableServer filters={filters} />
      </div>
    </>
  );
}
