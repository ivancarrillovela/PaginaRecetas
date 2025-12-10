import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecetaModel } from '../models/RecetaModel';
import { StarRatingComponent } from '../star-rating/star-rating';

@Component({
  selector: 'app-receta-card',
  standalone: true,
  imports: [RouterLink, StarRatingComponent],
  templateUrl: './receta-card.html',
  styleUrl: './receta-card.scss'
})
export class RecetaCard {
  receta = input.required<RecetaModel>();
  borrarReceta = output<string>();
  votarReceta = output<number>();

  alBorrar() {
    this.borrarReceta.emit(this.receta().id);
  }

  alVotar(puntuacion: number) {
    this.votarReceta.emit(puntuacion);
  }
}