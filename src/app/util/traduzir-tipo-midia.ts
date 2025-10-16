import { TipoMidia } from '../models/tipo-midia';

export function traduzirTipoMidia(tipoMidia: TipoMidia) {
  if (!Object.values(TipoMidia).includes(tipoMidia))
    throw new Error('Valor de enum "TipoMidia" inválido.');

  return tipoMidia === 'filme' ? 'movie' : 'tv';
}
