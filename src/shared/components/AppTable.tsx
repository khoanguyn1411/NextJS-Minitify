"use client";

import {
  Pagination as NextUIPagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { type ReactNode } from "react";

import { type Pagination } from "@/core/models/pagination";

import { useAppQueryParams } from "../hooks/useAppQueryParams";
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
  readonly page: Pagination<T>;
  readonly toKey: (item: T) => string | number;
  readonly isLoading?: boolean;
  readonly className?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AppTable = <TData extends Record<string, any>>(
  props: TableProps<TData>,
) => {
  const { mergeQueryParams } = useAppQueryParams();

  const handlePaginationChange = (page: number) => {
    mergeQueryParams({
      pageNumber: (page - 1).toString(),
    });
  };

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
    <div className="flex flex-col gap-3">
      <Table
        isHeaderSticky
        className={props.className}
        bottomContent={
          <div className="flex w-full justify-center">
            <NextUIPagination
              isCompact
              onChange={handlePaginationChange}
              showControls
              showShadow
              total={props.page.totalPages}
              page={props.page.pageNumber + 1}
            />
          </div>
        }
      >
        <TableHeader>
          {props.columns.map((column) => (
            <TableColumn align={column.align} key={column.key.toString()}>
              {column.title}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody
          emptyContent={"No data to display."}
          loadingContent={<Spinner />}
          isLoading={props.isLoading}
        >
          {props.page.items.map((item) => {
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
    </div>
  );
};
