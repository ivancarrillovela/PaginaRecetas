import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RecetasService } from '../services/recetas.service'; 
import { RecetaModel } from '../models/RecetaModel';
import { StarRatingComponent } from '../star-rating/star-rating';

@Component({
  selector: 'app-receta-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink, StarRatingComponent],
  templateUrl: './receta-detalle.html',
  styleUrl: './receta-detalle.scss'
})
export class RecetaDetalleComponent implements OnInit {
  // Recibe el ID de la URL automáticamente (gracias a withComponentInputBinding)
  id = input<string>(); 
  
  private recetasService = inject(RecetasService);
  receta = signal<RecetaModel | null>(null);

  ngOnInit() {
    if (this.id()) {
      this.recetasService.getRecetaById(this.id()!).subscribe(data => {
        this.receta.set(data);
      });
    }
  }
}