import { z } from "zod";

import { ZodUtils } from "@/shared/utils/zodUtils";

export namespace PlaylistData {
  export const schema = z.object({
    name: ZodUtils.requiredString(),
    description: z.string(),
  });

  export const serverSchema = schema.extend({
    userId: z.number().nullable(),
  });

  export type Type = z.infer<typeof schema>;
  export type ServerType = z.infer<typeof serverSchema>;

  export const initialValue: Type = {
    name: "",
    description: "",
  };
}
