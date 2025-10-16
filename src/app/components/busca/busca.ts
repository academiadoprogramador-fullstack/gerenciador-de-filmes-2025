import { distinctUntilChanged, filter, map, refCount, shareReplay, switchMap, tap } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MidiaService } from '../../services/midia-service';

@Component({
  selector: 'app-busca',
  imports: [AsyncPipe],
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
    tap((midias) => console.log(midias))
  );
}
