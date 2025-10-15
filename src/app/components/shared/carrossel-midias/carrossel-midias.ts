import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Midia } from '../../../models/midia-api-response';
import { TipoMidia } from '../../../models/tipo-midia';

@Component({
  selector: 'app-carrossel-midias',
  imports: [RouterLink],
  templateUrl: './carrossel-midias.html',
})
export class CarrosselMidias {
  @Input({ required: true }) public tipoMidia: TipoMidia = TipoMidia.Filme;
  @Input({ required: true }) public midias: Midia[] = [];
}
