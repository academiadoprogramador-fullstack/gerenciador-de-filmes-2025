export interface ResultadoBuscaApiResponse {
  page: number;
  results: ResultadoBusca[];
  total_pages: number;
  total_results: number;
}

export interface ResultadoBusca {
  id: number;
  media_type: string;
  adult: boolean;
  original_language: string;
  original_title: string;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}
