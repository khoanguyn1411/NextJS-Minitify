"use server";

import { type Playlist, type Song } from "@prisma/client";

import { appPrisma } from "@/shared/configs/prisma.config";
import { createPagination } from "@/shared/utils/createPagination";
import { createPrismaPaginationFilter } from "@/shared/utils/createPrismaPaginationFilter";
import { createPrismaRequest } from "@/shared/utils/createPrismaRequest";
import { validateWithSchema } from "@/shared/utils/errorHandlers";

import { type BaseFilterParams } from "../models/baseFilterParams";
import { PlaylistData } from "../models/playListData";

export async function getPlaylists(pagination: BaseFilterParams.Combined) {
  return createPrismaRequest(async () => {
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
        _count: true,
      },
    });

    return createPagination({
      pagination: pagination,
      result: playlists,
      model: "playlist",
      filters,
    });
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
          },
        });
        return playlist;
      },
    });
  });
}

export async function addSongToPlaylists(
  playlistId: Playlist["id"],
  songIds: Song["id"][],
) {
  return createPrismaRequest(() => {
    appPrisma.playlist.update({
      where: {
        id: playlistId,
      },
      data: {
        songs: {
          connect: songIds.map((id) => ({ id })),
        },
      },
    });
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
        return playlist;
      },
    });
  });
}

export type IPlaylist = Awaited<ReturnType<typeof getPlaylists>>["items"][0];
