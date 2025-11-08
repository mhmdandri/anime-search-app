import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SearchPage from "../features/search/SearchPage";
import AnimeDetailPage from "../features/anime/AnimeDetailPage";
import Loader from "@/components/Loader";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Loader />
      <Routes>
        <Route path="/" element={<Navigate to="/search" replace />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/anime/:id" element={<AnimeDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
