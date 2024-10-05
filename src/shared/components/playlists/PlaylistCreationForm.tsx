import { Input, Textarea } from "@nextui-org/input";
import { type User } from "@prisma/client";
import { type FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { type IPlaylist } from "@/core/apis/playlistApis";
import { type PlaylistData } from "@/core/models/playListData";

type Props = {
  readonly playlist?: IPlaylist;
  readonly userId: User["id"] | null;
};

export const PlaylistCreationForm: FC<Props> = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<PlaylistData.Type>();
  console.log({ errors });

  return (
    <form className="flex flex-col gap-4">
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <Input
            label="Name"
            placeholder="Danny"
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field, fieldState }) => (
          <Textarea
            label="Description"
            autoComplete="description"
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error?.message}
            {...field}
          />
        )}
      />
    </form>
  );
};
