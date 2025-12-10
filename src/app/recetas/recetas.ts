import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { BehaviorSubject, combineLatest, map, Observable, startWith, switchMap, Subscription } from 'rxjs';
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
  imports: [
    CommonModule, 
    AsyncPipe, 
    RecetaCard, 
    RecetaForm, 
    Filtro, 
    EstadoVacio, 
    RecetaDetalle
  ],
  templateUrl: './recetas.html',
  styleUrl: './recetas.scss'
})
export class Recetas implements OnInit, OnDestroy {
  private recetasService = inject(RecetasService);

  // Filtros Reactivos
  private filtroNombre$ = new BehaviorSubject<string>('');
  private filtroEstrellas$ = new BehaviorSubject<number>(0);

  // ViewModel (Datos combinados)
  vm$!: Observable<{ recetas: RecetaModel[], filtroActual: string }>;

  // Estado de la Vista
  recetaSeleccionadaId: string | null = null;
  mostrarFormulario = false; 

  // Variable para gestionar la suscripción (Teoría pág. 65)
  private formSubscription?: Subscription;

  ngOnInit() {
    // Carga de datos
    const datosServidor$ = this.recetasService.changesOnRecetas$.pipe(
      startWith(undefined),
      switchMap(() => this.recetasService.getRecetas())
    );

    // Combinación con filtros
    this.vm$ = combineLatest([datosServidor$, this.filtroNombre$, this.filtroEstrellas$]).pipe(
      map(([recetas, nombre, estrellas]) => {
        const filtradas = recetas.filter(r => 
          r.nombre.toLowerCase().includes(nombre) && r.puntuacion >= estrellas
        );
        return { recetas: filtradas, filtroActual: nombre };
      })
    );

    // Suscripción al estado global del formulario
    // Guardamos la suscripción en la variable
    this.formSubscription = this.recetasService.formOpen$.subscribe(isOpen => {
      this.mostrarFormulario = isOpen;
    });
  }

  // Limpiamos la suscripción al destruir el componente
  ngOnDestroy() {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

  // --- Lógica Modales ---
  abrirModalDetalle(id: string) { this.recetaSeleccionadaId = id; }
  cerrarModalDetalle() { this.recetaSeleccionadaId = null; }

  abrirFormulario() { this.recetasService.abrirFormularioGlobal(); }
  cerrarFormulario() { this.recetasService.cerrarFormularioGlobal(); }

  // --- Filtros ---
  actualizarFiltroNombre(texto: string) { this.filtroNombre$.next(texto.toLowerCase()); }
  actualizarFiltroEstrellas(event: Event) {
    const valor = Number((event.target as HTMLSelectElement).value);
    this.filtroEstrellas$.next(valor);
  }

  // --- Acciones ---
  agregarReceta(datosParciales: any) {
    const nuevaReceta = { ...datosParciales, puntuacion: 0, votos: 0 };
    this.recetasService.agregarReceta(nuevaReceta).subscribe(() => {
      this.cerrarFormulario();
    });
  }

  borrarReceta(id: string) { this.recetasService.borrarReceta(id).subscribe(); }

  procesarVoto(id: string, puntuacion: number) {
    this.recetasService.getRecetaById(id).subscribe(receta => {
      this.recetasService.votarReceta(receta, puntuacion).subscribe();
    });
  }
}