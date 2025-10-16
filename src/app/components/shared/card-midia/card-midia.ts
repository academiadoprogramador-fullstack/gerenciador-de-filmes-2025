import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Midia } from '../../../models/midia-api-response';
import { TipoMidia } from '../../../models/tipo-midia';
import { IconeAvaliacao } from '../icone-avaliacao/icone-avaliacao';

@Component({
  selector: 'app-card-midia',
  imports: [RouterLink, IconeAvaliacao],
  template: `
    @if (midia) {
    <a
      class="text-decoration-none text-dark"
      [title]="midia.title ?? midia.name"
      [routerLink]="['/', tipoMidia, midia.id, 'detalhes']"
      ><div class="card rounded-3 app-card-filme">
        @if (midia.vote_average > 0) {
        <app-icone-avaliacao
          [avaliacao]="midia.vote_average"
          [tamanhoPx]="40"
          class="app-icone-absoluto"
        ></app-icone-avaliacao>
        }

        <img
          class="card-img-top rounded-3"
          style="min-height: 270px"
          [src]="midia.poster_path"
          [alt]="midia.title ?? midia.name"
        />
      </div>

      <div class="mt-2">
        <small class="text-muted">{{ midia.release_date ?? midia.first_air_date }}</small>
        <p class="app-titulo-card fw-bold">
          {{ (midia.title ?? midia.name)?.slice(0, 30) }}
        </p>
      </div>
    </a>
    }
  `,
})
export class CardMidia {
  @Input({ required: true }) midia?: Midia;
  @Input({ required: true }) tipoMidia?: TipoMidia;
}
