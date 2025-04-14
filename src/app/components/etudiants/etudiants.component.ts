import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EtudiantService } from '../../services/etudiant.service';
import { FiliereService } from '../../services/filiere.service';
import { EcoleService } from '../../services/ecole.service';

interface Ecole {
  id?: number;
  Sigle: String;
  Designation: string;
}

interface Filiere {
  id?: number;
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


@Component({
  selector: 'app-etudiants',
  standalone: true,
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css'],
  imports: [CommonModule, FormsModule],
})
export class EtudiantsComponent implements OnInit {
  etudiants: any[] = [];
  filieres: Filiere[] = [];
  ecoles: Ecole[] = [];

  nouvelEtudiant: Etudiant = {
    nom: '',
    prenom: '',
    sexe: '',
    adresse: '',
    tel: '',
    ecole_id: 0,
    filiere_id: 0,
    // designation:'',
  };

  etudiantSelectionne: any | null = null;

  constructor(
    private etudiantService: EtudiantService,
    private filiereService: FiliereService,
    private ecoleService: EcoleService
  ) {}

  ngOnInit(): void {
    this.chargerEtudiants();
    this.chargerEcoles();
    this.chargerFilieres();
    
  }

  chargerEtudiants(): void {
    this.etudiantService.getEtudiants().subscribe((data: Etudiant[]) => {
      this.etudiants = data;
    });
  }

  chargerEcoles(): void {
    this.ecoleService.getEcoles().subscribe(data => {
      this.ecoles = data;
    });
    console.log(this.ecoles)
  }

  chargerFilieres(): void {
    this.filiereService.getFilieres().subscribe(data=> {
      this.filieres = data;
    });
  }



  ajouterEtudiant(): void {
    console.log('Nouvel étudiant à ajouter :', this.nouvelEtudiant);
    this.etudiantService.ajouterEtudiant(this.nouvelEtudiant).subscribe(response => {
      console.log('Étudiant ajouté avec succès:', response);
      this.reinitialiserFormulaire();
      this.chargerEtudiants();
    });
  }

  modifierEtudiant(etudiant: Etudiant): void {
    this.etudiantSelectionne = { ...etudiant };
    console.log('Modifier étudiant :', etudiant);
  }

  enregistrerModification(): void {
    if (this.etudiantSelectionne && this.etudiantSelectionne.id) {
      this.etudiantService.modifierEtudiant(this.etudiantSelectionne.id,this.etudiantSelectionne).subscribe(response => {
        console.log('Étudiant modifié avec succès:', response);
        this.etudiantSelectionne = null;
        this.chargerEtudiants();
        this.reinitialiserFormulaire();
      });
    }
  }

  supprimerEtudiant(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      this.etudiantService.supprimerEtudiant(id).subscribe(() => {
        console.log('Étudiant supprimé avec succès:', id);
        this.chargerEtudiants();
      });
    }
  }

  reinitialiserFormulaire(): void {
    this.nouvelEtudiant = {
      nom: '',
      prenom: '',
      sexe: '',
      adresse: '',
      tel: '',
      ecole_id: 0,
      filiere_id: 0
    };
  }
}
