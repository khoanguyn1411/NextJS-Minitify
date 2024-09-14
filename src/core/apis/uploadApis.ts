"use server";

import { writeFile } from "fs/promises";
import { join } from "path";

import { buildAppError } from "@/shared/utils/errorHandlers";

export async function uploadFile(data: FormData) {
  try {
    const file: File | null = data.get("file") as unknown as File;
    if (!file) {
      return buildAppError("No file received");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location
    const path = join("assets", "uploads", file.name);
    await writeFile(path, buffer);

    return {
      path: path,
    };
  } catch (e) {
    return buildAppError("Failed to upload file");
  }
}
