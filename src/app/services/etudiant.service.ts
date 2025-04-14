import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


interface Ecole {
  id: number;
  Sigle: String;
  Designation: string;
}

interface Filiere {
  id: number;
  Codefil: string;
  Libelle: string;
}

interface Etudiant {
  id?: number;
  nom: string;
  prenom: string;
  sexe: string;
  adresse: string;
  tel: string;
  ecole_id: number | null;
  filiere_id: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${this.apiUrl}/etudiants`);
  }

  ajouterEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.post<Etudiant>(`${this.apiUrl}/etudiants`, etudiant);
  }

  supprimerEtudiant(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/etudiants/${id}`);
  }

  modifierEtudiant(id: number, data: Etudiant): Observable<Etudiant> {
    return this.http.put<Etudiant>(`${this.apiUrl}/etudiants/${id}`, data);
  }

  getEcoles(): Observable<Ecole[]> {
    return this.http.get<Ecole[]>(`${this.apiUrl}/ecoles`);
  }

  getFilieres(): Observable<Filiere[]> {
    return this.http.get<Filiere[]>(`${this.apiUrl}/filieres`);
  }
}
