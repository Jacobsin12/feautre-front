import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProgramaEducativo {
  id: number;
  nombre: string;
}

export interface Division {
  id: number;
  nombre: string;
  estado: boolean;
  programasEducativos: ProgramaEducativo[];
}

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  private baseUrl = 'http://localhost:8080/api/divisiones';

  constructor(private http: HttpClient) { }

  getDivisiones(): Observable<Division[]> {
    return this.http.get<Division[]>(this.baseUrl);
  }

  createDivision(division: Partial<Division>): Observable<Division> {
    return this.http.post<Division>(this.baseUrl, division);
  }

  updateDivision(id: number, division: Partial<Division>): Observable<Division> {
    return this.http.put<Division>(`${this.baseUrl}/${id}`, division);
  }

  deleteDivision(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
