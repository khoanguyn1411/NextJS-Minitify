import { z } from "zod";

import { ZodUtils } from "@/shared/utils/zodUtils";

export namespace LoginData {
  export const schema = z.object({
    userName: ZodUtils.requiredString(),
    password: ZodUtils.requiredString(),
  });
  export type Type = z.infer<typeof schema>;
}
