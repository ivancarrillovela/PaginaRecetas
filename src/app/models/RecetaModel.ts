export class RecetaModel {
  public nombre: string;
  public ingredientes: string[];
  public urlImagen: string;

  constructor(nombre: string, ingredientes: string[], urlImagen: string) {
    this.nombre = nombre;
    this.ingredientes = ingredientes;
    this.urlImagen = urlImagen;
  }
}