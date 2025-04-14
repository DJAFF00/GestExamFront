import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExamenService } from '../../services/examen.service';

interface Examen {
  id?: number;
  Codexam: string;
  Libellexam: string;
}

@Component({
  selector: 'app-examens',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './examens.component.html',
  styleUrls: ['./examens.component.css']
})
export class ExamensComponent implements OnInit {
  examens: Examen[] = [];
  nouvelExamen: Examen = {
    Codexam: '',
    Libellexam: ''
  };
  examenSelectionne: Examen | null = null;

  constructor(private examenService: ExamenService) {}

  ngOnInit(): void {
    this.chargerExamens();
  }

  chargerExamens(): void {
    this.examenService.getExamens().subscribe((data: Examen[]) => {
      this.examens = data;
    });
  }

  ajouterExamen(): void {
    this.examenService.ajouterExamen(this.nouvelExamen).subscribe((response: any) => {
      console.log('Examen ajouté avec succès:', response);
      this.nouvelExamen = { Codexam: '', Libellexam: '' };
      this.chargerExamens();
    });
  }

  modifierExamen(examen: Examen): void {
    this.examenSelectionne = { ...examen };
  }

  enregistrerModification(): void {
    if (this.examenSelectionne && this.examenSelectionne.id) {
      this.examenService.modifierExamen(this.examenSelectionne.id, this.examenSelectionne).subscribe((response: any) => {
        console.log('Examen modifié avec succès:', response);
        this.examenSelectionne = null;
        this.chargerExamens();
        this.reinitialiserFormulaire();
      });
    }
  }

  supprimerExamen(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet examen ?')) {
      this.examenService.supprimerExamen(id).subscribe(() => {
        console.log('Examen supprimé avec succès:', id);
        this.chargerExamens();
      });
    }
  }

  reinitialiserFormulaire(): void {
    this.nouvelExamen = { Codexam: '', Libellexam: '' };
  }
}
