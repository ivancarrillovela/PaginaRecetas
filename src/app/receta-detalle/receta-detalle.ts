import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecetasService } from '../services/recetas.service';
import { RecetaModel } from '../models/RecetaModel';
import { StarRatingComponent } from '../star-rating/star-rating';

@Component({
  selector: 'app-receta-detalle',
  standalone: true,
  imports: [CommonModule, StarRatingComponent],
  templateUrl: './receta-detalle.html',
  styleUrl: './receta-detalle.scss'
})
export class RecetaDetalle implements OnInit {
  id = input.required<string>();
  
  // Evento para pedirle al padre que cierre el modal
  cerrar = output<void>();

  private recetasService = inject(RecetasService);
  receta = signal<RecetaModel | null>(null);

  ngOnInit() {
    // Como el componente se crea/destruye con el if del modal el ngOnInit se ejecutará cada vez que abramos una receta
    if (this.id()) {
      this.recetasService.getRecetaById(this.id()).subscribe(data => {
        this.receta.set(data);
      });
    }
  }
}