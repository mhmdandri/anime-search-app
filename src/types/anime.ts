export type Anime = {
  mal_id: number;
  url?: string;
  title: string;
  title_japanese?: string | null;
  images: { jpg?: { image_url?: string } };
  synopsis?: string | null;
  year?: number | null;
  season?: string | null;
  score?: number | null;
  rank?: number | null;
  popularity?: number | null;
  members?: number | null;
  favorites?: number | null;
  type?: string | null;
  episodes?: number | null;
  duration?: string | null;
  rating?: string | null;
  studios?: { name: string }[];
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: { count: number; total: number; per_page: number };
  };
};
