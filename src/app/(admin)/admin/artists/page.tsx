import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { ArtistCreationButton } from "@/shared/components/admin/artists/ArtistCreationButton";
import { ArtistsTableServer } from "@/shared/components/admin/artists/ArtistTableServer";
import { AdminTableLayout } from "@/shared/layouts/AdminTableLayout";

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
    <AdminTableLayout
      Table={<ArtistsTableServer filters={filters} />}
      Action={<ArtistCreationButton />}
      initialSearch={filters.search}
    />
  );
}
