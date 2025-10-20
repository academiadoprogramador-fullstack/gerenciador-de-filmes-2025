import { BehaviorSubject, switchMap } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { TipoMidia } from '../../models/tipo-midia';
import { MidiaService } from '../../services/midia.service';
import { BannerPrincipal } from '../shared/banner-principal/banner-principal';
import { CarrosselMidias } from '../shared/carrossel-midias/carrossel-midias';
import {
    SelecaoCarrosselMidias
} from '../shared/selecao-carrossel-midias/selecao-carrossel-midias';

@Component({
  selector: 'app-inicio',
  imports: [AsyncPipe, BannerPrincipal, CarrosselMidias, SelecaoCarrosselMidias],
  templateUrl: './inicio.html',
})
export class Inicio {
  protected readonly midiaService = inject(MidiaService);
  protected readonly tipoMidia = TipoMidia;

  protected readonly midiasPopularesSubject$ = new BehaviorSubject<TipoMidia>(TipoMidia.Filme);
  protected readonly midiasMaisVotadasSubject$ = new BehaviorSubject<TipoMidia>(TipoMidia.Filme);

  protected readonly midiasPopulares$ = this.midiasPopularesSubject$.pipe(
    switchMap((tipo) => this.midiaService.selecionarMidiasPopulares(tipo))
  );

  protected readonly midiasMaisVotadas$ = this.midiasMaisVotadasSubject$.pipe(
    switchMap((tipo) => this.midiaService.selecionarMidiasMaisVotadas(tipo))
  );

  protected readonly filmesEmCartaz$ = this.midiaService.selecionarFilmesEmCartaz();
}
