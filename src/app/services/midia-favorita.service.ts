import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { DetalhesMidia } from '../models/detalhes-midia';
import { Midia } from '../models/midia-api-response';
import { MidiaFavorita } from '../models/midia-favorita';

@Injectable({
  providedIn: 'root',
})
export class MidiaFavoritaService {
  private readonly chave: string = 'apmdb:favoritos';

  private readonly midiasFavoritasSubject$ = new BehaviorSubject<(Midia | DetalhesMidia)[]>([]);

  constructor() {
    const jsonString = localStorage.getItem(this.chave);

    if (!jsonString) return;

    this.midiasFavoritasSubject$.next(JSON.parse(jsonString));
  }

  public alternarStatusMidiaFavorita(midia: Midia | DetalhesMidia) {
    const favoritosAtuais = this.midiasFavoritasSubject$.getValue();

    if (!midia.favorite) {
      midia.favorite = true;
      favoritosAtuais.push(midia);
    } else {
      midia.favorite = false;

      const index = favoritosAtuais.findIndex((x) => x.id === midia.id);

      if (index > -1) favoritosAtuais.splice(index, 1);
    }

    this.midiasFavoritasSubject$.next(favoritosAtuais);

    const jsonString = JSON.stringify(favoritosAtuais);

    localStorage.setItem(this.chave, jsonString);
  }

  public selecionarMidiasFavoritas(): Observable<MidiaFavorita[]> {
    return this.midiasFavoritasSubject$.asObservable();
  }
}
