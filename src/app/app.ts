import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { BarraBusca } from './components/shared/barra-busca/barra-busca';
import { Navbar } from './components/shared/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, BarraBusca],
  templateUrl: './app.html',
})
export class App {
  private readonly router = inject(Router);

  public buscar(query: string) {
    this.router.navigate(['/busca'], { queryParams: { query } });
  }
}
