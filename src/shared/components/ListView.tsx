import { Divider } from "@nextui-org/react";
import classNames from "classnames";
import { useState, type ReactNode } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { type BaseFilterParams } from "@/core/models/baseFilterParams";
import { type Pagination } from "@/core/models/pagination";

import { type LooseAutocomplete } from "../utils/types/looseAutocomplete";

export type ListViewColumn<T> = {
  readonly title: ReactNode;
  readonly render?: (item: T, index: number) => ReactNode;
  readonly toReadable?: (item: T, index: number) => string | number;
  readonly key: LooseAutocomplete<keyof T>;
  readonly width?: number | string;
  readonly align?: "start" | "center" | "end";
};

type ListViewProps<T> = {
  readonly columns: readonly ListViewColumn<T>[];
  readonly fetchApi?: (
    pageNumber: BaseFilterParams.Pagination["pageNumber"],
  ) => Promise<Pagination<T>>;
  readonly toKey: (item: T) => string | number;
  readonly isLoading?: boolean;
  readonly gridTemplate?: string;
  readonly onRowClick?: (item: T, index: number) => void;
  readonly page: Pagination<T>;
  readonly scrollableTargetId?: string;
  readonly isActiveRow?: (item: T, index: number) => boolean;
  readonly className?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ListView = <TData extends Record<string, any>>(
  props: ListViewProps<TData>,
) => {
  const [pageNumber, setPageNumber] = useState<number>(
    props.page.pageNumber + 1,
  );
  const [items, setItems] = useState<readonly TData[]>(props.page.items);
  const [hasNext, setHasNext] = useState(props.page.hasNext);

  const fetchItems = async () => {
    if (props.fetchApi == null) {
      return;
    }
    const result = await props.fetchApi(pageNumber);
    setHasNext(result.hasNext);
    setPageNumber((prev) => prev + 1);
    setItems((prev) => [...prev, ...result.items]);
  };

  const getCellContent = (
    col: ListViewColumn<TData>,
    item: TData,
    index: number,
  ) => {
    if (col.render) {
      return col.render(item, index + 1);
    }
    if (col.toReadable) {
      return col.toReadable(item, index + 1);
    }
    return item[col.key] ?? "-";
  };

  const isClickable = props.onRowClick != null;

  return (
    <>
      <div
        className={`grid ${props.gridTemplate} items-center gap-4 p-container bg-input sticky z-10 ${props.className}`}
      >
        {props.columns.map((column) => (
          <div
            className={`flex justify-${column.align}`}
            key={column.key.toString()}
          >
            {column.title}
          </div>
        ))}
      </div>
      <Divider />
      <InfiniteScroll
        className="p-container"
        next={fetchItems}
        hasMore={hasNext}
        scrollableTarget={props.scrollableTargetId}
        dataLength={items.length}
        loader={
          <div className="flex flex-col gap-4">
            {Array.from({ length: 2 }).map((_, index) => {
              return (
                <div key={index} className={`grid ${props.gridTemplate} gap-2`}>
                  {Array.from({ length: props.columns.length }).map(
                    (_, index) => (
                      <div
                        key={index}
                        className="h-[24px] rounded-lg bg-input"
                      />
                    ),
                  )}
                </div>
              );
            })}
          </div>
        }
      >
        {items.map((item, index) => {
          return (
            <div
              key={props.toKey(item)}
              onClick={() => props.onRowClick?.(item, index)}
              className={classNames(
                `grid ${props.gridTemplate} gap-4`,
                "items-center rounded-md py-2 transition-[0.2s ease]",
                {
                  "hover:bg-input-hover cursor-pointer": isClickable,
                  "text-primary-200": props.isActiveRow?.(item, index),
                },
              )}
            >
              {props.columns.map((col) => {
                return (
                  <div key={`${col.key.toString()}-${props.toKey(item)}`}>
                    <div className={`flex justify-${col.align}`}>
                      {getCellContent(col, item, index)}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </InfiniteScroll>
    </>
  );
};
