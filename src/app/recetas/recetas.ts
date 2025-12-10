import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common'; // Importar AsyncPipe
import { Observable, startWith, switchMap, map } from 'rxjs';
import { RecetaModel } from '../models/RecetaModel';
import { RecetaCard } from '../receta-card/receta-card';
import { RecetaForm } from '../receta-form/receta-form';
import { Filtro } from '../filtro/filtro';
import { EstadoVacio } from '../estado-vacio/estado-vacio';
import { RecetasService } from '../services/recetas.service';

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RecetaCard, RecetaForm, Filtro, EstadoVacio],
  templateUrl: './recetas.html',
  styleUrl: './recetas.scss'
})
export class Recetas implements OnInit {
  private recetasService = inject(RecetasService);

  filtroNombre = signal('');
  filtroMinEstrellas = signal(0); // Nuevo filtro

  // Observable que se usará en el HTML
  recetasAsync$!: Observable<RecetaModel[]>;

  ngOnInit() {
    // Pipeline Reactivo: Se actualiza cada vez que el servicio notifica cambios
    this.recetasAsync$ = this.recetasService.changesOnRecetas$.pipe(
      startWith(undefined), // Carga inicial
      switchMap(() => this.recetasService.getRecetas()),
      map(recetas => this.aplicarFiltros(recetas)) // Filtrado local
    );
  }

  private aplicarFiltros(recetas: RecetaModel[]): RecetaModel[] {
    return recetas.filter(r => 
      r.nombre.toLowerCase().includes(this.filtroNombre()) &&
      r.puntuacion >= this.filtroMinEstrellas()
    );
  }

  actualizarFiltroNombre(texto: string) {
    this.filtroNombre.set(texto.toLowerCase());
    this.recetasService['notifyUpdate'](); // Forzar refresco
  }

  actualizarFiltroEstrellas(event: Event) {
    const valor = Number((event.target as HTMLSelectElement).value);
    this.filtroMinEstrellas.set(valor);
    this.recetasService['notifyUpdate'](); // Forzar refresco
  }

  agregarReceta(datos: RecetaModel) {
    const { id, ...resto } = datos; // Eliminamos ID ficticio si viene del form
    const nueva = { ...resto, puntuacion: 0, votos: 0 };
    this.recetasService.agregarReceta(nueva).subscribe();
  }

  borrarReceta(id: string) {
    this.recetasService.borrarReceta(id).subscribe();
  }

  procesarVoto(id: string, puntuacion: number) {
    this.recetasService.getRecetaById(id).subscribe(receta => {
      this.recetasService.votarReceta(receta, puntuacion).subscribe();
    });
  }
}