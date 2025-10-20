import { TipoMidia } from './tipo-midia';

export interface MidiaApiResponse {
  media_type: TipoMidia;
  page: number;
  results: (Midia | MidiaResultadoBusca)[];
  total_pages: number;
  total_results: number;
}

// Representa tanto Filme quanto Série
export interface Midia {
  id: number;
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

export interface ResultadoBuscaApiResponse {
  page: number;
  results: MidiaResultadoBusca[];
  total_pages: number;
  total_results: number;
}

export interface MidiaResultadoBusca {
  id: number;
  media_type: TipoMidia;
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
