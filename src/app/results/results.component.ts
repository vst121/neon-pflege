import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WizardService, CareRecommendation } from '../wizard.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  private wizardService = inject(WizardService);
  private router = inject(Router);

  recommendations: CareRecommendation[] = [];
  groupedRecommendations: { [key: string]: CareRecommendation[] } = {};

  ngOnInit(): void {
    this.recommendations = this.wizardService.generateRecommendations();
    this.groupRecommendations();
  }

  groupRecommendations(): void {
    this.groupedRecommendations = this.recommendations.reduce((acc, rec) => {
      if (!acc[rec.category]) {
        acc[rec.category] = [];
      }
      acc[rec.category].push(rec);
      return acc;
    }, {} as { [key: string]: CareRecommendation[] });
  }

  getPriorityClass(priority: string): string {
    return `priority-${priority}`;
  }

  getPriorityLabel(priority: string): string {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  }

  startOver(): void {
    this.wizardService.reset();
    this.router.navigate(['/']);
  }

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'Home Modification': '🏠',
      'Mobility Support': '🦽',
      'Care Services': '👩‍⚕️'
    };
    return icons[category] || '💡';
  }

  getCategoryKeys(): string[] {
    return Object.keys(this.groupedRecommendations);
  }
}


