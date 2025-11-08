import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setPage, fetchSearch } from "../searchSlice";
import { useEffect } from "react";

export default function Pagination() {
  const dispatch = useAppDispatch();
  const { page, totalPages } = useAppSelector((s) => s.search);
  const go = (p: number) => {
    if (p < 1 || p > totalPages) return;
    dispatch(setPage(p));
    dispatch(fetchSearch());
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);
  return (
    <div className="flex items-center gap-2 justify-start mt-4">
      <Button
        variant="outline"
        onClick={() => go(page - 1)}
        disabled={page <= 1}
      >
        Prev
      </Button>
      <span className="text-sm tabular-nums">
        {page} / {totalPages}
      </span>
      <Button
        variant="outline"
        onClick={() => go(page + 1)}
        disabled={page >= totalPages}
      >
        Next
      </Button>
    </div>
  );
}
