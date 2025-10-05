import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz del Programa Educativo (según tu entidad y DTO)
export interface ProgramaEducativo {
  id: number;
  nombre: string;
  divisionId?: number; // opcional, se usa para crear dentro de una división
}

@Injectable({
  providedIn: 'root'
})
export class ProgramaEducativoService {

  private baseUrl = 'http://localhost:8080/api/programas';

  constructor(private http: HttpClient) {}

  // --- GET todos los programas ---
  getProgramas(): Observable<ProgramaEducativo[]> {
    return this.http.get<ProgramaEducativo[]>(this.baseUrl);
  }

  // --- GET por ID ---
  getProgramaById(id: number): Observable<ProgramaEducativo> {
    return this.http.get<ProgramaEducativo>(`${this.baseUrl}/${id}`);
  }

  // --- POST: Crear programa dentro de una división ---
  createPrograma(divisionId: number, programa: Partial<ProgramaEducativo>): Observable<ProgramaEducativo> {
    return this.http.post<ProgramaEducativo>(`${this.baseUrl}/division/${divisionId}`, programa);
  }

  // --- PUT: Actualizar programa ---
  updatePrograma(id: number, programa: Partial<ProgramaEducativo>): Observable<ProgramaEducativo> {
    return this.http.put<ProgramaEducativo>(`${this.baseUrl}/${id}`, programa);
  }

  // --- PATCH: Baja lógica ---
  bajaLogicaPrograma(id: number): Observable<ProgramaEducativo> {
    return this.http.patch<ProgramaEducativo>(`${this.baseUrl}/${id}/baja-logica`, {});
  }

  // --- DELETE: Baja física ---
  deletePrograma(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
