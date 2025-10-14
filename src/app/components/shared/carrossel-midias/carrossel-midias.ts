import { Component, Input } from '@angular/core';

import { Midia } from '../../../models/midia-api-response';

@Component({
  selector: 'app-carrossel-midias',
  imports: [],
  templateUrl: './carrossel-midias.html',
})
export class CarrosselMidias {
  @Input({ required: true }) public midias: Midia[] = [];
}
