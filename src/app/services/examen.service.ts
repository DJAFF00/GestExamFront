import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  private apiUrl = 'http://localhost:8000/api/examens'; // change selon ton backend

  constructor(private http: HttpClient) {}

  getExamens(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  ajouterExamen(examen: any): Observable<any> {
    return this.http.post(this.apiUrl, examen);
  }

  modifierExamen(id: number, examen: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, examen);
  }

  supprimerExamen(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
