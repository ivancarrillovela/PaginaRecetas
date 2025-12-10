import { Routes } from '@angular/router';
import { Recetas } from './recetas/recetas';
import { RecetaDetalleComponent } from './receta-detalle/receta-detalle';

export const routes: Routes = [
  { path: '', component: Recetas },
  { path: 'receta/:id', component: RecetaDetalleComponent }, // Ruta con parámetro
  { path: '**', redirectTo: '' }
];