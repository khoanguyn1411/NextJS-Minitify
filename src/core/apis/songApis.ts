"use server";

import { type Prisma, type Song } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { appPrisma } from "@/shared/configs/prisma.config";
import { createPagination } from "@/shared/utils/createPagination";
import { createPrismaPaginationFilter } from "@/shared/utils/createPrismaPaginationFilter";
import { createPrismaRequest } from "@/shared/utils/createPrismaRequest";
import { validateWithSchema } from "@/shared/utils/errorHandlers";
import { getMp3Duration } from "@/shared/utils/getMp3Duration";

import { SongData } from "../models/songData";
import { type SongsFilterParams } from "../models/songsFilterParams";

export async function createSong(data: SongData.ServerType) {
  return createPrismaRequest(() => {
    return validateWithSchema({
      data: data,
      schema: SongData.serverSchema,
      async onPassed(data) {
        const duration = await getMp3Duration(data.song);
        const createSongRequest = appPrisma.song.create({
          data: {
            name: data.name,
            imageUrl: data.image,
            albumId: data.albumId?.value ?? null,
            duration: duration,
            songUrl: data.song,
            artists: {
              connect: data.artistIds.map((option) => ({ id: option.value })),
            },
            tags: {
              connect: data.tagIds.map((option) => ({ id: option.value })),
            },
            playTime: 0,
          },
        });
        const [songs] = await Promise.all([createSongRequest]);

        revalidatePath("/admin/songs"); // This will re-fetch the song list
        return songs;
      },
    });
  });
}

export async function updateSong(
  songId: Song["id"],
  data: SongData.ServerType,
) {
  return createPrismaRequest(() => {
    return validateWithSchema({
      data: data,
      schema: SongData.serverSchema,
      async onPassed(data) {
        const duration = await getMp3Duration(data.song);
        const createSongRequest = appPrisma.song.update({
          where: {
            id: songId,
          },
          data: {
            name: data.name,
            imageUrl: data.image,
            albumId: data.albumId?.value ?? null,
            duration: duration,
            songUrl: data.song,
            artists: {
              set: data.artistIds.map((option) => ({ id: option.value })),
            },
            tags: {
              set: data.tagIds.map((option) => ({ id: option.value })), //
            },
          },
        });
        const [songs] = await Promise.all([createSongRequest]);

        revalidatePath("/admin/songs"); // This will re-fetch the song list
        return songs;
      },
    });
  });
}

export async function getSongs(filterParams: SongsFilterParams) {
  return createPrismaRequest(async () => {
    const paginationFilters = createPrismaPaginationFilter(filterParams);
    const orderByFields: Parameters<typeof appPrisma.song.findMany>[0] = {
      orderBy: {},
    };

    const filters: Parameters<typeof appPrisma.song.findMany>[0] = {
      where: {
        name: { contains: filterParams.search },
        albumId: filterParams.albumId,
        playlists: filterParams.playlistId
          ? {
              some: {
                id: filterParams.playlistId,
              },
            }
          : undefined,
        tags: filterParams.tagIds
          ? {
              some: {
                id: { in: filterParams.tagIds },
              },
            }
          : undefined,
        artists: filterParams.artistIds
          ? {
              some: {
                id: { in: filterParams.artistIds },
              },
            }
          : undefined,
      },
    };
    const songs = await appPrisma.song.findMany({
      ...paginationFilters,
      ...orderByFields,
      ...filters,
      include: {
        artists: true,
        album: true,
        tags: true,
      },
    });

    return createPagination({
      pagination: filterParams,
      result: songs,
      model: "song",
      filters,
    });
  });
}

export async function deleteSongById(songId: Song["id"]) {
  return createPrismaRequest(async () => {
    await appPrisma.song.delete({
      where: {
        id: songId,
      },
    });
    revalidatePath("/admin/songs"); // This will re-fetch the song list
  });
}

export async function increaseSongPlaytime(songId: Song["id"]) {
  return createPrismaRequest(async () => {
    await appPrisma.song.update({
      where: {
        id: songId,
      },
      data: {
        playTime: {
          increment: 1,
        },
      },
    });
  });
}

export type ISong = Awaited<ReturnType<typeof getSongs>>["items"][0];
export type SongSortOptions = Prisma.SongOrderByWithRelationInput;
