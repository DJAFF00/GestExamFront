import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EcoleService, Ecole } from '../../services/ecole.service';

@Component({
  selector: 'app-ecoles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ecoles.component.html',
  styleUrls: ['./ecoles.component.css']
})
export class EcolesComponent implements OnInit {
  ecoles: Ecole[] = [];
  nouvelleEcole: Ecole = {
    Sigle: '',
    Designation: ''
  };
  ecoleSelectionnee: Ecole | null = null;

  constructor(private ecoleService: EcoleService) {}

  ngOnInit(): void {
    this.chargerEcoles();
  }

  chargerEcoles(): void {
    this.ecoleService.getEcoles().subscribe(data => {
      this.ecoles = data;
    });
  }

  ajouterEcole(): void {
    this.ecoleService.ajouterEcole(this.nouvelleEcole).subscribe(response => {
      this.nouvelleEcole = { Sigle: '', Designation: '' };
      this.chargerEcoles();
    });
  }

  modifierEcole(ecole: Ecole): void {
    this.ecoleSelectionnee = { ...ecole };
  }

  enregistrerModification(): void {
    if (this.ecoleSelectionnee && this.ecoleSelectionnee.id) {
      this.ecoleService.modifierEcole(this.ecoleSelectionnee.id, this.ecoleSelectionnee).subscribe(response => {
        this.ecoleSelectionnee = null;
        this.chargerEcoles();
      });
    }
  }

  supprimerEcole(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette école ?')) {
      this.ecoleService.supprimerEcole(id).subscribe(() => {
        this.chargerEcoles();
      });
    }
  }

  reinitialiserFormulaire(): void {
    this.nouvelleEcole = { Sigle: '', Designation: '' };
  }
}
