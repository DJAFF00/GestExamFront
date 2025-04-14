import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtudiantsComponent } from './components/etudiants/etudiants.component';
import { EcolesComponent } from './components/ecoles/ecoles.component';
import { FilieresComponent } from './components/filieres/filieres.component';
import { ExamensComponent } from './components/examens/examens.component';

export const routes: Routes = [ // Ajout de 'export' ici
  { path: '', component: EtudiantsComponent },
  { path: 'ecoles', component: EcolesComponent },
  { path: 'filieres', component: FilieresComponent },
  { path: 'examens', component: ExamensComponent },
  // { path: '', redirectTo: 'etudiants', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}