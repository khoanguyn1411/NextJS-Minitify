import { z } from "zod";

import { ZodUtils } from "@/shared/utils/zodUtils";

import { createSelectOptionSchema } from "./selectOption";

export namespace SongData {
  export const baseSchema = z.object({
    artistIds: ZodUtils.notAllowEmptyArray(
      createSelectOptionSchema(z.number()).array(),
    ),
    albumId: ZodUtils.notAllowNullable(ZodUtils.requiredNumber()),
    name: ZodUtils.requiredString(),
  });

  export const schema = baseSchema.extend({
    image: ZodUtils.notAllowNullable(z.instanceof(File)),
  });

  export const serverSchema = baseSchema.extend({
    image: ZodUtils.requiredString(),
  });

  export type Type = z.infer<typeof schema>;
  export type ServerType = z.infer<typeof serverSchema>;

  export const initialValue: Type = {
    name: "",
    artistIds: [],
    albumId: null,
    image: null,
  };
}
