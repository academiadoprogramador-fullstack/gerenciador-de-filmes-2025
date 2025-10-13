import { map } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { MidiaApiResponse } from '../models/midia-api-response';

@Injectable({
  providedIn: 'root',
})
export class MidiaService {
  private readonly http = inject(HttpClient);
  private readonly urlBase: string = 'https://api.themoviedb.org/3';

  public selecionarMidiasPopulares() {
    const urlCompleto = `${this.urlBase}/movie/popular?language=pt-BR`;

    return this.http
      .get<MidiaApiResponse>(urlCompleto, {
        headers: {
          Authorization: environment.apiKey,
        },
      })
      .pipe(
        map((x) => {
          return {
            ...x,
            results: x.results.map((y) => ({
              ...y,
              poster_path: 'https://image.tmdb.org/t/p/w500' + y.poster_path,
              backdrop_path: 'https://image.tmdb.org/t/p/original' + y.backdrop_path,
            })),
          };
        })
      );
  }
}
