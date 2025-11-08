import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { searchAnime } from "../../services/api";
import type { Anime, PaginatedResponse } from "../../types/anime";

type SearchState = {
  query: string;
  page: number;
  results: Anime[];
  totalPages: number;
  loading: boolean;
  error?: string | null;
};
const initialState: SearchState = {
  query: "",
  page: 1,
  results: [],
  totalPages: 1,
  loading: false,
  error: null,
};
let controller: AbortController | null = null;

export const fetchSearch = createAsyncThunk<
  PaginatedResponse<Anime>,
  void,
  { state: RootState }
>("search/fetch", async (_, { getState, signal }) => {
  const { query, page } = getState().search;
  if (controller) controller.abort();
  controller = new AbortController();
  const combined = new AbortController();
  signal.addEventListener("abort", () => combined.abort(), { once: true });
  controller.signal.addEventListener("abort", () => combined.abort(), {
    once: true,
  });
  const data = await searchAnime(query, page, combined.signal);
  return data;
});
const slice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    clear(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.data;
        state.totalPages = action.payload.pagination.last_visible_page;
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.name === "CanceledError"
            ? null
            : action.error.message || "Unknown error";
      });
  },
});

export const { setQuery, setPage, clear } = slice.actions;
export default slice.reducer;
