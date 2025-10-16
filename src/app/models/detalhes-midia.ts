import { TipoMidia } from './tipo-midia';

export interface DetalhesMidia {
  id: number;
  media_type: TipoMidia;
  adult: boolean;
  original_language: string;
  original_title: string;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  overview?: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  budget: number;
  revenue: number;
  homepage: string;
  genres: { id: number; name: string }[];
  production_companies: { id: number; logo_path: string; name: string; origin_country: string }[];
}
