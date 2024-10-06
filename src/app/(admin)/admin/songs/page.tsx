import { type Metadata } from "next";

import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { SongCreationButton } from "@/shared/components/admin/songs/SongCreationButton";
import { SongsTableServer } from "@/shared/components/admin/songs/SongTableServer";
import { AdminTableLayout } from "@/shared/layouts/AdminTableLayout";

export const metadata: Metadata = {
  title: "Songs",
};

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
      title="Songs"
      Table={<SongsTableServer filters={filters} />}
      Action={<SongCreationButton />}
      initialSearch={filters.search}
    />
  );
}
