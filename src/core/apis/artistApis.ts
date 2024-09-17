"use server";

import { revalidatePath } from "next/cache";

import { appPrisma } from "@/shared/configs/prisma.config";
import { createPagination } from "@/shared/utils/createPagination";
import { createPrismaPaginationFilter } from "@/shared/utils/createPrismaPaginationFilter";
import { createPrismaRequest } from "@/shared/utils/createPrismaRequest";
import { validateWithSchema } from "@/shared/utils/errorHandlers";

import { ArtistData } from "../models/artistData";
import { type BaseFilterParams } from "../models/baseFilterParams";

export async function createArtist(data: ArtistData.ServerType) {
  return createPrismaRequest(() => {
    return validateWithSchema({
      data: data,
      schema: ArtistData.serverSchema,
      async onPassed(data) {
        const artist = await appPrisma.artist.create({
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            biography: data.biography,
            imageUrl: data.image,
            songCount: 0,
          },
        });
        revalidatePath("/admin/artists"); // This will re-fetch the artist list
        return artist;
      },
    });
  });
}

export async function getArtists(pagination: BaseFilterParams.Combined) {
  return createPrismaRequest(async () => {
    const paginationFilters = createPrismaPaginationFilter(pagination);
    const filters: Parameters<typeof appPrisma.artist.findMany>[0] = {
      where: {
        fullName: { contains: pagination.search },
      },
    };
    const artists = await appPrisma.artist.findMany({
      ...paginationFilters,
      ...filters,
    });

    return createPagination({
      pagination: pagination,
      result: artists,
      model: "artist",
      filters,
    });
  });
}
