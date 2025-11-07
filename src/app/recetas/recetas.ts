import { Component } from '@angular/core';
import { RecetaForm } from '../receta-form/receta-form';
import { RecetaCard } from "../receta-card/receta-card";
import { RecetaModel } from '../models/RecetaModel';
import { CommonModule } from '@angular/common';

// Los datos por defecto, como pediste
const RECETAS_POR_DEFECTO: RecetaModel[] = [
  new RecetaModel(
    'Gazpacho Andaluz',
    ['1kg Tomates', '1 Pepino', '1 Pimiento Verde', '1/2 Cebolla', '1 Diente de Ajo', 'Aceite de Oliva', 'Vinagre', 'Sal'],
    'https://tse4.mm.bing.net/th/id/OIP.tiDj3kVhJ7y4pqaNwdQLNQHaE5?rs=1&pid=ImgDetMain&o=7&rm=3'
  ),
  new RecetaModel(
    'Paella Valenciana',
    ['400g Arroz', '200g Pollo', '200g Conejo', '100g Judías Verdes', '50g Garrofón', 'Tomate', 'Aceite de Oliva', 'Azafrán', 'Agua', 'Sal'],
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDg4NDh8MHwxfGFsbHwxfHx8fHx8fHwxNjE2MTg0OTI4&ixlib.rb-1.2.1&q=80&w=400'
  ),
  new RecetaModel(
    'Croquetas de Jamón',
    ['100g Jamón Serrano', '50g Mantequilla', '50g Harina', '500ml Leche', 'Nuez Moscada', 'Aceite para freír', 'Sal'],
    'https://www.demoslavueltaaldia.com/sites/default/files/croquetas-jamon-serrano.jpg'
  ),
  new RecetaModel(
    'Pulpo a la Gallega',
    ['1 Pulpo', 'Patatas', 'Pimentón', 'Aceite de Oliva', 'Sal'],
    'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDg4NDh8MHwxfGFsbHwxfHx8fHx8fHwxNjE2MTg0OTI4&ixlib.rb-1.2.1&q=80&w=400'
  ),
  new RecetaModel(
    'Fabada Asturiana',
    ['400g Fabes', '200g Chorizo', '200g Morcilla', '100g Tocino', '1 Cebolla', '2 Dientes de Ajo', 'Pimentón', 'Aceite de Oliva', 'Agua', 'Sal'],
    'https://th.bing.com/th/id/OIP.PCuUifmIIEtsEAgxA92t_gHaE6?w=276&h=183&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3'
  ),
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
