import { Component, OnInit } from '@angular/core';
import { RecetaForm } from '../receta-form/receta-form';
import { RecetaCard } from "../receta-card/receta-card";
import { RecetaModel } from '../models/RecetaModel';
import { Filtro } from '../filtro/filtro';
import { CommonModule } from '@angular/common';
import { EstadoVacio } from "../estado-vacio/estado-vacio";

// Los datos por defecto, como pediste
const RECETAS_POR_DEFECTO: RecetaModel[] = [
  new RecetaModel(
    'Gazpacho Andaluz',
    ['1kg Tomates', '1 Pepino', '1 Pimiento Verde', '1/2 Cebolla', '1 Diente de Ajo', 'Aceite de Oliva', 'Vinagre'],
    'https://tse4.mm.bing.net/th/id/OIP.tiDj3kVhJ7y4pqaNwdQLNQHaE5?rs=1&pid=ImgDetMain&o=7&rm=3'
  ),
  new RecetaModel(
    'Croquetas de Jamón',
    ['100g Jamón Serrano', '50g Mantequilla', '50g Harina', '500ml Leche', 'Aceite para freír'],
    'https://www.demoslavueltaaldia.com/sites/default/files/croquetas-jamon-serrano.jpg'
  ),
  new RecetaModel(
    'Pulpo a la Gallega',
    ['1 Pulpo', 'Patatas', 'Pimentón', 'Aceite de Oliva'],
    'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDg4NDh8MHwxfGFsbHwxfHx8fHx8fHwxNjE2MTg0OTI4&ixlib.rb-1.2.1&q=80&w=400'
  ),
  new RecetaModel(
    'Fabada Asturiana',
    ['400g Fabes', '200g Chorizo', '200g Morcilla', '100g Tocino', '1 Cebolla', '2 Dientes de Ajo', 'Pimentón'],
    'https://th.bing.com/th/id/OIP.PCuUifmIIEtsEAgxA92t_gHaE6?w=276&h=183&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3'
  ),
];

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [RecetaCard, RecetaForm, CommonModule, Filtro, EstadoVacio],
  templateUrl: './recetas.html',
  styleUrl: './recetas.scss'
})
export class Recetas implements OnInit {

  // Lista que nunca cambia (excepto al añadir/borrar)
  recetasMaestra: RecetaModel[] = RECETAS_POR_DEFECTO;

  // Lista que se mostrará en la plantilla
  recetasFiltradas: RecetaModel[] = [];

  // Guardamos el texto del filtro actual (lo hacemos público para usarlo en el HTML)
  public filtroActual: string = '';

  // Usamos ngOnInit para inicializar la lista filtrada
  ngOnInit() {
    this.recetasFiltradas = [...this.recetasMaestra];
  }

  // Nuevo método que se llama cuando el filtro emite un valor
  onFiltroCambiado(textoFiltro: string) {
    this.filtroActual = textoFiltro.toLowerCase().trim();

    if (!this.filtroActual) {
      // Si no hay filtro, mostramos todas
      this.recetasFiltradas = [...this.recetasMaestra];
    } else {
      // Si hay filtro, filtramos la lista maestra
      this.recetasFiltradas = this.recetasMaestra.filter(receta => 
        receta.nombre.toLowerCase().includes(this.filtroActual)
      );
    }
  }

  // Modificamos agregarReceta
  agregarReceta(nuevaReceta: RecetaModel) {
    // Añadimos a la lista maestra
    this.recetasMaestra.push(nuevaReceta);
    // Re-aplicamos el filtro
    this.onFiltroCambiado(this.filtroActual);
  }

  // Modificamos borrarReceta
  borrarReceta(nombreReceta: string) {
    // Lo borramos de la lista maestra
    const indexMaestra = this.recetasMaestra.findIndex(r => r.nombre === nombreReceta);
    if (indexMaestra !== -1) {
      this.recetasMaestra.splice(indexMaestra, 1);
    }

    // Re-aplicamos el filtro (esto también actualiza la lista filtrada)
    this.onFiltroCambiado(this.filtroActual);
  }

}