import { Component, input, output } from '@angular/core';
import { RecetaModel } from '../models/RecetaModel';

@Component({
  selector: 'app-receta-card',
  standalone: true,
  imports: [],
  templateUrl: './receta-card.html',
  styleUrl: './receta-card.scss'
})
export class RecetaCard {

  receta = input<RecetaModel>();

}
