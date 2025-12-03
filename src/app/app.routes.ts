import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./wizard/wizard.component').then(m => m.WizardComponent)
  },
  {
    path: 'results',
    loadComponent: () => import('./results/results.component').then(m => m.ResultsComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];


