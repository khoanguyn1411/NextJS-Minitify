"use server";

import { type Album } from "@prisma/client";
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
            artistId: data.artistId?.value,
            imageUrl: data.image,
          },
        });
        revalidatePath("/admin/albums"); // This will re-fetch the albums list
        return artist;
      },
    });
  });
}

export async function updateAlbum(id: Album["id"], data: AlbumData.ServerType) {
  return createPrismaRequest(() => {
    return validateWithSchema({
      data: data,
      schema: AlbumData.serverSchema,
      async onPassed(data) {
        const album = await appPrisma.album.update({
          where: {
            id,
          },
          data: {
            name: data.name,
            description: data.description,
            songs: {
              set: data.songIds.map((option) => ({ id: option.value })),
            },
            artistId: data.artistId?.value,
            imageUrl: data.image,
          },
        });
        revalidatePath("/admin/albums"); // This will re-fetch the albums list
        return album;
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

export async function getAlbumById(albumId: Album["id"]) {
  return createPrismaRequest(async () => {
    const album = await appPrisma.album.findUnique({
      where: {
        id: albumId,
      },
      include: {
        songs: true,
        artist: true,
      },
    });
    return album;
  });
}

export async function deleteAlbumId(albumId: Album["id"]) {
  return createPrismaRequest(async () => {
    await appPrisma.album.delete({
      where: {
        id: albumId,
      },
    });
    revalidatePath("/admin/albums"); // This will re-fetch the albums list
  });
}

export type IAlbum = Awaited<ReturnType<typeof getAlbums>>["items"][0];
