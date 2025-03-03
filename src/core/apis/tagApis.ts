"use server";

import { type Tag } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { appPrisma } from "@/shared/configs/prisma.config";
import { createPagination } from "@/shared/utils/createPagination";
import { createPrismaPaginationFilter } from "@/shared/utils/createPrismaPaginationFilter";
import { createPrismaRequest } from "@/shared/utils/createPrismaRequest";
import { validateWithSchema } from "@/shared/utils/errorHandlers";

import { type BaseFilterParams } from "../models/baseFilterParams";
import { TagData } from "../models/tagData";

export async function createTag(data: TagData.Type) {
  return createPrismaRequest(() => {
    return validateWithSchema({
      data: data,
      schema: TagData.schema,
      async onPassed(data) {
        const tags = await appPrisma.tag.create({
          data: {
            name: data.name,
          },
        });

        revalidatePath("/admin/tags"); // This will re-fetch the song list
        return tags;
      },
    });
  });
}

export async function updateTag(songId: Tag["id"], data: TagData.Type) {
  return createPrismaRequest(() => {
    return validateWithSchema({
      data: data,
      schema: TagData.schema,
      async onPassed(data) {
        const tags = await appPrisma.tag.update({
          where: {
            id: songId,
          },
          data: {
            name: data.name,
          },
        });
        revalidatePath("/admin/tags"); // This will re-fetch the song list
        return tags;
      },
    });
  });
}

export async function getTags(params: BaseFilterParams.Combined) {
  return createPrismaRequest(async () => {
    const paginationFilters = createPrismaPaginationFilter(params);
    const filters: Parameters<typeof appPrisma.tag.findMany>[0] = {
      where: {
        name: { contains: params.search },
      },
    };
    const tags = await appPrisma.tag.findMany({
      ...paginationFilters,
      ...filters,
      include: {
        _count: true,
      },
    });

    return createPagination({
      pagination: params,
      result: tags,
      model: "tag",
      filters,
    });
  });
}

export async function deleteTagById(songId: Tag["id"]) {
  return createPrismaRequest(async () => {
    await appPrisma.tag.delete({
      where: {
        id: songId,
      },
    });
    revalidatePath("/admin/tags"); // This will re-fetch the song list
  });
}

export type ITag = Awaited<ReturnType<typeof getTags>>["items"][0];
