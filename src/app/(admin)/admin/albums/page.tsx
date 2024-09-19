import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { AlbumCreationButton } from "@/shared/components/admin/albums/AlbumCreationButton";
import { AlbumsTableServer } from "@/shared/components/admin/albums/AlbumsTableServer";
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
      title="Albums"
      Table={<AlbumsTableServer filters={filters} />}
      Action={<AlbumCreationButton />}
      initialSearch={filters.search}
    />
  );
}
