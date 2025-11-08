import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAnime } from "../../services/api";
import type { Anime } from "../../types/anime";

type AnimeState = {
  current?: Anime;
  loading: boolean;
  error?: string | null;
};
const initialState: AnimeState = { loading: false, error: null };
export const fetchAnimeById = createAsyncThunk(
  "anime/fetchById",
  async (id: string) => {
    const res = await getAnime(id);
    return res.data as Anime;
  }
);
const slice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    clearAnime: (s) => {
      s.current = undefined;
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchAnimeById.pending, (s) => {
      s.loading = true;
      s.error = null;
    })
      .addCase(fetchAnimeById.fulfilled, (s, a) => {
        s.loading = false;
        s.current = a.payload;
      })
      .addCase(fetchAnimeById.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message || "Unknown error";
      });
  },
});
export const { clearAnime } = slice.actions;
export default slice.reducer;
