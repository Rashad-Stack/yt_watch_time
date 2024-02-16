export default function VideoCardSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="skeleton h-52 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  );
}
