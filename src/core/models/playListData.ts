import { z } from "zod";

import { ZodUtils } from "@/shared/utils/zodUtils";

export namespace PlaylistData {
  export const baseSchema = z.object({
    name: ZodUtils.requiredString(),
    description: z.string(),
  });

  export const serverSchema = baseSchema.extend({
    userId: z.number().nullable(),
    image: z.string(),
  });

  export const createSchema = baseSchema.extend({
    image: z.instanceof(File).or(z.null()),
  });

  export const editSchema = baseSchema.extend({
    image: z.instanceof(File).or(z.null()),
  });

  export type Type = z.infer<typeof createSchema>;
  export type ServerType = z.infer<typeof serverSchema>;

  export const initialValue: Type = {
    name: "",
    description: "",
    image: null,
  };
}
