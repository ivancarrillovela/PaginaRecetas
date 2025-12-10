import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.scss'
})
export class StarRating {
  // Inputs: Valoración actual y si es de solo lectura
  rating = input<number>(0);
  readonly = input<boolean>(false);

  // Output: Emite el valor cuando el usuario hace click
  rate = output<number>();

  onRate(value: number) {
    // Solo emitimos si no es de solo lectura
    if (!this.readonly()) {
      this.rate.emit(value);
    }
  }
}