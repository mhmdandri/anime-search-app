import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import SkeletonCard from "@/components/SkeletonCard";
import { EmptyPrompt } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { fetchSearch } from "../searchSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function AnimeList() {
  const { results, loading, error, query } = useAppSelector((s) => s.search);
  const dispatch = useAppDispatch();
  if (!query.trim())
    return <EmptyPrompt>Type title for start searching</EmptyPrompt>;
  if (loading)
    return (
      <div className="grid md:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  if (error)
    return (
      <ErrorState message={error} onRetry={() => dispatch(fetchSearch())} />
    );
  if (results.length === 0)
    return <EmptyPrompt>No result for “{query}”.</EmptyPrompt>;
  return (
    <ul className="grid md:grid-cols-3 gap-4 items-stretch">
      {results.map((a) => (
        <li key={a.mal_id} className="h-full">
          <Link to={`/anime/${a.mal_id}`} className="block h-full">
            <Card className="h-full flex flex-col rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="p-0">
                <AspectRatio ratio={16 / 9}>
                  {a.images?.jpg?.image_url ? (
                    <img
                      src={a.images.jpg.image_url}
                      alt={a.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm opacity-60">
                      No Image
                    </div>
                  )}
                </AspectRatio>
              </CardHeader>
              <CardContent className="p-3 flex flex-col flex-1">
                <CardTitle className="text-base line-clamp-2 min-h-13">
                  {a.title}
                </CardTitle>
                <div className="mt-auto pt-2 text-sm opacity-80">
                  {a.score ? `Score: ${a.score}` : "Score: -"}
                </div>
              </CardContent>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}
