import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { RecetaModel } from '../models/RecetaModel';

@Injectable({ providedIn: 'root' }) // [cite: 762]
export class RecetasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/recetas'; // URL del Mock API (json-server)

  // Patrón Reactive Programming
  private updateSubject = new ReplaySubject<void>(1); // [cite: 949]
  public changesOnRecetas$ = this.updateSubject.asObservable(); // [cite: 949]

  // Método GET devolviendo Observable
  getRecetas(): Observable<RecetaModel[]> {
    return this.http.get<RecetaModel[]>(this.apiUrl);
  }

  getRecetaById(id: string): Observable<RecetaModel> {
    return this.http.get<RecetaModel>(`${this.apiUrl}/${id}`);
  }

  // Método para votar (POST/PATCH) y notificar cambio
  votarReceta(receta: RecetaModel, nuevaPuntuacion: number): Observable<RecetaModel> {
    const nuevosVotos = receta.votos + 1;
    const nuevaMedia = ((receta.puntuacion * receta.votos) + nuevaPuntuacion) / nuevosVotos;

    return this.http.patch<RecetaModel>(`${this.apiUrl}/${receta.id}`, {
      puntuacion: parseFloat(nuevaMedia.toFixed(1)),
      votos: nuevosVotos
    }).pipe(
      // Cuando la petición acabe con éxito notificamos a los suscriptores
      tap(() => this.notifyUpdate()) 
    );
  }

  // Método para notificar cambios manualmente
  notifyUpdate() {
    this.updateSubject.next(); // [cite: 979]
  }
}