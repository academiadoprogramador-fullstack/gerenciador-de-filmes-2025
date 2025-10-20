import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TipoMidia } from '../../../models/tipo-midia';

@Component({
  selector: 'app-selecao-carrossel-midias',
  template: `
    <div class="btn-group rounded-pill overflow-hidden" role="group">
      <input
        (change)="tipoMidiaAlterado(tipoMidia.Filme)"
        [checked]="tipoMidiaSelecionado === tipoMidia.Filme"
        type="radio"
        class="btn-check"
        [name]="atributoName"
        [id]="atributoId"
      />
      <label [for]="atributoId" class="btn btn-sm btn-outline-primary border-0">Filmes</label>

      <input
        (change)="tipoMidiaAlterado(tipoMidia.Tv)"
        [checked]="tipoMidiaSelecionado === tipoMidia.Tv"
        type="radio"
        class="btn-check"
        [name]="atributoName"
        [id]="atributoId + '1'"
      />
      <label [for]="atributoId + '1'" class="btn btn-sm btn-outline-primary border-0">TV</label>
    </div>
  `,
})
export class SelecaoCarrosselMidias {
  @Input({ required: true }) public atributoName: string = 'defaultInputName';
  @Input({ required: true }) public atributoId: string = 'defaultInputId';
  @Input() public tipoMidiaSelecionado: TipoMidia = TipoMidia.Filme;
  @Output() public valorSelecionado = new EventEmitter<TipoMidia>();

  protected tipoMidia = TipoMidia;

  public tipoMidiaAlterado(tipoMidia: TipoMidia) {
    this.tipoMidiaSelecionado = tipoMidia;

    this.valorSelecionado.emit(tipoMidia);
  }
}
