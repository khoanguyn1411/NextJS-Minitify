"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { type FC } from "react";
import { Controller, useForm } from "react-hook-form";

import { SongData } from "@/core/models/songData";

export const NewSongForm: FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isLoading },
  } = useForm<SongData.Type>({
    resolver: zodResolver(SongData.schema),
  });

  const onFormSubmit = (data: SongData.Type) => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-4">
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <Input
            label="Name"
            placeholder="Your beautiful song"
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error?.message}
            {...field}
          />
        )}
      />

      <Button isLoading={isLoading} type="submit">
        Create
      </Button>
    </form>
  );
};
