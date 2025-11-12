import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importamos CommonModule para @if

@Component({
  selector: 'app-filtro-recetas',
  standalone: true,
  imports: [CommonModule], // Ya no necesitamos ReactiveFormsModule
  templateUrl: './filtro.html',
})
export class Filtro {
  
  // Evento que emite el texto del filtro
  filtrar = output<string>();

  // Propiedad para guardar el valor actual del input
  public valorInput: string = '';

  /**
   * Se llama cada vez que el usuario teclea en el input.
   * Emite el valor del input directamente.
   */
  onFiltroCambiado(event: Event) {
    // Obtenemos el elemento <input> que disparó el evento
    const input = event.target as HTMLInputElement;
    
    // Actualizamos nuestra propiedad interna
    this.valorInput = input.value;
    
    // Emitimos el valor al componente padre
    this.filtrar.emit(this.valorInput);
  }

  /**
   * Limpia el input y emite un valor vacío.
   */
  limpiarFiltro() {
    this.valorInput = '';
    this.filtrar.emit('');
  }
}
