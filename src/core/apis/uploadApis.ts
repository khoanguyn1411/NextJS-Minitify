"use server";

import { writeFile } from "fs/promises";
import { join } from "path";

import { buildAppError } from "@/shared/utils/errorHandlers";

export async function uploadFile(
  data: FormData,
  type: "images" | "musics" = "images",
) {
  try {
    const file: File | null = data.get("file") as unknown as File;
    if (!file) {
      return buildAppError("No file received");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // For this, we'll just write it to the filesystem in a new location
    const path = join("public", "uploads", type, file.name);
    await writeFile(path, buffer);

    return {
      path: `/${join("uploads", type, file.name)}`,
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return buildAppError("Failed to upload file");
  }
}
