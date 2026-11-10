import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="l-stack" role="status" aria-label="Đang tải">
      <Skeleton className="h-7 w-48" />
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-72 w-full" />
    </div>
  );
}
