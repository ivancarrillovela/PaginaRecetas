import { Component, OnInit, OnDestroy, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filtro-recetas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filtro.html',
})
export class Filtro implements OnInit, OnDestroy {
  
  // Evento que emite el texto del filtro
  filtrar = output<string>();

  // FormControl para el campo de búsqueda reactivo
  filtroControl = new FormControl('');

  // Subject para manejar la desuscripción
  private destroyed$ = new Subject<void>();

  ngOnInit() {
    // Escuchamos los cambios en el campo de texto
    this.filtroControl.valueChanges.pipe(
      debounceTime(300), // Espera 300ms después de la última pulsación
      takeUntil(this.destroyed$) // Se desuscribe al destruir el componente
    ).subscribe(valor => {
      this.filtrar.emit(valor || ''); // Emitimos el valor (o un string vacío si es null)
    });
  }

  ngOnDestroy() {
    // Completamos el Subject para desuscribirnos
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  // Método para limpiar el filtro desde la UI
  limpiarFiltro() {
    this.filtroControl.setValue('');
  }
}
