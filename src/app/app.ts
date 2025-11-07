import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Recetas } from './recetas/recetas';
import { Header } from "./header/header";

@Component({
  selector: 'app-root',
  imports: [Recetas, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('PaginaRecetas');
}
