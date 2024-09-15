import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { type ReactNode } from "react";

import { type BaseFilterParams } from "@/core/models/baseFilterParams";

import { type LooseAutocomplete } from "../utils/types/looseAutocomplete";

export type TableColumn<T> = {
  readonly title: string;
  readonly render?: (item: T) => ReactNode;
  readonly toReadable?: (item: T) => string;
  readonly key: LooseAutocomplete<keyof T>;
  readonly width?: number | string;
  readonly align?: "start" | "center" | "end";
};

type TableProps<T> = {
  readonly columns: readonly TableColumn<T>[];
  readonly items: T[] | readonly T[];
  readonly toKey: (item: T) => string | number;
  readonly isLoading?: boolean;
  readonly paginationOptions: BaseFilterParams.Pagination;
  readonly className?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AppTable = <TData extends Record<string, any>>(
  props: TableProps<TData>,
) => {
  const getCellContent = (col: TableColumn<TData>, item: TData) => {
    if (col.render) {
      return col.render(item);
    }
    if (col.toReadable) {
      return col.toReadable(item);
    }
    return item[col.key] ?? "-";
  };

  return (
    <Table className={props.className}>
      <TableHeader>
        {props.columns.map((column) => (
          <TableColumn align={column.align} key={column.key.toString()}>
            {column.title}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {props.items.map((item) => {
          return (
            <TableRow key={props.toKey(item)}>
              {props.columns.map((col) => {
                return (
                  <TableCell
                    width={col.width}
                    key={`${col.key.toString()}-${props.toKey(item)}`}
                  >
                    <div className={`flex justify-${col.align}`}>
                      {getCellContent(col, item)}
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
