import { z } from "zod";

import { ZodUtils } from "@/shared/utils/zodUtils";

import { createSelectOptionSchema } from "./selectOption";

export namespace SongData {
  export const baseSchema = z.object({
    artistIds: ZodUtils.notAllowEmptyArray(
      createSelectOptionSchema(z.number()).array(),
    ),
    tagIds: createSelectOptionSchema(z.number()).array(),
    albumId: createSelectOptionSchema(z.number()).nullable(),
    name: ZodUtils.requiredString(),
  });

  export const createSchema = baseSchema.extend({
    image: ZodUtils.notAllowNullable(z.instanceof(File)),
    song: ZodUtils.notAllowNullable(z.instanceof(File)),
  });

  export const editSchema = baseSchema.extend({
    image: z.instanceof(File).or(z.null()),
    song: z.instanceof(File).or(z.null()),
  });

  export const serverSchema = baseSchema.extend({
    image: ZodUtils.requiredString(),
    song: ZodUtils.requiredString(),
  });

  export type Type = z.infer<typeof createSchema>;
  export type ServerType = z.infer<typeof serverSchema>;

  export const initialValue: Type = {
    name: "",
    song: null,
    artistIds: [],
    tagIds: [],
    albumId: null,
    image: null,
  };
}
