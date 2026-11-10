import { Badge } from "@/components/ui/Badge";

export function AcceptanceCondition({
  label,
  ok,
  note,
}: {
  label: string;
  ok: boolean;
  note: string;
}) {
  return (
    <div className="check-row">
      <span>{label}</span>
      <Badge tone={ok ? "good" : "error"}>{note}</Badge>
    </div>
  );
}
