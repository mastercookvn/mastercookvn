import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="l-stack" role="status" aria-label="Đang tải">
      <Skeleton className="h-7 w-2/3" />
      <Skeleton className="h-48 w-full" />
    </div>
  );
}
