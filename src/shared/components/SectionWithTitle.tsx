import { type FC, type PropsWithChildren, type ReactNode } from "react";

type Props = {
  readonly title: ReactNode;
};

export const SectionWithTitle: FC<PropsWithChildren<Props>> = ({
  children,
  title,
}) => {
  return (
    <section className="flex flex-col gap-3">
      <div className="text-xl mx-3 font-semibold">{title}</div>
      <div className="flex flex-row overflow-auto flex-wrap">{children}</div>
    </section>
  );
};
