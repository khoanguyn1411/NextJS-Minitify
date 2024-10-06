import { Input, Textarea } from "@nextui-org/input";
import { type FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { type IPlaylist, type IPlaylistDetail } from "@/core/apis/playlistApis";
import { type PlaylistData } from "@/core/models/playListData";

import { FileUploader } from "../FileUploader";

type Props = {
  readonly playlist?: IPlaylist | IPlaylistDetail;
};

export const PlaylistCreationForm: FC<Props> = ({ playlist }) => {
  const { control } = useFormContext<PlaylistData.Type>();

  return (
    <form className="flex flex-col gap-4">
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <Input
            label="Name"
            placeholder="Your awesome playlist"
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
            placeholder="Good time"
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="image"
        render={({ field, fieldState }) => (
          <FileUploader
            currentUrl={playlist?.imageUrl}
            fileAccepted=".jpg,.jpeg,.png"
            label="Playlist"
            errorMessage={fieldState.error?.message}
            {...field}
          />
        )}
      />
    </form>
  );
};
