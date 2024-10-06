import { type Metadata } from "next";

import { DiscoverSongsListView } from "@/shared/components/discover/DiscoverSongsListView";

export const metadata: Metadata = {
  title: "Discover",
  description: "Discover latest tracks !!!",
};

export default async function Page() {
  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-semibold bg-primary-800 sticky top-0 px-container h-[60px] z-10 items-center flex">
        Discover
      </h1>
      <DiscoverSongsListView />
    </div>
  );
}
