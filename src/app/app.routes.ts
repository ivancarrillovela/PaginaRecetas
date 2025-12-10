import { Routes } from '@angular/router';
import { Recetas } from './recetas/recetas';

export const routes: Routes = [
  { path: '', component: Recetas },
  { path: '**', redirectTo: '' }
];