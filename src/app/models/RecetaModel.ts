export interface RecetaModel {
  id: string;
  nombre: string;
  ingredientes: string[];
  urlImagen: string;
  puntuacion: number; // Puntuaciónd e la receta
  votos: number;      // Cantidad total de votos
}