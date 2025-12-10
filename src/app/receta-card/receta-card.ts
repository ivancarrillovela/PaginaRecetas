import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Cambiamos RouterLink por CommonModule si es necesario
import { RecetaModel } from '../models/RecetaModel';
import { StarRatingComponent } from '../star-rating/star-rating';

@Component({
  selector: 'app-receta-card',
  standalone: true,
  imports: [CommonModule, StarRatingComponent], // Quitamos RouterLink
  templateUrl: './receta-card.html',
  styleUrl: './receta-card.scss'
})
export class RecetaCard {
  receta = input.required<RecetaModel>();
  borrarReceta = output<string>();
  votarReceta = output<number>();
  
  // Output para abrir el modal
  verDetalle = output<string>();

  alBorrar() {
    this.borrarReceta.emit(this.receta().id);
  }

  alVotar(puntuacion: number) {
    this.votarReceta.emit(puntuacion);
  }

  // Método que emite el ID
  onVerDetalle() {
    this.verDetalle.emit(this.receta().id);
  }
}