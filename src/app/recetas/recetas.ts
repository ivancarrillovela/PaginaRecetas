import { Component } from '@angular/core';
import { RecetaForm } from '../receta-form/receta-form';
import { RecetaCard } from "../receta-card/receta-card";
import { RecetaModel } from '../models/RecetaModel';

// Los datos por defecto, como pediste
const RECETAS_POR_DEFECTO: RecetaModel[] = [
  new RecetaModel(
    '1',
    'Tortilla de Patatas',
    ['5 Patatas', '6 Huevos', '1 Cebolla', 'Aceite de Oliva', 'Sal'],
    'https://images.unsplash.com/photo-1599551109232-6affc6d190b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDg4NDh8MHwxfGFsbHwxfHx8fHx8fHwxNjE2MTg0OTI4&ixlib-rb-1.2.1&q=80&w=400'
  ),
  new RecetaModel(
    '2',
    'Gazpacho Andaluz',
    ['1kg Tomates', '1 Pepino', '1 Pimiento Verde', '1/2 Cebolla', '1 Diente de Ajo', 'Aceite de Oliva', 'Vinagre', 'Sal'],
    'https://images.unsplash.com/photo-1628104886801-4770d36b4412?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDg4NDh8MHwxfGFsbHwxfHx8fHx8fHwxNjE2MTg0OTI4&ixlib.rb-1.2.1&q=80&w=400'
  )
];

@Component({
  selector: 'app-recetas',
  imports: [RecetaCard, RecetaForm],
  templateUrl: './recetas.html',
  styleUrl: './recetas.scss'
})
export class Recetas {
  
  recetas: RecetaModel[] = RECETAS_POR_DEFECTO;

  agregarReceta(nuevaReceta: RecetaModel) {
    this.recetas.push(nuevaReceta);
  }

}
