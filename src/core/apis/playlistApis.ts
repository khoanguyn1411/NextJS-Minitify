"use server";

import { type Playlist, type Song } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { appPrisma } from "@/shared/configs/prisma.config";
import { createPagination } from "@/shared/utils/createPagination";
import { createPrismaPaginationFilter } from "@/shared/utils/createPrismaPaginationFilter";
import { createPrismaRequest } from "@/shared/utils/createPrismaRequest";
import { validateWithSchema } from "@/shared/utils/errorHandlers";

import { PlaylistData } from "../models/playListData";
import { type PlaylistsFilterParams } from "../models/playlistsFilterParams";

export async function getPlaylists(pagination: PlaylistsFilterParams) {
  return createPrismaRequest(async () => {
    console.log({ idIncluded: pagination.songIdIncluded });
    const paginationFilters = createPrismaPaginationFilter(pagination);
    const filters: Parameters<typeof appPrisma.playlist.findMany>[0] = {
      where: {
        name: { contains: pagination.search },
      },
    };
    const playlists = await appPrisma.playlist.findMany({
      ...paginationFilters,
      ...filters,
      include: {
        songs: {
          select: {
            id: true, // Only select the song ID to optimize the query
          },
        },
        _count: true,
      },
    });

    const finalResult = playlists.map((playlist) => ({
      ...playlist,
      isSongIncludedIn: playlist.songs.some(
        (song) => song.id === pagination.songIdIncluded,
      ),
    }));

    return createPagination({
      pagination: pagination,
      result: finalResult,
      model: "playlist",
      filters,
    });
  });
}

export async function getPlaylistById(playlistId: Playlist["id"]) {
  return createPrismaRequest(async () => {
    const playlist = await appPrisma.playlist.findUnique({
      where: {
        id: playlistId,
      },
      include: {
        _count: true,
      },
    });
    return playlist;
  });
}

export async function createPlaylist(data: PlaylistData.ServerType) {
  return createPrismaRequest(() => {
    return validateWithSchema({
      data: data,
      schema: PlaylistData.serverSchema,
      async onPassed(data) {
        const playlist = await appPrisma.playlist.create({
          data: {
            name: data.name,
            description: data.description,
            userId: data.userId,
            imageUrl: data.image,
          },
        });
        revalidatePath("/library");
        return playlist;
      },
    });
  });
}

export async function addSongsToPlaylists(
  playlistIds: Playlist["id"][],
  songIds: Song["id"][],
) {
  return createPrismaRequest(async () => {
    const updates = playlistIds.map(async (playlistId) => {
      return appPrisma.playlist.update({
        where: { id: playlistId },
        data: {
          songs: {
            set: songIds.map((id) => ({ id })),
          },
        },
      });
    });

    await Promise.all(updates);
    revalidatePath("/library");
  });
}

export async function removeSongsFromPlaylists(
  playlistIds: Playlist["id"][],
  songIds: Song["id"][],
) {
  return createPrismaRequest(async () => {
    const updates = playlistIds.map(async (playlistId) => {
      return appPrisma.playlist.update({
        where: { id: playlistId },
        data: {
          songs: {
            disconnect: songIds.map((id) => ({ id })),
          },
        },
      });
    });

    await Promise.all(updates);
    revalidatePath("/library");
  });
}

export async function updatePlaylist(
  playlistId: Playlist["id"],
  data: PlaylistData.ServerType,
) {
  return createPrismaRequest(() => {
    return validateWithSchema({
      data: data,
      schema: PlaylistData.serverSchema,
      async onPassed(data) {
        const playlist = await appPrisma.playlist.updateMany({
          where: {
            id: playlistId,
          },
          data: {
            name: data.name,
            description: data.description,
          },
        });
        revalidatePath("/library");
        return playlist;
      },
    });
  });
}

export type IPlaylist = Awaited<ReturnType<typeof getPlaylists>>["items"][0];
