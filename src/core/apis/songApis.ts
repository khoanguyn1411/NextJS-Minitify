"use server";

import { type Song } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { appPrisma } from "@/shared/configs/prisma.config";
import { createPagination } from "@/shared/utils/createPagination";
import { createPrismaPaginationFilter } from "@/shared/utils/createPrismaPaginationFilter";
import { createPrismaRequest } from "@/shared/utils/createPrismaRequest";
import { determineConnectField } from "@/shared/utils/determineConnectFields";
import { validateWithSchema } from "@/shared/utils/errorHandlers";
import { getMp3Duration } from "@/shared/utils/getMp3Duration";

import { type BaseFilterParams } from "../models/baseFilterParams";
import { SongData } from "../models/songData";

async function findCurrentSong(songId: Song["id"]) {
  const currentSong = await appPrisma.song.findUnique({
    where: {
      id: songId,
    },
    select: {
      artists: {
        select: {
          id: true,
        },
      },
      tags: {
        select: {
          id: true,
        },
      },
    },
  });
  return currentSong;
}

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
            playlistId: null,
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
        const duration = await getMp3Duration(`public${data.song}`);
        const currentSong = await findCurrentSong(songId);

        const artistConnect = determineConnectField({
          currentFieldIds:
            currentSong?.artists.map((artist) => artist.id) ?? [],
          newFieldIds: data.artistIds.map((option) => option.value),
        });

        const tagConnect = determineConnectField({
          currentFieldIds: currentSong?.tags.map((artist) => artist.id) ?? [],
          newFieldIds: data.tagIds.map((option) => option.value),
        });

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
            artists: artistConnect,
            tags: tagConnect,
          },
        });
        const [songs] = await Promise.all([createSongRequest]);

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
      include: {
        artists: true,
        album: true,
        tags: true,
      },
    });

    return createPagination({
      pagination: pagination,
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
  });
}

export type ISong = Awaited<ReturnType<typeof getSongs>>["items"][0];
