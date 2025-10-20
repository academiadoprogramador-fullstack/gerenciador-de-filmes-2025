import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Midia } from '../../../models/midia-api-response';
import { TipoMidia } from '../../../models/tipo-midia';
import { CardMidia } from '../card-midia/card-midia';

@Component({
  selector: 'app-carrossel-midias',
  imports: [CardMidia, NgClass],
  template: `
    <div
      class="row flex-nowrap overflow-x-scroll g-3 mt-1 app-scrollbar-customizado"
      [ngClass]="{ 'app-background-popular': popular }"
    >
      @for (midia of midias; track midia.id) {
      <div class="col-7 col-lg-3 col-xl-2">
        <app-card-midia
          [tipoMidia]="tipoMidia"
          [midia]="midia"
          (alternarStatusFavorito)="alternarStatusFavorito.emit($event)"
        ></app-card-midia>
      </div>
      }
    </div>
  `,
})
export class CarrosselMidias {
  @Input({ required: true }) public tipoMidia: TipoMidia = TipoMidia.Filme;
  @Input({ required: true }) public midias: Midia[] = [];
  @Input({ required: false }) public popular: boolean = false;

  @Output() public alternarStatusFavorito = new EventEmitter<Midia>();
}
