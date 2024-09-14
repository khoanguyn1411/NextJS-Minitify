import { z } from "zod";

import { ZodUtils } from "@/shared/utils/zodUtils";

export namespace SongData {
  export const schema = z.object({
    image: z.instanceof(File),
    artistId: ZodUtils.requiredNumber(),
    albumId: ZodUtils.requiredNumber(),
    name: ZodUtils.requiredString(),
  });

  export type Type = z.infer<typeof schema>;
}
