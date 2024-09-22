import { z } from "zod";

import { ZodUtils } from "@/shared/utils/zodUtils";

import { createSelectOptionSchema } from "./selectOption";

export namespace TagData {
  export const schema = z.object({
    songIds: createSelectOptionSchema(z.number()).array(),
    name: ZodUtils.requiredString(),
  });

  export type Type = z.infer<typeof schema>;

  export const initialValue: Type = {
    name: "",
    songIds: [],
  };
}
