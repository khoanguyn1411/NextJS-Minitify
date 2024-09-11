import { type FC, type PropsWithChildren } from "react";
import { type FieldError } from "react-hook-form";

type Props = {
  readonly error?: string | FieldError;

  /**
   * If nested component contain label tag, like radios and checkboxes,
   * all of them will be applied the preventDefault also.
   * Pay attention to use this prop.
   */
  readonly shouldPreventLabelDefault?: boolean;
} & PropsWithChildren;

export const FormItem: FC<Props> = ({ children, error = "" }) => {
  const errorText = typeof error === "string" ? error : error.message;

  return (
    <div className="flex flex-col gap-4">
      {children}
      {error && <p className="text-red-500">{errorText}</p>}
    </div>
  );
};
