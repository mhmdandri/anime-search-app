import { useAppSelector } from "@/hooks";
import { Progress } from "@/components/ui/progress";

export default function Loader() {
  const isLoading = useAppSelector((s) => s.search.loading || s.anime.loading);
  if (!isLoading) return null;
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <Progress value={66} className="rounded-none h-1" />
    </div>
  );
}
