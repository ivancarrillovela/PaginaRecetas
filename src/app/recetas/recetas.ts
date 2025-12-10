import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { BehaviorSubject, combineLatest, map, Observable, startWith, switchMap } from 'rxjs';
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

  // Subjects para filtros (Reactive Programming)
  private filtroNombre$ = new BehaviorSubject<string>('');
  private filtroEstrellas$ = new BehaviorSubject<number>(0);

  // Observable combinado para la vista
  vm$!: Observable<{ recetas: RecetaModel[], filtroActual: string }>;

  ngOnInit() {
    // 1. Stream de datos del servidor (se recarga cuando changesOnRecetas$ emite)
    const datosServidor$ = this.recetasService.changesOnRecetas$.pipe(
      startWith(undefined),
      switchMap(() => this.recetasService.getRecetas())
    );

    // 2. Combinamos datos + filtros
    this.vm$ = combineLatest([datosServidor$, this.filtroNombre$, this.filtroEstrellas$]).pipe(
      map(([recetas, nombre, estrellas]) => {
        const filtradas = recetas.filter(r => 
          r.nombre.toLowerCase().includes(nombre) && r.puntuacion >= estrellas
        );
        return { recetas: filtradas, filtroActual: nombre };
      })
    );
  }

  // Eventos UI
  actualizarFiltroNombre(texto: string) {
    this.filtroNombre$.next(texto.toLowerCase());
  }

  actualizarFiltroEstrellas(event: Event) {
    const valor = Number((event.target as HTMLSelectElement).value);
    this.filtroEstrellas$.next(valor);
  }

  // Acciones
  agregarReceta(datosParciales: any) {
    // Completamos el objeto con valores por defecto
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