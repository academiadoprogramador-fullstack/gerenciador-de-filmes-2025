import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { MidiaFavorita } from '../models/midia-favorita';

@Injectable({
  providedIn: 'root',
})
export class MidiaFavoritaService {
  private readonly chave: string = 'gerenciador-de-filmes:favoritos';

  private readonly midiasFavoritasSubject$ = new BehaviorSubject<MidiaFavorita[]>([]);

  constructor() {
    const jsonString = localStorage.getItem(this.chave);

    if (!jsonString) return;

    this.midiasFavoritasSubject$.next(JSON.parse(jsonString));
  }

  public adicionarMidiaFavorita(midia: MidiaFavorita) {
    const favoritosAtuais = this.midiasFavoritasSubject$.getValue();

    favoritosAtuais.push(midia);

    this.midiasFavoritasSubject$.next(favoritosAtuais);

    const jsonString = JSON.stringify(favoritosAtuais);

    localStorage.setItem(this.chave, jsonString);
  }

  public removerMidiaFavorita(idMidia: number) {
    const favoritosAtuais = this.midiasFavoritasSubject$.getValue();

    const index = favoritosAtuais.findIndex((x) => x.id == idMidia);

    if (index > -1) favoritosAtuais.splice(index, 1);

    this.midiasFavoritasSubject$.next(favoritosAtuais);

    const jsonString = JSON.stringify(favoritosAtuais);

    localStorage.setItem(this.chave, jsonString);
  }

  public selecionarMidiasFavoritas(): Observable<MidiaFavorita[]> {
    return this.midiasFavoritasSubject$.asObservable();
  }
}
