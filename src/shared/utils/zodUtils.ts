import { type ZodNullable, number, string, type z, date } from 'zod';

import { APP_ERROR_MESSAGES } from '../constants/errorMessages';


/** Common utils for zod validation form library. */
export namespace ZodUtils {

  /**
   * Required string option.
   * @param message Custom message for required field error.
   */
  export function requiredString(message?: string): z.ZodString {
    return string({ required_error: message ?? APP_ERROR_MESSAGES.required }).min(
      1,
      message ?? APP_ERROR_MESSAGES.required,
    );
  }

  /** Required number option. */
  export function requiredNumber(): z.ZodEffects<z.ZodNumber, number, number> {
    return number({ required_error: APP_ERROR_MESSAGES.required })
      .refine(value => value != null, { message: APP_ERROR_MESSAGES.required });
  }

  /** Required number option. */
  export function password(): z.ZodString{
    return string().min(8, "Password must be at least 8 characters long");
  }

  /**
   * Not allow nullable value.
   * @param zodValidation Zod primitive validation.
   */
  export function notAllowNullable<T extends z.ZodTypeAny>(zodValidation: T) {
    return zodValidation.nullable().optional()
      .transform((value, ctx) => {
        if (value == null) {
          ctx.addIssue({ code: 'custom', message: APP_ERROR_MESSAGES.required });
        }
        return value;

        // We can guarantee there will be no case that `undefined` can go pass the type so 
        // it's good to assert the type here.
      }) as unknown as z.ZodEffects<ZodNullable<T>, T['_output'] | null, T['_input'] | null>;
  }

  /** Check valid time. */
  export function validTime() {
    return date({
      errorMap(issue, _ctx) {
        if (issue.code === 'invalid_date') {
          return { message: 'Invalid time.' };
        }
        return { message: APP_ERROR_MESSAGES.required };
      },
    }).nullable();
  }

  /** Check valid time. */
  export function validDate() {
    return date({
      errorMap(issue, _ctx) {
        if (issue.code === 'invalid_date') {
          return { message: 'Invalid date.' };
        }
        return { message: APP_ERROR_MESSAGES.required };
      },
    });
  }

  const US_PHONE_NUMBER_REGEX = /^[2-9][0-9]{9}$/;
  const US_PHONE_VALIDATION_ERROR_MESSAGE = 'Please enter valid US phone number';

  /** Check US phone number. */
  export function validUSPhoneNumber() {
    return string().regex(US_PHONE_NUMBER_REGEX, US_PHONE_VALIDATION_ERROR_MESSAGE);
  }
}
