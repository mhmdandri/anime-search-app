import { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchAnimeById, clearAnime } from "./animeSlice";
import SkeletonDetail from "@/components/SkeletonDetail";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { StatBadge } from "@/components/StatBadge";
import { ErrorState } from "@/components/ErrorState";
import { ArrowLeft } from "lucide-react";

export default function AnimeDetailPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { current, loading, error } = useAppSelector((s) => s.anime);
  useEffect(() => {
    if (id) dispatch(fetchAnimeById(id));
    return () => {
      dispatch(clearAnime());
    };
  }, [id, dispatch]);
  useEffect(() => {
    if (current?.title) document.title = `${current.title} • Anime Detail`;
    return () => {
      document.title = "Anime Search";
    };
  }, [current?.title]);
  const studios = useMemo(
    () => (current?.studios ?? []).map((s) => s.name).join(", "),
    [current?.studios]
  );
  if (loading) return <SkeletonDetail />;
  if (error)
    return (
      <div className="container mx-auto p-4">
        <ErrorState
          message={error}
          onRetry={() => dispatch(fetchAnimeById(String(id)))}
        />
      </div>
    );
  if (!current) return null;
  const img = current.images?.jpg?.image_url;
  const infoRows: Array<[string, string]> = [
    ["Type", current.type ?? "-"],
    ["Episode", (current.episodes ?? "-").toString()],
    ["Duration", current.duration ?? "-"],
    ["Rating", current.rating ?? "-"],
    ["Season", current.season ? capitalize(current.season) : "-"],
    ["Year", current.year ? String(current.year) : "-"],
    ["Studio", studios || "-"],
  ];
  return (
    <div className="container mx-auto p-4">
      <Button asChild variant="outline">
        <Link to="/search" className="text-sm">
          <ArrowLeft /> Back
        </Link>
      </Button>

      <div className="grid md:grid-cols-2 gap-6 mt-4">
        <Card className="rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <AspectRatio ratio={16 / 9}>
              {img ? (
                <img
                  src={img}
                  alt={current.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm opacity-60">
                  No Image
                </div>
              )}
            </AspectRatio>
          </CardContent>
        </Card>
        <div>
          <h1 className="text-3xl font-bold leading-tight">{current.title}</h1>
          {current.title_japanese && (
            <p className="mt-1 text-sm opacity-75">{current.title_japanese}</p>
          )}
          <div className="flex flex-wrap gap-2 mt-3">
            {current.type && <Badge variant="outline">{current.type}</Badge>}
            {current.year && <Badge variant="outline">{current.year}</Badge>}
            {current.season && (
              <Badge variant="outline">{capitalize(current.season)}</Badge>
            )}
            <StatBadge label="Score" value={current.score ?? "-"} />
            <StatBadge label="Rank" value={current.rank ?? "-"} />
            <StatBadge label="Pop." value={current.popularity ?? "-"} />
            <StatBadge label="Members" value={fmt(current.members)} />
            <StatBadge label="Favs" value={fmt(current.favorites)} />
          </div>
          <div className="mt-4 flex gap-2">
            {current.url && (
              <Button asChild>
                <a href={current.url} target="_blank" rel="noreferrer">
                  Watch on MyAnimeList
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
      <Separator className="my-6" />
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="info">Information</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4">
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Synopsis</h2>
              <p className="leading-relaxed whitespace-pre-wrap">
                {current.synopsis || "Sinopsis tidak tersedia."}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="info" className="mt-4">
          <Card className="rounded-2xl">
            <CardContent className="p-0">
              <dl className="divide-y">
                {infoRows.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-3 gap-2 p-4">
                    <dt className="opacity-70">{k}</dt>
                    <dd className="col-span-2">{v}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function capitalize(s?: string | null) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function fmt(n?: number | null) {
  return typeof n === "number" ? new Intl.NumberFormat().format(n) : "-";
}
