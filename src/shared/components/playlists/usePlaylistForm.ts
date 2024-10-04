import { zodResolver } from "@hookform/resolvers/zod";
import { type User } from "lucia";
import { useForm } from "react-hook-form";

import { createPlaylist } from "@/core/apis/playlistApis";
import { PlaylistData } from "@/core/models/playListData";
import { useError } from "@/shared/hooks/useError";
import { useNotify } from "@/shared/hooks/useNotify";

type Props = {
  readonly userId: User["id"] | null;
  readonly onSubmitSuccess: () => void;
};

export const usePlaylistForm = (props: Props) => {
  const { extractErrorsToForm, notifyOnAppError, isSuccess } = useError();
  const { notify } = useNotify();
  const form = useForm<PlaylistData.Type>({
    shouldUnregister: true,
    resolver: zodResolver(PlaylistData.schema),
  });

  const { reset, setError } = form;

  const onFormSubmit = async (data: PlaylistData.Type) => {
    const result = await createPlaylist({ ...data, userId: props.userId });

    extractErrorsToForm({ result, setError });
    notifyOnAppError(result);
    if (isSuccess(result)) {
      notify("Created new playlist", {
        type: "success",
      });
      props.onSubmitSuccess();
      reset(PlaylistData.initialValue);
    }
  };

  return {
    form,
    onFormSubmit,
  };
};
