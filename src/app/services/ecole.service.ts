import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ecole {
  id?: number;
  Sigle: string;
  Designation: string;
}

@Injectable({
  providedIn: 'root'
})
export class EcoleService {
  private apiUrl = 'http://localhost:8000/api'; // à adapter selon ton backend

  constructor(private http: HttpClient) {}

  getEcoles(): Observable<Ecole[]> {
    return this.http.get<Ecole[]>(`${this.apiUrl}/ecoles`);
  }

  ajouterEcole(data: Ecole): Observable<Ecole> {
    return this.http.post<Ecole>(`${this.apiUrl}/ecoles`, data);
  }

  modifierEcole(id: number, data: Ecole): Observable<Ecole> {
    return this.http.put<Ecole>(`${this.apiUrl}/ecoles/${id}`, data);
  }

  supprimerEcole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/ecoles/${id}`);
  }
}
