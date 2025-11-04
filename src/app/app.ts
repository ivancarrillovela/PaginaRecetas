import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Recetas } from './recetas/recetas';

@Component({
  selector: 'app-root',
  imports: [Recetas],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('PaginaRecetas');
}
