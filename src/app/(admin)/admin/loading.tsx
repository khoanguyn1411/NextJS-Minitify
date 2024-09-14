import { Card } from "@nextui-org/react";

const LoadingSkeleton = () => (
  <Card className="space-y-5" radius="lg">
    <div className="h-24 rounded-lg bg-primary-500"></div>
    <div className="space-y-3">
      <div className="h-3 w-3/5 rounded-lg bg-primary-500"></div>
      <div className="h-3 w-4/5 rounded-lg bg-primary-500"></div>
      <div className="h-3 w-2/5 rounded-lg bg-primary-500"></div>
    </div>
  </Card>
);

export default function Loading() {
  return <LoadingSkeleton />;
}
