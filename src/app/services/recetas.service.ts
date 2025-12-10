import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { RecetaModel } from '../models/RecetaModel';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/recetas'; // URL de json-server

  // Patrón Reactivo: Notificador de cambios
  private updateSubject = new ReplaySubject<void>(1);
  public changesOnRecetas$ = this.updateSubject.asObservable();

  // Obtener todas las recetas
  getRecetas(): Observable<RecetaModel[]> {
    return this.http.get<RecetaModel[]>(this.apiUrl);
  }

  // Obtener una receta por ID
  getRecetaById(id: string): Observable<RecetaModel> {
    return this.http.get<RecetaModel>(`${this.apiUrl}/${id}`);
  }

  // Agregar receta
  agregarReceta(receta: Omit<RecetaModel, 'id'>): Observable<RecetaModel> {
    return this.http.post<RecetaModel>(this.apiUrl, receta).pipe(
      tap(() => this.notifyUpdate()) // Notificar cambio al terminar
    );
  }

  // Borrar receta
  borrarReceta(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.notifyUpdate())
    );
  }

  // Votar receta (Cálculo de media ponderada)
  votarReceta(receta: RecetaModel, puntuacionUsuario: number): Observable<RecetaModel> {
    const nuevosVotos = receta.votos + 1;
    // Fórmula: ((MediaActual * VotosActuales) + NuevoVoto) / NuevosVotos
    const nuevaMedia = ((receta.puntuacion * receta.votos) + puntuacionUsuario) / nuevosVotos;

    return this.http.patch<RecetaModel>(`${this.apiUrl}/${receta.id}`, {
      puntuacion: parseFloat(nuevaMedia.toFixed(1)),
      votos: nuevosVotos
    }).pipe(
      tap(() => this.notifyUpdate()) // Notificar cambio para refrescar vistas
    );
  }

  private notifyUpdate() {
    this.updateSubject.next();
  }
}