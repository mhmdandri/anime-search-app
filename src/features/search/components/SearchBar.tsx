import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setQuery, setPage, fetchSearch } from "../searchSlice";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const query = useAppSelector((s) => s.search.query);
  const [local, setLocal] = useState(query);
  useEffect(() => {
    const t = setTimeout(() => {
      dispatch(setQuery(local));
      dispatch(setPage(1));
      if (local.trim()) dispatch(fetchSearch());
    }, 250);
    return () => clearTimeout(t);
  }, [local, dispatch]);
  return (
    <div className="w-full relative flex items-center gap-2">
      <Search className="absolute left-0 mx-2 text-muted-foreground" />
      <Input
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder="Search anime…"
        className="h-11 pl-10"
      />
      {local && (
        <Button
          onClick={() => setLocal("")}
          variant="ghost"
          size="icon"
          className="absolute right-0 mx-2 text-muted-foreground"
        >
          <X />
        </Button>
      )}
    </div>
  );
}
