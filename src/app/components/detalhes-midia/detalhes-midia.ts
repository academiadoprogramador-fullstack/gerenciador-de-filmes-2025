import { filter, map, shareReplay, switchMap } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TipoMidia } from '../../models/tipo-midia';
import { MidiaFavoritaService } from '../../services/midia-favorita.service';
import { MidiaService } from '../../services/midia-service';
import { IconeAvaliacao } from '../shared/icone-avaliacao/icone-avaliacao';

@Component({
  selector: 'app-detalhes-midia',
  imports: [AsyncPipe, IconeAvaliacao],
  templateUrl: './detalhes-midia.html',
})
export class DetalhesMidia {
  protected readonly route = inject(ActivatedRoute);
  protected readonly midiaService = inject(MidiaService);
  protected readonly midiaFavoritaService = inject(MidiaFavoritaService);

  protected readonly detalhes$ = this.route.paramMap.pipe(
    filter((params) => params.get('tipoMidia') !== null && params.get('idMidia') !== null),
    map((params) => {
      return {
        tipoMidia: params.get('tipoMidia') as TipoMidia,
        idMidia: parseInt(params.get('idMidia')!),
      };
    }),
    switchMap((params) =>
      this.midiaService.selecionarDetalhesMidiaPorId(params.tipoMidia, params.idMidia)
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  protected readonly videos$ = this.detalhes$.pipe(
    switchMap((detalhes) =>
      this.midiaService.selecionarVideosMidiaPorId(detalhes.media_type, detalhes.id)
    )
  );

  public readonly creditos$ = this.detalhes$.pipe(
    switchMap((x) => this.midiaService.selecionarCreditosMidiaPorId(x.media_type, x.id))
  );
}
