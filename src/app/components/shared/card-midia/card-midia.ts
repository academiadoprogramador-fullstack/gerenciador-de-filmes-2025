import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Midia } from '../../../models/midia-api-response';
import { TipoMidia } from '../../../models/tipo-midia';
import { IconeAvaliacao } from '../icone-avaliacao/icone-avaliacao';

@Component({
  selector: 'app-card-midia',
  imports: [RouterLink, IconeAvaliacao],
  template: `
    @if (midia) {
    <div class="card rounded-3 app-card-filme">
      @if (midia.vote_average > 0) {
      <app-icone-avaliacao
        [avaliacao]="midia.vote_average"
        [tamanhoPx]="35"
        class="app-icone-absoluto"
      ></app-icone-avaliacao>
      }

      <a
        class="text-decoration-none text-dark"
        [title]="midia.title ?? midia.name"
        [routerLink]="['/', tipoMidia, midia.id, 'detalhes']"
        ><img
          class="card-img-top rounded-3"
          [src]="midia.poster_path"
          [alt]="midia.title ?? midia.name"
      /></a>

      @if (midia.favorite) {
      <button
        class="btn app-botao-favorito-absoluto"
        title="Remover dos favoritos"
        (click)="alternarStatusFavorito.emit(midia)"
      >
        <i class="bi bi-star-fill fs-4 text-warning"></i>
      </button>
      } @else {
      <button
        class="btn app-botao-favorito-absoluto"
        title="Adicionar aos favoritos"
        (click)="alternarStatusFavorito.emit(midia)"
      >
        <i class="bi bi-star fs-4 text-warning"></i>
      </button>
      }
    </div>

    <div class="mt-2">
      <a
        class="text-decoration-none text-dark"
        [title]="midia.title ?? midia.name"
        [routerLink]="['/', tipoMidia, midia.id, 'detalhes']"
      >
        <small class="text-muted fw-semibold">{{
          midia.release_date ?? midia.first_air_date
        }}</small>
        <p class="app-titulo-card fw-bold">
          {{ (midia.title ?? midia.name)?.slice(0, 30) }}
        </p>
      </a>
    </div>
    }
  `,
})
export class CardMidia {
  @Input({ required: true }) midia?: Midia;
  @Input({ required: true }) tipoMidia?: TipoMidia;

  @Output() public alternarStatusFavorito = new EventEmitter<Midia>();
}
