import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="page min-h-[60vh]" role="status" aria-label="Đang tải">
      <Skeleton className="h-12 w-2/5" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
