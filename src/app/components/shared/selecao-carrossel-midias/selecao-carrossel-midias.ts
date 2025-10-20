import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TipoMidia } from '../../../models/tipo-midia';

@Component({
  selector: 'app-selecao-carrossel-midias',
  template: `
    <div class="btn-group rounded-pill overflow-hidden" role="group">
      <input
        (change)="tipoMidiaAlterado.emit(tipoMidia.Filme)"
        [checked]="tipoMidiaSelecionado === tipoMidia.Filme"
        type="radio"
        class="btn-check"
        [name]="nomeAgrupamento"
        [id]="idAgrupamento"
      />
      <label [for]="idAgrupamento" class="btn btn-sm btn-outline-primary border-0">Filmes</label>

      <input
        (change)="tipoMidiaAlterado.emit(tipoMidia.Tv)"
        [checked]="tipoMidiaSelecionado === tipoMidia.Tv"
        type="radio"
        class="btn-check"
        [name]="nomeAgrupamento"
        [id]="idAgrupamento + '1'"
      />
      <label [for]="idAgrupamento + '1'" class="btn btn-sm btn-outline-primary border-0">TV</label>
    </div>
  `,
})
export class SelecaoCarrosselMidias {
  @Input({ required: true }) public idAgrupamento: string = 'defaultInputId';
  @Input({ required: true }) public nomeAgrupamento: string = 'defaultInputName';
  @Input({ required: true }) public tipoMidiaSelecionado: TipoMidia = TipoMidia.Filme;

  @Output() public tipoMidiaAlterado = new EventEmitter<TipoMidia>();

  protected tipoMidia = TipoMidia;
}
