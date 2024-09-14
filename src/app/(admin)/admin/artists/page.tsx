import { Button } from "@nextui-org/button";

export default function Page() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 justify-between items-center">
        <h1 className="text-xl font-semibold">Artists</h1>
        <Button color="primary">Add new artist</Button>
      </div>
    </div>
  );
}
