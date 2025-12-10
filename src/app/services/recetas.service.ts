import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, BehaviorSubject, tap } from 'rxjs';
import { RecetaModel } from '../models/RecetaModel';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/recetas';

  // --- Estado Reactivo ---
  // Refrescar lista de recetas
  private updateSubject = new ReplaySubject<void>(1);
  public changesOnRecetas$ = this.updateSubject.asObservable();

  // Control Global del Modal de Formulario
  private formOpenSubject = new BehaviorSubject<boolean>(false);
  public formOpen$ = this.formOpenSubject.asObservable();

  // --- Métodos de Control del Modal ---
  abrirFormularioGlobal() {
    this.formOpenSubject.next(true);
  }

  cerrarFormularioGlobal() {
    this.formOpenSubject.next(false);
  }

  // --- Métodos HTTP ---
  getRecetas(): Observable<RecetaModel[]> {
    return this.http.get<RecetaModel[]>(this.apiUrl);
  }

  getRecetaById(id: string): Observable<RecetaModel> {
    return this.http.get<RecetaModel>(`${this.apiUrl}/${id}`);
  }

  agregarReceta(receta: Omit<RecetaModel, 'id'>): Observable<RecetaModel> {
    return this.http.post<RecetaModel>(this.apiUrl, receta).pipe(
      tap(() => this.updateSubject.next()) // Notificar cambio
    );
  }

  borrarReceta(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.updateSubject.next())
    );
  }

  votarReceta(receta: RecetaModel, puntuacionUsuario: number): Observable<RecetaModel> {
    const nuevosVotos = receta.votos + 1;
    const nuevaMedia = ((receta.puntuacion * receta.votos) + puntuacionUsuario) / nuevosVotos;

    return this.http.patch<RecetaModel>(`${this.apiUrl}/${receta.id}`, {
      puntuacion: parseFloat(nuevaMedia.toFixed(1)),
      votos: nuevosVotos
    }).pipe(
      tap(() => this.updateSubject.next())
    );
  }
}