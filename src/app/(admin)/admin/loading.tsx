const LoadingSkeleton = () => (
  <div className="space-y-5">
    <div className="h-24 rounded-lg bg-primary-200"></div>
    <div className="space-y-3">
      <div className="h-3 w-3/5 rounded-lg bg-primary-200"></div>
      <div className="h-3 w-4/5 rounded-lg bg-primary-200"></div>
      <div className="h-3 w-2/5 rounded-lg bg-primary-200"></div>
    </div>
  </div>
);

export default function Loading() {
  return <LoadingSkeleton />;
}
