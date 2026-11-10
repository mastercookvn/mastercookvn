import { Badge } from "@/components/ui/Badge";

export function CountRowCheck({ problem }: { problem: string | null }) {
  return problem ? (
    <Badge tone="error">{problem}</Badge>
  ) : (
    <Badge tone="good">Khớp</Badge>
  );
}
