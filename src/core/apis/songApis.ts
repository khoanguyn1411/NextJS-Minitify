"use server";

import { revalidatePath } from "next/cache";

import { appPrisma } from "@/shared/configs/prisma.config";
import { createPagination } from "@/shared/utils/createPagination";
import { createPrismaPaginationFilter } from "@/shared/utils/createPrismaPaginationFilter";
import { createPrismaRequest } from "@/shared/utils/createPrismaRequest";
import { validateWithSchema } from "@/shared/utils/errorHandlers";

import { type BaseFilterParams } from "../models/baseFilterParams";
import { SongData } from "../models/songData";

export async function createSong(data: SongData.ServerType) {
  return createPrismaRequest(() => {
    return validateWithSchema({
      data: data,
      schema: SongData.serverSchema,
      async onPassed(data) {
        const songs = await appPrisma.song.create({
          data: {
            name: data.name,
            imageUrl: data.image,
            albumId: data.albumId,
            duration: 100,
            songUrl: data.song,
            artists: {
              connect: data.artistIds.map((option) => ({ id: option.value })),
            },
            playTime: 0,
            playlistId: null,
          },
        });
        revalidatePath("/songs"); // This will re-fetch the artist list
        return songs;
      },
    });
  });
}

export async function getSongs(pagination: BaseFilterParams.Combined) {
  return createPrismaRequest(async () => {
    const paginationFilters = createPrismaPaginationFilter(pagination);
    const filters: Parameters<typeof appPrisma.song.findMany>[0] = {
      where: {
        name: { contains: pagination.search },
      },
    };
    const songs = await appPrisma.song.findMany({
      ...paginationFilters,
      ...filters,
    });

    return createPagination({
      pagination: pagination,
      result: songs,
      model: "song",
      filters,
    });
  });
}
