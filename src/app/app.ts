import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BarraBusca } from './components/shared/barra-busca/barra-busca';
import { Navbar } from './components/shared/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, BarraBusca],
  templateUrl: './app.html',
})
export class App {}
