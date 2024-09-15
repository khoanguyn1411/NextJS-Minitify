export type LooseAutocomplete<TItems extends string | number | symbol> =
  | TItems
  // eslint-disable-next-line @typescript-eslint/ban-types
  | (string & {});
