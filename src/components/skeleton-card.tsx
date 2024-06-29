import Skeleton from "./skeleton";

function SkeletonCard() {
  return (
    <div className="flex">
      <Skeleton className="h-12 w-12 rounded-full" />
      <Skeleton className="h-4 w-[250px]" />
    </div>
  );
}

export default SkeletonCard;
