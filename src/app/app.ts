import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BannerPrincipal } from './components/banner-principal/banner-principal';
import { Navbar } from './components/navbar/navbar';
import { MidiaService } from './services/midia-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, BannerPrincipal],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly midiaService = inject(MidiaService);

  ngOnInit(): void {
    this.midiaService.selecionarMidiasPopulares().subscribe((v) => console.log(v));
  }
}
