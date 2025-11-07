import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estado-vacio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estado-vacio.html'
})

export class EstadoVacio {

  // Recibimos el texto del filtro actual
  filtroActual = input<string | null>(null);

}
