import { z } from "zod";

import { ZodUtils } from "@/shared/utils/zodUtils";

export namespace ArtistData {
  export const schema = z.object({
    image: ZodUtils.notAllowNullable(z.instanceof(File)),
    firstName: ZodUtils.requiredString(),
    lastName: ZodUtils.requiredString(),
    biography: ZodUtils.requiredString(),
  });

  export type Type = z.infer<typeof schema>;
}
