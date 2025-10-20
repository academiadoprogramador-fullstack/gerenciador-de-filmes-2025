import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-botoes-paginacao',
  imports: [NgClass],
  template: `<section id="paginacao" class="row justify-content-center gap-2 mt-2 g-2">
    @for (pagina of paginasDisponiveis?.paginas; track $index) {
    <button
      style="min-width: 33px"
      class="col-auto btn btn-sm rounded-circle"
      (click)="paginaRequisitada.emit(pagina)"
      [ngClass]="{
        'btn-outline-primary': paginasDisponiveis?.paginaAtual !== pagina,
        'btn-primary': paginasDisponiveis?.paginaAtual === pagina
      }"
    >
      {{ pagina }}
    </button>
    }
  </section>`,
})
export class BotoesPaginacao {
  @Input({ required: true }) paginasDisponiveis?: {
    paginaAtual: number;
    totalPaginas: number;
    paginas: number[];
  };

  @Output() paginaRequisitada = new EventEmitter<number>();
}
