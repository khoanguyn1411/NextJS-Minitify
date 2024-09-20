"use server";

import { revalidatePath } from "next/cache";

import { appPrisma } from "@/shared/configs/prisma.config";
import { createPagination } from "@/shared/utils/createPagination";
import { createPrismaPaginationFilter } from "@/shared/utils/createPrismaPaginationFilter";
import { createPrismaRequest } from "@/shared/utils/createPrismaRequest";
import { validateWithSchema } from "@/shared/utils/errorHandlers";

import { AlbumData } from "../models/albumData";
import { type BaseFilterParams } from "../models/baseFilterParams";

export async function createAlbum(data: AlbumData.ServerType) {
  return createPrismaRequest(() => {
    return validateWithSchema({
      data: data,
      schema: AlbumData.serverSchema,
      async onPassed(data) {
        const artist = await appPrisma.album.create({
          data: {
            name: data.name,
            description: data.description,
            songs: {
              connect: data.songIds.map((option) => ({ id: option.value })),
            },
            songCount: data.songIds.length,
            artistId: data.artistId,
            imageUrl: data.image,
          },
        });
        revalidatePath("/admin/albums"); // This will re-fetch the albums list
        return artist;
      },
    });
  });
}

export async function getAlbums(pagination: BaseFilterParams.Combined) {
  return createPrismaRequest(async () => {
    const paginationFilters = createPrismaPaginationFilter(pagination);
    const filters: Parameters<typeof appPrisma.album.findMany>[0] = {
      where: {
        name: { contains: pagination.search },
      },
    };

    const result = await appPrisma.album.findMany({
      ...paginationFilters,
      ...filters,
      include: {
        artist: true,
        songs: true,
      },
    });

    return createPagination({
      pagination: pagination,
      result: result,
      model: "album",
      filters,
    });
  });
}

export type IAlbum = Awaited<ReturnType<typeof getAlbums>>["items"][0];
