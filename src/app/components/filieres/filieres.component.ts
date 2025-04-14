import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FiliereService } from '../../services/filiere.service';


interface Filiere {
  id?: number;
  Codefil: string;
  Libelle: string;
}

@Component({
  selector: 'app-filieres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filieres.component.html',
  styleUrls: ['./filieres.component.css']
})
export class FilieresComponent implements OnInit {
  filieres: Filiere[] = [];
  nouvelleFiliere: Filiere = {
    Codefil: '',
    Libelle: ''
  };
  filiereSelectionnee: Filiere | null = null;

  constructor(private filiereService: FiliereService) {}


  ngOnInit(): void {
    this.chargerFilieres();
  }

  chargerFilieres(): void {
    this.filiereService.getFilieres().subscribe((data: Filiere[]) => {
      this.filieres = data;
    });
  }

  ajouterFiliere(): void {
    console.log('Nouvelle filière à ajouter:', this.nouvelleFiliere);
    this.filiereService.ajouterFiliere(this.nouvelleFiliere).subscribe(response => {
      console.log('Filière ajoutée avec succès:', response);
      this.nouvelleFiliere = { Codefil: '', Libelle: '' };
      this.chargerFilieres();
    });
  }

  modifierFiliere(filiere: Filiere): void {
    this.filiereSelectionnee = { ...filiere };
    console.log('Modifier filière:', filiere);
  }

  enregistrerModification(): void {
    if (this.filiereSelectionnee && this.filiereSelectionnee.id) {
      this.filiereService.modifierFiliere(this.filiereSelectionnee.id, this.filiereSelectionnee).subscribe(response => {
        console.log('Filière modifiée avec succès:', response);
        this.filiereSelectionnee = null;
        this.chargerFilieres();
        this.reinitialiserFormulaire();
      });
    }
  }

  supprimerFiliere(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette filière ?')) {
      this.filiereService.supprimerFiliere(id).subscribe(() => {
        console.log('Filière supprimée avec succès:', id);
        this.chargerFilieres();
      });
    }
  }

  reinitialiserFormulaire(): void {
    this.nouvelleFiliere = { Codefil: '', Libelle: '' };
  }
}
