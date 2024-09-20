"use server";

import { revalidatePath } from "next/cache";

import { appPrisma } from "@/shared/configs/prisma.config";
import { createPagination } from "@/shared/utils/createPagination";
import { createPrismaPaginationFilter } from "@/shared/utils/createPrismaPaginationFilter";
import { createPrismaRequest } from "@/shared/utils/createPrismaRequest";
import { validateWithSchema } from "@/shared/utils/errorHandlers";
import { getMp3Duration } from "@/shared/utils/getMp3Duration";

import { type BaseFilterParams } from "../models/baseFilterParams";
import { SongData } from "../models/songData";

export async function createSong(data: SongData.ServerType) {
  return createPrismaRequest(() => {
    return validateWithSchema({
      data: data,
      schema: SongData.serverSchema,
      async onPassed(data) {
        const duration = await getMp3Duration(`public${data.song}`);
        const createSongRequest = appPrisma.song.create({
          data: {
            name: data.name,
            imageUrl: data.image,
            albumId: data.albumId,
            duration: duration,
            songUrl: data.song,
            artists: {
              connect: data.artistIds.map((option) => ({ id: option.value })),
            },
            playTime: 0,
            playlistId: null,
          },
        });
        const updateArtistRequest = appPrisma.artist.updateMany({
          where: {
            id: {
              in: data.artistIds.map((option) => option.value),
            },
          },
          data: {
            songCount: {
              increment: 1,
            },
          },
        });

        const [songs] = await Promise.all([
          createSongRequest,
          updateArtistRequest,
        ]);

        revalidatePath("/admin/songs"); // This will re-fetch the song list
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
