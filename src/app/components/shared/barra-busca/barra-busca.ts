import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-barra-busca',
  imports: [FormsModule],
  templateUrl: './barra-busca.html',
})
export class BarraBusca {
  protected inputBusca: string | null = null;

  @Output() protected buscaRealizada = new EventEmitter<string>();

  public buscar(): void {
    if (!this.inputBusca) return;

    this.buscaRealizada.emit(this.inputBusca);

    this.inputBusca = null;
  }
}
