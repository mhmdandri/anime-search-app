import SearchBar from "./components/SearchBar";
import AnimeList from "./components/AnimeList";
import Pagination from "./components/Pagination";

export default function SearchPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 items-center">Anime Search</h1>
      <SearchBar />
      <div className="my-4">
        <AnimeList />
      </div>
      <Pagination />
    </div>
  );
}
