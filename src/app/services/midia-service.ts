import { map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { environment } from '../../environments/environment';
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
    const tipoTraduzido = tipo === 'filme' ? 'movie' : 'tv';

    const urlCompleto = `${this.urlBase}/${tipoTraduzido}/popular?language=pt-BR`;

    return this.http
      .get<MidiaApiResponse>(urlCompleto, {
        headers: {
          Authorization: environment.apiKey,
        },
      })
      .pipe(map((res) => this.mapearMidia(res, tipo)));
  }

  public selecionarMidiasMaisVotadas(tipo: TipoMidia): Observable<MidiaApiResponse> {
    const tipoTraduzido = tipo === 'filme' ? 'movie' : 'tv';

    const urlCompleto = `${this.urlBase}/${tipoTraduzido}/top_rated?language=pt-BR`;

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
    const tipoTraduzido = tipo === 'filme' ? 'movie' : 'tv';

    const urlCompleto = `${this.urlBase}/${tipoTraduzido}/${idMidia}?language=pt-BR`;

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
    const tipoTraduzido = tipo === 'filme' ? 'movie' : 'tv';

    const urlCompleto = `${this.urlBase}/${tipoTraduzido}/${idMidia}/videos?language=pt-BR`;

    return this.http
      .get<VideosMidiaApiResponse>(urlCompleto, {
        headers: {
          Authorization: environment.apiKey,
        },
      })
      .pipe(map((res) => this.mapearVideosMidia(res)));
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

  private mapearMidia(x: MidiaApiResponse, tipoMidia: TipoMidia): MidiaApiResponse {
    return {
      ...x,
      type: tipoMidia,
      results: x.results.map((y) => ({
        ...y,
        poster_path: 'https://image.tmdb.org/t/p/w500' + y.poster_path,
        backdrop_path: 'https://image.tmdb.org/t/p/original' + y.backdrop_path,
      })),
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
}
