import { BehaviorSubject, switchMap } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { TipoMidia } from '../../models/tipo-midia';
import { MidiaService } from '../../services/midia-service';
import { BannerPrincipal } from '../banner-principal/banner-principal';
import { CarrosselMidias } from '../shared/carrossel-midias/carrossel-midias';

@Component({
  selector: 'app-inicio',
  imports: [AsyncPipe, BannerPrincipal, CarrosselMidias],
  templateUrl: './inicio.html',
})
export class Inicio {
  protected readonly midiaService = inject(MidiaService);
  protected readonly tipoMidia = TipoMidia;

  protected readonly midiasPopularesSubject$ = new BehaviorSubject<TipoMidia>(TipoMidia.Filme);

  // pega o valor sendo emitido entre filme/tv
  protected readonly midiasPopulares$ = this.midiasPopularesSubject$.pipe(
    // utiliza o valor para chamar o serviço e obter as mídias do tipo requisitado
    switchMap((tipo) => this.midiaService.selecionarMidiasPopulares(tipo))
  );

  protected readonly midiasMaisVotadasSubject$ = new BehaviorSubject<TipoMidia>(TipoMidia.Filme);

  // pega o valor sendo emitido entre filme/tv
  protected readonly midiasMaisVotadas$ = this.midiasMaisVotadasSubject$.pipe(
    // utiliza o valor para chamar o serviço e obter as mídias do tipo requisitado
    switchMap((tipo) => this.midiaService.selecionarMidiasMaisVotadas(tipo))
  );

  protected readonly filmesEmCartaz$ = this.midiaService.selecionarFilmesEmCartaz();
}
