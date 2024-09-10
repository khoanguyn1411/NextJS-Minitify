import { type FC, type PropsWithChildren } from "react";

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col gap-2 h-screen">
      <header className="p-container">This is header</header>
      <main className="h-full grid grid-cols-4">
        <aside className="p-container">This is aside left</aside>
        <div className="p-container col-span-2">{children}</div>
        <aside className="p-container">This is aside right</aside>
      </main>
      <footer className="mt-auto p-container">
        This is footer
      </footer>
    </div>
  );
};
