import { filter, map, shareReplay, switchMap } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TipoMidia } from '../../models/tipo-midia';
import { MidiaService } from '../../services/midia.service';
import { CardMidia } from '../shared/card-midia/card-midia';

@Component({
  selector: 'app-busca',
  imports: [AsyncPipe, CardMidia],
  templateUrl: './busca.html',
})
export class Busca {
  private readonly route = inject(ActivatedRoute);
  private readonly midiaService = inject(MidiaService);

  protected readonly queryParam$ = this.route.queryParamMap.pipe(
    filter((queryParams) => queryParams.has('query')),
    map((queryParams) => queryParams.get('query')!)
  );

  protected readonly midiasSelecionadas$ = this.queryParam$.pipe(
    switchMap((queryParam) => this.midiaService.buscarMidias(queryParam)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  protected readonly filmesSelecionados$ = this.midiasSelecionadas$.pipe(
    map((midias) => midias.results.filter((r) => r.media_type === TipoMidia.Filme))
  );

  protected readonly seriesSelecionadas$ = this.midiasSelecionadas$.pipe(
    map((midias) => midias.results.filter((r) => r.media_type === TipoMidia.Tv))
  );
}
