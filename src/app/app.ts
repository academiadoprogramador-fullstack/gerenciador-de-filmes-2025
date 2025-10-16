import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BarraBusca } from './components/barra-busca/barra-busca';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, BarraBusca],
  templateUrl: './app.html',
})
export class App {}
