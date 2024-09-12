import { z } from "zod";

import { ZodUtils } from "@/shared/utils/zodUtils";

export namespace RegisterData {
  export const schema = z
    .object({
      firstName: ZodUtils.requiredString(),
      lastName: ZodUtils.requiredString(),
      userName: ZodUtils.requiredString(),
      password: ZodUtils.requiredString(),
      confirmPassword: ZodUtils.requiredString(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  export type Type = z.infer<typeof schema>;
}
