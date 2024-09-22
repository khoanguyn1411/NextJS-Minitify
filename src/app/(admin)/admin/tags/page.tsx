import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { TagCreationButton } from "@/shared/components/admin/tags/TagCreationButton";
import { TagsTableServer } from "@/shared/components/admin/tags/TagsTableServer";
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
      title="Tags"
      Table={<TagsTableServer filters={filters} />}
      Action={<TagCreationButton />}
      initialSearch={filters.search}
    />
  );
}
