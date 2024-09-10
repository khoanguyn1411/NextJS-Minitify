import { Stack, Typography, type StackProps } from "@mui/material";
import {
  type ReactNode,
  type FC,
  type MouseEvent,
  type PropsWithChildren,
} from "react";
import { type FieldError } from "react-hook-form";

import { type PropsWithSx } from "src/utils/types/props/withSx";

type Props = {
  readonly label?: ReactNode;
  readonly subLabel?: ReactNode;
  readonly error?: string | FieldError;
  readonly isRequired?: boolean;
  readonly className?: string;
  readonly isNoLabel?: boolean;
  readonly stackProps?: StackProps;

  /**
   * If nested component contain label tag, like radios and checkboxes,
   * all of them will be applied the preventDefault also.
   * Pay attention to use this prop.
   */
  readonly shouldPreventLabelDefault?: boolean;
} & PropsWithChildren;

export const FormItem: FC<PropsWithSx<Props>> = ({
  children,
  label,
  error = "",
  subLabel,
  shouldPreventLabelDefault = false,
  isRequired = false,
  isNoLabel = false,
  sx,
}) => {
  const errorText = typeof error === "string" ? error : error.message;
  const handleLabelClick = (e: MouseEvent<HTMLLabelElement>): void => {
    if (shouldPreventLabelDefault) {
      e.preventDefault();
    }
  };

  return (
    <Stack
      component={isNoLabel ? "div" : "label"}
      onClick={handleLabelClick}
      gap={1}
      width="100%"
      sx={sx}
    >
      {error && <p className="text-red-500">{errorText}</p>}
    </Stack>
  );
};
