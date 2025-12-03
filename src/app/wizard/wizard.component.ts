import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WizardService } from '../wizard.service';
import { LivingConditionsStepComponent } from './steps/living-conditions-step.component';
import { MobilityStepComponent } from './steps/mobility-step.component';
import { HealthNeedsStepComponent } from './steps/health-needs-step.component';

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [
    CommonModule,
    LivingConditionsStepComponent,
    MobilityStepComponent,
    HealthNeedsStepComponent
  ],
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {
  private wizardService = inject(WizardService);
  private router = inject(Router);

  currentStep = 1;
  totalSteps = 3;
  stepTitles = [
    'Living Conditions',
    'Mobility',
    'Health Needs'
  ];

  ngOnInit(): void {
    this.wizardService.currentStep$.subscribe(step => {
      this.currentStep = step;
    });
  }

  onStepComplete(stepData: any): void {
    this.wizardService.updateData(stepData);
    
    if (this.currentStep < this.totalSteps) {
      this.wizardService.nextStep();
    } else {
      this.navigateToResults();
    }
  }

  onPrevious(): void {
    this.wizardService.previousStep();
  }

  navigateToResults(): void {
    this.router.navigate(['/results']);
  }

  getStepProgress(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }
}


