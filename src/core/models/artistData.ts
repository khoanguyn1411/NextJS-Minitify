import { z } from "zod";

import { ZodUtils } from "@/shared/utils/zodUtils";

export namespace ArtistData {
  export const baseSchema = z.object({
    firstName: ZodUtils.requiredString(),
    lastName: ZodUtils.requiredString(),
    biography: ZodUtils.requiredString(),
  });

  export const createSchema = baseSchema.extend({
    image: ZodUtils.notAllowNullable(z.instanceof(File)),
  });

  export const editSchema = baseSchema.extend({
    image: z.instanceof(File).or(z.null()),
  });

  export const serverSchema = baseSchema.extend({
    image: ZodUtils.requiredString(),
  });

  export type Type = z.infer<typeof createSchema>;
  export type ServerType = z.infer<typeof serverSchema>;

  export const initialValue: Type = {
    firstName: "",
    lastName: "",
    biography: "",
    image: null,
  };
}
