"use server";

import { type Artist, type Song } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { appPrisma } from "@/shared/configs/prisma.config";
import { createPagination } from "@/shared/utils/createPagination";
import { createPrismaPaginationFilter } from "@/shared/utils/createPrismaPaginationFilter";
import { createPrismaRequest } from "@/shared/utils/createPrismaRequest";
import {
  buildAppError,
  validateWithSchema,
} from "@/shared/utils/errorHandlers";
import { getMp3Duration } from "@/shared/utils/getMp3Duration";

import { type BaseFilterParams } from "../models/baseFilterParams";
import { SongData } from "../models/songData";

async function increaseSongCountInArtist(currentArtistIds: Artist["id"][]) {
  await appPrisma.artist.updateMany({
    where: {
      id: {
        in: currentArtistIds,
      },
    },
    data: {
      songCount: {
        increment: 1,
      },
    },
  });
}

async function increaseOrDecreaseSongCountInArtist(
  songId: Song["id"],
  newArtistIds: Artist["id"][],
) {
  const currentSong = await appPrisma.song.findUnique({
    where: { id: songId },
    select: { artists: true },
  });

  if (currentSong == null) {
    return buildAppError("Invalid song ID.");
  }
  const currentArtistIds = currentSong.artists.map((artist) => artist.id);
  const addedArtistIds = newArtistIds.filter(
    (id) => !currentArtistIds.includes(id),
  );
  const removedArtistIds = currentArtistIds.filter(
    (id) => !newArtistIds.includes(id),
  );

  const updatePromises = [];

  // Increment songCount for added artist IDs
  if (addedArtistIds.length > 0) {
    updatePromises.push(increaseSongCountInArtist(addedArtistIds));
  }

  // Decrement songCount for removed artist IDs
  if (removedArtistIds.length > 0) {
    updatePromises.push(
      appPrisma.artist.updateMany({
        where: {
          id: {
            in: removedArtistIds,
          },
        },
        data: {
          songCount: {
            decrement: 1,
          },
        },
      }),
    );
  }

  await Promise.all(updatePromises);
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
        const [songs] = await Promise.all([
          createSongRequest,
          increaseSongCountInArtist(
            data.artistIds.map((option) => option.value),
          ),
        ]);

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

        const createSongRequest = appPrisma.song.update({
          where: {
            id: songId,
          },
          data: {
            name: data.name,
            imageUrl: data.image,
            albumId: data.albumId,
            duration: duration,
            songUrl: data.song,
            artists: {
              connect: data.artistIds.map((option) => ({ id: option.value })),
            },
          },
        });
        const newArtistIds = data.artistIds.map((option) => option.value);
        const [songs] = await Promise.all([
          createSongRequest,
          increaseOrDecreaseSongCountInArtist(songId, newArtistIds),
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
