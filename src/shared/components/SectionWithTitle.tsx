import { type FC, type PropsWithChildren } from "react";

type Props = {
  readonly title: string;
};

export const SectionWithTitle: FC<PropsWithChildren<Props>> = ({
  children,
  title,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-xl mx-3 font-semibold">{title}</h1>
      <div className="flex flex-row overflow-auto">{children}</div>
    </div>
  );
};
