/**
 * Error messages used in the application.
 */
export const APP_ERROR_MESSAGES = {
  /**
   * Error message for email validation.
   */
  email: 'Invalid email.',

  /**
   * Error message for required fields.
   */
  required: 'This field is required. Please enter a value.',

  /**
   * Error message for unknown error.
   */
  unknown: 'Something went wrong, please try again.',

  /**
   * Error message for field mismatch.
   * @param firstField The first field name.
   * @param secondField The second field name.
   * @returns The error message string.
   */
  notMatch: (firstField: string, secondField: string) =>
    `${firstField} not matched with ${secondField}.`,

  /**
   * Error message for minimum length requirement.
   * @param value The minimum length value.
   * @returns The error message string.
   */
  min: (value: number) => `This field must include ${value} characters.`,

  /**
   * Error when have only whitespace.
   */
  whitespace: 'This field cannot contain only whitespace.',

} as const;
