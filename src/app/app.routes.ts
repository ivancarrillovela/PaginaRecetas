import { Routes } from '@angular/router';
import { Recetas } from './recetas/recetas';
import { RecetaDetalle } from './receta-detalle/receta-detalle';

export const routes: Routes = [
  { path: '', component: Recetas },
  { path: 'receta/:id', component: RecetaDetalle }, // Ruta con parámetro
  { path: '**', redirectTo: '' }
];