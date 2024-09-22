import { type FC } from "react";

import { getTags } from "@/core/apis/tagApis";
import { type BaseFilterParams } from "@/core/models/baseFilterParams";

import { TagsTableClient } from "./TagsTableClient";

type Props = {
  readonly filters: BaseFilterParams.Combined;
};

export const TagsTableServer: FC<Props> = async ({ filters }) => {
  const page = await getTags(filters);
  return <TagsTableClient page={page} />;
};
