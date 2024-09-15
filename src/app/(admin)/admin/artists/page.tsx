"use client";

import { ArtistCreationModal } from "@/shared/components/admin/ArtistCreationModal";
import { ArtistsTable } from "@/shared/components/admin/artistTable/ArtistsTable";
import { AdminTableLayout } from "@/shared/layouts/AdminTableLayout";

export default function Page() {
  return <AdminTableLayout Modal={ArtistCreationModal} Table={ArtistsTable} />;
}
