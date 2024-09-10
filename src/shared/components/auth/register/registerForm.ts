import { z } from "zod";

import { type RegisterData } from "@/core/models/registerData";

export namespace RegisterForm {
  export const schema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    userName: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  });

  export type Type = z.infer<typeof schema>;

  export function toRegisterDataModel(formData: Type): RegisterData {
    return formData;
  }
}
