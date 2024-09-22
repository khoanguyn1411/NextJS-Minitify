import { z } from "zod";

import { ZodUtils } from "@/shared/utils/zodUtils";

export namespace TagData {
  export const schema = z.object({
    name: ZodUtils.requiredString(),
  });

  export type Type = z.infer<typeof schema>;

  export const initialValue: Type = {
    name: "",
  };
}
