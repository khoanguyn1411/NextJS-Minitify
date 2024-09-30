"use server";

import { type Artist } from "@prisma/client";
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
            name: data.name,
            biography: data.biography,
            imageUrl: data.image,
          },
        });
        revalidatePath("/admin/artists"); // This will re-fetch the artist list
        return artist;
      },
    });
  });
}

export async function updateArtist(
  artistId: Artist["id"],
  data: ArtistData.ServerType,
) {
  return createPrismaRequest(() => {
    return validateWithSchema({
      data: data,
      schema: ArtistData.serverSchema,
      async onPassed(data) {
        const artist = await appPrisma.artist.updateMany({
          where: {
            id: artistId,
          },
          data: {
            name: data.name,
            biography: data.biography,
            imageUrl: data.image,
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
        name: { contains: pagination.search },
      },
    };
    const artists = await appPrisma.artist.findMany({
      ...paginationFilters,
      ...filters,
      include: {
        _count: true,
      },
    });

    return createPagination({
      pagination: pagination,
      result: artists,
      model: "artist",
      filters,
    });
  });
}

export async function getArtistById(artistId: Artist["id"]) {
  return createPrismaRequest(async () => {
    const totalPlayTime = await appPrisma.song.aggregate({
      _sum: {
        playTime: true,
      },
      where: {
        artists: {
          some: {
            id: artistId,
          },
        },
      },
    });

    const artist = await appPrisma.artist.findUnique({
      where: {
        id: artistId,
      },
    });
    return artist == null
      ? null
      : { ...artist, totalPlayTime: totalPlayTime._sum.playTime };
  });
}

export async function deleteArtistById(artistId: Artist["id"]) {
  return createPrismaRequest(async () => {
    await appPrisma.artist.delete({
      where: {
        id: artistId,
      },
    });
    revalidatePath("/admin/artists"); // This will re-fetch the artist list
  });
}

export type IArtist = Awaited<ReturnType<typeof getArtists>>["items"][0];
export type IArtistDetail = Awaited<ReturnType<typeof getArtistById>>;
