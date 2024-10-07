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
  type Selection,
  type SelectionMode,
} from "@nextui-org/react";
import { useMemo, type ReactNode } from "react";

import { type Pagination } from "@/core/models/pagination";

import { useAppQueryParams } from "../hooks/useAppQueryParams";
import { type LooseAutocomplete } from "../utils/types/looseAutocomplete";

export type TableColumn<T> = {
  readonly title: string;
  readonly render?: (item: T) => ReactNode;
  readonly toReadable?: (item: T) => string | number;
  readonly key: LooseAutocomplete<keyof T>;
  readonly width?: number | string;
  readonly align?: "start" | "center" | "end";
};

type TableProps<T> = {
  readonly columns: readonly TableColumn<T>[];
  readonly page: Pagination<T>;
  readonly toKey: (item: T) => string;
  readonly isLoading?: boolean;
  readonly className?: string;
  readonly hasPagination?: boolean;
  readonly selectionMode?: SelectionMode;
  readonly onSelectionChange?: (data: readonly string[]) => void;
  readonly selections?: readonly string[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AppTable = <TData extends Record<string, any>>(
  props: TableProps<TData>,
) => {
  const hasPagination = props.hasPagination ?? true;
  const { mergeQueryParams } = useAppQueryParams();
  const totalPage = props.page.totalPages === 0 ? 1 : props.page.totalPages;

  const selectionValue = useMemo<Selection | undefined>(() => {
    const propsSelections = props.selections;
    if (propsSelections == null) {
      return undefined;
    }
    const hasItemNotIncludedInPageItems =
      props.page.items.find(
        (item) => !propsSelections.includes(props.toKey(item)),
      ) != null;

    if (hasItemNotIncludedInPageItems) {
      return new Set(propsSelections);
    }
    return "all";
  }, [props.selections, props.page]);

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

  const handleSelectionChange = (s: Selection) => {
    if (props.onSelectionChange == null || props.selections == null) {
      return;
    }
    if (s === "all") {
      const newSelectionList = new Set([
        ...props.selections,
        ...props.page.items.map((item) => props.toKey(item)),
      ]);
      props.onSelectionChange(Array.from(newSelectionList));
      return;
    }
    props.onSelectionChange(Array.from(s).map((item) => item.toString()));
  };

  return (
    <div className="flex flex-col gap-3">
      <Table
        isHeaderSticky
        selectedKeys={selectionValue}
        selectionMode={props.selectionMode}
        className={props.className}
        onSelectionChange={handleSelectionChange}
        bottomContent={
          hasPagination && (
            <div className="flex w-full justify-center">
              <NextUIPagination
                isCompact
                onChange={handlePaginationChange}
                showControls
                showShadow
                isDisabled={props.page.totalCount === 0}
                total={totalPage}
                page={props.page.pageNumber + 1}
              />
            </div>
          )
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
