import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { BehaviorSubject, combineLatest, map, Observable, startWith, switchMap } from 'rxjs';
import { RecetaModel } from '../models/RecetaModel';
import { RecetasService } from '../services/recetas.service';
import { RecetaCard } from '../receta-card/receta-card';
import { RecetaForm } from '../receta-form/receta-form';
import { Filtro } from '../filtro/filtro';
import { EstadoVacio } from '../estado-vacio/estado-vacio';
import { RecetaDetalle } from '../receta-detalle/receta-detalle';

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RecetaCard, RecetaForm, Filtro, EstadoVacio, RecetaDetalle],
  templateUrl: './recetas.html',
  styleUrl: './recetas.scss'
})
export class Recetas implements OnInit {
  private recetasService = inject(RecetasService);

  // Subjects para filtros (Reactive Programming)
  private filtroNombre$ = new BehaviorSubject<string>('');
  private filtroEstrellas$ = new BehaviorSubject<number>(0);

  // Observable combinado para la vista (Datos + Estado de filtros)
  vm$!: Observable<{ recetas: RecetaModel[], filtroActual: string }>;

  // Estado para el Modal (Pop-up)
  recetaSeleccionadaId: string | null = null;

  ngOnInit() {
    // Flujo de datos del servidor (se recarga automáticamente si changesOnRecetas$ emite)
    const datosServidor$ = this.recetasService.changesOnRecetas$.pipe(
      startWith(undefined),
      switchMap(() => this.recetasService.getRecetas())
    );

    // Combinamos los datos con los filtros locales
    this.vm$ = combineLatest([datosServidor$, this.filtroNombre$, this.filtroEstrellas$]).pipe(
      map(([recetas, nombre, estrellas]) => {
        const filtradas = recetas.filter(r =>
          r.nombre.toLowerCase().includes(nombre) && r.puntuacion >= estrellas
        );
        return { recetas: filtradas, filtroActual: nombre };
      })
    );
  }

  // Lógica del Modal
  abrirModalDetalle(id: string) {
    this.recetaSeleccionadaId = id;
  }

  cerrarModalDetalle() {
    this.recetaSeleccionadaId = null;
  }

  // Eventos de la UI (Filtros)
  actualizarFiltroNombre(texto: string) {
    this.filtroNombre$.next(texto.toLowerCase());
  }

  actualizarFiltroEstrellas(event: Event) {
    const valor = Number((event.target as HTMLSelectElement).value);
    this.filtroEstrellas$.next(valor);
  }

  // Acciones de Datos (CRUD)
  agregarReceta(datosParciales: any) {
    const nuevaReceta = { ...datosParciales, puntuacion: 0, votos: 0 };
    this.recetasService.agregarReceta(nuevaReceta).subscribe();
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