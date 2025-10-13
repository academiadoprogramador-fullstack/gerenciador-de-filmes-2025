import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { BannerPrincipal } from './components/banner-principal/banner-principal';
import { Navbar } from './components/navbar/navbar';
import { MidiaService } from './services/midia-service';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, Navbar, BannerPrincipal],
  templateUrl: './app.html',
})
export class App {
  protected readonly midiaService = inject(MidiaService);

  protected readonly midiasPopulares$ = this.midiaService.selecionarMidiasPopulares();
}
