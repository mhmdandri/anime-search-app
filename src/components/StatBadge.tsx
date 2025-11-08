import { Badge } from "@/components/ui/badge";

export function StatBadge({
  label,
  value,
}: {
  label: string;
  value?: number | string | null;
}) {
  if (value === null || value === undefined || value === "") return null;
  return (
    <Badge variant="secondary" className="rounded-full">
      <span className="opacity-70 mr-1">{label}</span>
      <span className="font-medium">{value}</span>
    </Badge>
  );
}
