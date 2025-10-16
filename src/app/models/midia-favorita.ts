import { TipoMidia } from './tipo-midia';

export interface MidiaFavorita {
  id: number;
  media_type: TipoMidia;
  title?: string;
  name?: string;
  poster_path: string;
}
