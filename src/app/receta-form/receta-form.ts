import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecetaModel } from '../models/RecetaModel';

@Component({
  selector: 'app-receta-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './receta-form.html',
  styleUrl: './receta-form.scss'
})
export class RecetaForm {
  // Emitimos un objeto sin ID ni votos porque eso lo gestiona el servicio
  agregarReceta = output<Omit<RecetaModel, 'id' | 'puntuacion' | 'votos'>>();
  
  formularioReceta = new FormGroup({
    // Aplicación de Múltiples Validadores en array
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]), 
    urlImagen: new FormControl('', [Validators.required]),
    // Validación extra para asegurar contenido mínimo
    ingredientes: new FormControl('', [Validators.required, Validators.minLength(10)]) 
  });

  // Getters para acceder a los controles en la vista
  get nombre() { return this.formularioReceta.get('nombre'); }
  get urlImagen() { return this.formularioReceta.get('urlImagen'); }
  get ingredientes() { return this.formularioReceta.get('ingredientes'); }

  enviarFormulario() {
    if (this.formularioReceta.invalid) return;

    const arrayIngredientes = this.formularioReceta.value.ingredientes!
      .split('\n')
      .filter((line: string) => line.trim().length > 0);

    const nuevaReceta = {
      nombre: this.formularioReceta.value.nombre!,
      urlImagen: this.formularioReceta.value.urlImagen!,
      ingredientes: arrayIngredientes,
    };
    
    this.agregarReceta.emit(nuevaReceta);
    this.formularioReceta.reset();
  }
}