import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.scss'
})
export class StarRatingComponent {
  rating = input<number>(0); // Puntuación actual (0-5)
  readonly = input<boolean>(false); // Si es true no permite votar
  rate = output<number>(); // Emite la puntuación seleccionada

  onRate(value: number) {
    if (!this.readonly()) {
      this.rate.emit(value);
    }
  }
}