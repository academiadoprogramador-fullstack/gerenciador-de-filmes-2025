import { map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { environment } from '../../environments/environment';
import { CreditosMidiaApiResponse } from '../models/creditos-midia-api-response';
import { DetalhesMidia } from '../models/detalhes-midia';
import { MidiaApiResponse } from '../models/midia-api-response';
import { TipoMidia } from '../models/tipo-midia';
import { VideosMidiaApiResponse } from '../models/videos-midia-api-response';

@Injectable({
  providedIn: 'root',
})
export class MidiaService {
  private readonly http = inject(HttpClient);
  private readonly domSanitizer = inject(DomSanitizer);
  private readonly urlBase: string = 'https://api.themoviedb.org/3';

  public selecionarMidiasPopulares(tipo: TipoMidia): Observable<MidiaApiResponse> {
    const urlCompleto = `${this.urlBase}/${this.traduzirTipoMidia(tipo)}/popular?language=pt-BR`;

    return this.http
      .get<MidiaApiResponse>(urlCompleto, {
        headers: {
          Authorization: environment.apiKey,
        },
      })
      .pipe(map((res) => this.mapearMidia(res, tipo)));
  }

  public selecionarMidiasMaisVotadas(tipo: TipoMidia): Observable<MidiaApiResponse> {
    const urlCompleto = `${this.urlBase}/${this.traduzirTipoMidia(tipo)}/top_rated?language=pt-BR`;

    return this.http
      .get<MidiaApiResponse>(urlCompleto, {
        headers: {
          Authorization: environment.apiKey,
        },
      })
      .pipe(map((res) => this.mapearMidia(res, tipo)));
  }

  public selecionarFilmesEmCartaz(): Observable<MidiaApiResponse> {
    const urlCompleto = `${this.urlBase}/movie/now_playing?language=pt-BR`;

    return this.http
      .get<MidiaApiResponse>(urlCompleto, {
        headers: {
          Authorization: environment.apiKey,
        },
      })
      .pipe(map(this.mapearFilme));
  }

  public selecionarDetalhesMidiaPorId(tipo: TipoMidia, idMidia: number): Observable<DetalhesMidia> {
    const urlCompleto = `${this.urlBase}/${this.traduzirTipoMidia(tipo)}/${idMidia}?language=pt-BR`;

    return this.http
      .get<DetalhesMidia>(urlCompleto, {
        headers: {
          Authorization: environment.apiKey,
        },
      })
      .pipe(map((res) => this.mapearDetalhesMidia(res, tipo)));
  }

  public selecionarVideosMidiaPorId(
    tipo: TipoMidia,
    idMidia: number
  ): Observable<VideosMidiaApiResponse> {
    const urlCompleto = `${this.urlBase}/${this.traduzirTipoMidia(
      tipo
    )}/${idMidia}/videos?language=pt-BR`;

    return this.http
      .get<VideosMidiaApiResponse>(urlCompleto, {
        headers: {
          Authorization: environment.apiKey,
        },
      })
      .pipe(map((res) => this.mapearVideosMidia(res)));
  }

  public selecionarCreditosMidiaPorId(
    tipo: TipoMidia,
    idMidia: number
  ): Observable<CreditosMidiaApiResponse> {
    const urlCompleto = `${this.urlBase}/${this.traduzirTipoMidia(
      tipo
    )}/${idMidia}/credits?language=pt-BR`;

    return this.http
      .get<CreditosMidiaApiResponse>(urlCompleto, {
        headers: {
          Authorization: environment.apiKey,
        },
      })
      .pipe(map(this.mapearCreditosMidia));
  }

  private mapearMidia(x: MidiaApiResponse, tipo: TipoMidia): MidiaApiResponse {
    return {
      ...x,
      type: tipo,
      results: x.results.map((y) => ({
        ...y,
        poster_path: 'https://image.tmdb.org/t/p/w500' + y.poster_path,
        backdrop_path: 'https://image.tmdb.org/t/p/original' + y.backdrop_path,
      })),
    };
  }

  private mapearFilme(x: MidiaApiResponse): MidiaApiResponse {
    return {
      ...x,
      type: TipoMidia.Filme,
      results: x.results.map((y) => ({
        ...y,
        poster_path: 'https://image.tmdb.org/t/p/w500' + y.poster_path,
        backdrop_path: 'https://image.tmdb.org/t/p/original' + y.backdrop_path,
      })),
    };
  }

  private mapearDetalhesMidia(x: DetalhesMidia, tipo: TipoMidia): DetalhesMidia {
    return {
      ...x,
      type: tipo,
      vote_average: x.vote_average * 10,
      poster_path: 'https://image.tmdb.org/t/p/w500/' + x.poster_path,
      backdrop_path: 'https://image.tmdb.org/t/p/original/' + x.backdrop_path,
    };
  }

  private mapearVideosMidia(x: VideosMidiaApiResponse): VideosMidiaApiResponse {
    return {
      ...x,
      results: x.results
        .filter((v) => v.site.toLowerCase() === 'youtube')
        .map((v) => ({
          ...v,
          key: this.domSanitizer.bypassSecurityTrustResourceUrl(
            'https://www.youtube.com/embed/' + v.key
          ),
        })),
    };
  }

  private mapearCreditosMidia(x: CreditosMidiaApiResponse): CreditosMidiaApiResponse {
    return {
      ...x,
      cast: x.cast.map((y) => ({
        ...y,
        profile_path: y.profile_path
          ? 'https://image.tmdb.org/t/p/w300/' + y.profile_path
          : '/person-placeholder.png',
      })),
      crew: x.crew.map((y) => ({
        ...y,
        profile_path: y.profile_path
          ? 'https://image.tmdb.org/t/p/w300/' + y.profile_path
          : '/person-placeholder.png',
      })),
    };
  }

  private traduzirTipoMidia(tipoMidia: TipoMidia) {
    if (!Object.values(TipoMidia).includes(tipoMidia))
      throw new Error('Valor de enum "TipoMidia" inválido.');

    return tipoMidia === 'filme' ? 'movie' : 'tv';
  }
}
