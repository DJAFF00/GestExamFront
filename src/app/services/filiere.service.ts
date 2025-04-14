import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Filiere {
  id?: number;
  Codefil: string;
  Libelle: string;
}

@Injectable({
  providedIn: 'root'
})
export class FiliereService {
  private baseUrl = 'http://localhost:8000/api/filieres'; // À adapter selon ton API

  constructor(private http: HttpClient) {}

  // Récupérer toutes les filières
  getFilieres(): Observable<Filiere[]> {
    return this.http.get<Filiere[]>(this.baseUrl);
  }

  // Ajouter une nouvelle filière
  ajouterFiliere(filiere: Filiere): Observable<Filiere> {
    return this.http.post<Filiere>(this.baseUrl, filiere);
  }

  // Modifier une filière existante
  modifierFiliere(id: number, filiere: Filiere): Observable<Filiere> {
    return this.http.put<Filiere>(`${this.baseUrl}/${id}`, filiere);
  }

  // Supprimer une filière
  supprimerFiliere(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
