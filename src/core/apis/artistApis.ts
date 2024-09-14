"use server";

import { appPrisma } from "@/shared/configs/prisma.config";
import { createPrismaRequest } from "@/shared/utils/createPrismaRequest";
import { validateWithSchema } from "@/shared/utils/errorHandlers";

import { ArtistData } from "../models/artistData";

export async function createArtist(data: ArtistData.ServerType) {
  return createPrismaRequest(() => {
    return validateWithSchema({
      data: data,
      schema: ArtistData.serverSchema,
      async onPassed(data) {
        const artist = await appPrisma.artist.create({
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            biography: data.biography,
            imageUrl: "",
            songCount: 0,
          },
        });
        return artist;
      },
    });
  });
}
