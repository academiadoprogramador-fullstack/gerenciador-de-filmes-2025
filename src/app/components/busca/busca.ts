import { distinctUntilChanged, filter, map, shareReplay, switchMap } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TipoMidia } from '../../models/tipo-midia';
import { MidiaService } from '../../services/midia-service';
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
    filter((params) => params.get('q') !== null),
    map((params) => params.get('q')!),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  protected readonly midiasSelecionadas$ = this.queryParam$.pipe(
    switchMap((searchQuery) => this.midiaService.buscarMidias(searchQuery)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  protected readonly filmesSelecionados$ = this.midiasSelecionadas$.pipe(
    map((midias) => midias.results.filter((r) => r.media_type === TipoMidia.Filme))
  );

  protected readonly seriesSelecionadas$ = this.midiasSelecionadas$.pipe(
    map((midias) => midias.results.filter((r) => r.media_type === TipoMidia.Tv))
  );
}
