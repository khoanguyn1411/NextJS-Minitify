import { type FC, type ReactNode } from "react";

import { TableSearch } from "../components/TableSearch";

type Props = {
  readonly title: string;
  readonly initialSearch: string;
  readonly Action: ReactNode;
  readonly Table: ReactNode;
};

export const AdminTableLayout: FC<Props> = ({
  initialSearch,
  Action,
  title,
  Table,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 justify-between items-center">
        <h1 className="text-xl font-semibold">{title}</h1>
        <div className="flex gap-4">
          <TableSearch initialFilter={initialSearch} />
          {Action}
        </div>
      </div>
      {Table}
    </div>
  );
};
