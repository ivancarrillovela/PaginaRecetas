import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Recetas } from './recetas/recetas';
import { Header } from "./header/header";
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [Recetas, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('PaginaRecetas');
}
