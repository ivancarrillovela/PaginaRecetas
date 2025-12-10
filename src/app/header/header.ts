import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RecetasService } from '../services/recetas.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  private recetasService = inject(RecetasService);
  private router = inject(Router);

  crearNuevaReceta() {
    this.recetasService.abrirFormularioGlobal();
    this.router.navigate(['/']);
  }
}