import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecetaModel } from '../models/RecetaModel';

@Component({
  selector: 'app-receta-form',
  imports: [ReactiveFormsModule],
  templateUrl: './receta-form.html',
  styleUrl: './receta-form.scss'
})
export class RecetaForm {

  agregarReceta = output<RecetaModel>();
  
  formularioReceta = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    urlImagen: new FormControl('', [Validators.required]),
    ingredientes: new FormControl('', [Validators.required])
  });

  get nombre() {
    return this.formularioReceta.get('nombre');
  }

  get urlImagen() {
    return this.formularioReceta.get('urlImagen');
  }

  get ingredientes() {
    return this.formularioReceta.get('ingredientes');
  }

  enviarFormulario() {
    if (this.formularioReceta.invalid) {
      alert('Formulario invalido');
      return;
    }

    const arrayIngredientes = this.formularioReceta.value.ingredientes!
      .split('\n')
      .filter((line: string) => line.trim().length > 0);

    const valorFormulario = this.formularioReceta.value;

    const nuevaReceta: RecetaModel = {
      nombre: valorFormulario.nombre!,
      urlImagen: valorFormulario.urlImagen!,
      ingredientes: arrayIngredientes,
    };
    
    this.agregarReceta.emit(nuevaReceta);

    this.formularioReceta.reset();
  }
}