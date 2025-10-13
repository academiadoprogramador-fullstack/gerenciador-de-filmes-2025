import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BannerPrincipal } from './components/banner-principal/banner-principal';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, BannerPrincipal],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('gerenciador-de-filmes-2025');
}
