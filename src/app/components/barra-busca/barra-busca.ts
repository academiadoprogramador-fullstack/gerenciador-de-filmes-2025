import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-barra-busca',
  imports: [FormsModule],
  templateUrl: './barra-busca.html',
})
export class BarraBusca {
  protected inputBusca: string | null = null;

  public pesquisar(): void {
    if (!this.inputBusca) return;

    this.inputBusca = null;
  }
}
