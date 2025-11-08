import axios from "axios";

const api = axios.create({
  baseURL: "https://api.jikan.moe/v4",
  timeout: 10000,
});
export const searchAnime = async (
  q: string,
  page: number = 1,
  signal?: AbortSignal
) => {
  const res = await api.get("/anime", {
    params: { q, page },
    signal,
  });
  return res.data;
};
export const getAnime = async (id: string, signal?: AbortSignal) => {
  const res = await api.get(`/anime/${id}`, { signal });
  return res.data;
};
