import { zodResolver } from "@hookform/resolvers/zod";
import { type User } from "lucia";
import { useForm } from "react-hook-form";

import { createPlaylist } from "@/core/apis/playlistApis";
import { uploadFile } from "@/core/apis/uploadApis";
import { PlaylistData } from "@/core/models/playListData";
import { useError } from "@/shared/hooks/useError";
import { useNotify } from "@/shared/hooks/useNotify";
import { convertFileToFormData } from "@/shared/services/uploadService";

type Props = {
  readonly userId: User["id"] | null;
  readonly onSubmitSuccess: () => void;
};

export const usePlaylistForm = (props: Props) => {
  const { extractErrorsToForm, notifyOnAppError, isSuccess } = useError();
  const { notify } = useNotify();
  const form = useForm<PlaylistData.Type>({
    shouldUnregister: true,
    defaultValues: PlaylistData.initialValue,
    resolver: zodResolver(PlaylistData.createSchema),
  });

  const { reset, setError } = form;

  const onFormSubmit = async (data: PlaylistData.Type) => {
    let imageUrl = "";
    if (data.image != null) {
      const filePath = await uploadFile(convertFileToFormData(data.image));
      if (!isSuccess(filePath)) {
        notifyOnAppError(filePath);
        return;
      }
      imageUrl = filePath.path;
    }

    const result = await createPlaylist({
      ...data,
      userId: props.userId,
      image: imageUrl,
    });

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
