export type DynamicRouteProps<
  T extends Record<string, string> = { id: string },
> = {
  params: T;
  searchParams: { [key: string]: string | string[] | undefined };
};
