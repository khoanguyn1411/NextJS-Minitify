import { z } from "zod";

import { ZodUtils } from "@/shared/utils/zodUtils";

import { createSelectOptionSchema } from "./selectOption";

export namespace AlbumData {
  export const baseSchema = z.object({
    name: ZodUtils.requiredString(),
    description: ZodUtils.requiredString(),
    songIds: ZodUtils.notAllowEmptyArray(
      createSelectOptionSchema(z.number()).array(),
    ),
  });

  export const createSchema = baseSchema.extend({
    artistId: createSelectOptionSchema(z.number()).nullable(),
    image: ZodUtils.notAllowNullable(z.instanceof(File)),
  });

  export const editSchema = baseSchema.extend({
    artistId: createSelectOptionSchema(z.number()).nullable(),
    image: z.instanceof(File).or(z.null()),
  });

  export const serverSchema = baseSchema.extend({
    artistId: ZodUtils.requiredNumber(),
    image: ZodUtils.requiredString(),
  });

  export type Type = z.infer<typeof createSchema>;
  export type ServerType = z.infer<typeof serverSchema>;

  export const initialValue: Type = {
    name: "",
    description: "",
    songIds: [],
    artistId: null,
    image: null,
  };
}
