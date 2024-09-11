import { z } from "zod";

import { type RegisterData } from "@/core/models/registerData";
import { ZodUtils } from "@/shared/utils/zodUtils";

export namespace RegisterForm {
  export const schema = z.object({
    firstName: ZodUtils.requiredString(),
    lastName: ZodUtils.requiredString(),
    userName: ZodUtils.requiredString(),
    password: ZodUtils.requiredString(),
    confirmPassword: ZodUtils.requiredString(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  export type Type = z.infer<typeof schema>;

  export function toRegisterDataModel(formData: Type): RegisterData {
    return formData;
  }
}
