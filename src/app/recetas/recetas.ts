import { Component } from '@angular/core';
import { RecetaForm } from '../receta-form/receta-form';
import { RecetaCard } from "../receta-card/receta-card";
import { RecetaModel } from '../models/RecetaModel';
import { CommonModule } from '@angular/common';

// Los datos por defecto, como pediste
const RECETAS_POR_DEFECTO: RecetaModel[] = [
  new RecetaModel(
    'Tortilla de Patatas',
    ['5 Patatas', '6 Huevos', '1 Cebolla', 'Aceite de Oliva', 'Sal'],
    'https://images.unsplash.com/photo-1599551109232-6affc6d190b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDg4NDh8MHwxfGFsbHwxfHx8fHx8fHwxNjE2MTg0OTI4&ixlib-rb-1.2.1&q=80&w=400'
  ),
  new RecetaModel(
    'Gazpacho Andaluz',
    ['1kg Tomates', '1 Pepino', '1 Pimiento Verde', '1/2 Cebolla', '1 Diente de Ajo', 'Aceite de Oliva', 'Vinagre', 'Sal'],
    'https://images.unsplash.com/photo-1628104886801-4770d36b4412?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDg4NDh8MHwxfGFsbHwxfHx8fHx8fHwxNjE2MTg0OTI4&ixlib.rb-1.2.1&q=80&w=400'
  ),
  new RecetaModel(
    'Paella Valenciana',
    ['400g Arroz', '200g Pollo', '200g Conejo', '100g Judías Verdes', '50g Garrofón', 'Tomate', 'Aceite de Oliva', 'Azafrán', 'Agua', 'Sal'],
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDg4NDh8MHwxfGFsbHwxfHx8fHx8fHwxNjE2MTg0OTI4&ixlib.rb-1.2.1&q=80&w=400'
  )
];

@Component({
  selector: 'app-recetas',
  imports: [RecetaCard, RecetaForm, CommonModule],
  templateUrl: './recetas.html',
  styleUrl: './recetas.scss'
})

export class Recetas {

  recetas: RecetaModel[] = RECETAS_POR_DEFECTO;

  agregarReceta(nuevaReceta: RecetaModel) {
    this.recetas.push(nuevaReceta);
  }

  borrarReceta($event: string) {
    const index = this.recetas.findIndex(r => r.nombre === $event);
    if (index !== -1) {
      this.recetas.splice(index, 1);
    }
  }

}
