import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-health-needs-step',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './health-needs-step.component.html',
  styleUrls: ['./health-needs-step.component.scss']
})
export class HealthNeedsStepComponent {
  @Output() stepComplete = new EventEmitter<any>();
  @Output() previous = new EventEmitter<void>();

  formData = {
    medicalConditions: [] as string[],
    medicationManagement: '',
    personalCare: [] as string[],
    cognitiveSupport: ''
  };

  medicalConditions = [
    { value: 'diabetes', label: 'Diabetes', icon: '🩺' },
    { value: 'hypertension', label: 'Hypertension', icon: '💊' },
    { value: 'arthritis', label: 'Arthritis', icon: '🦴' },
    { value: 'heart-disease', label: 'Heart Disease', icon: '❤️' },
    { value: 'osteoporosis', label: 'Osteoporosis', icon: '🦴' },
    { value: 'vision', label: 'Vision Problems', icon: '👓' },
    { value: 'hearing', label: 'Hearing Problems', icon: '👂' },
    { value: 'other', label: 'Other', icon: '🏥' }
  ];

  medicationOptions = [
    { value: 'independent', label: 'I Manage Independently', icon: '✅' },
    { value: 'needs-help', label: 'Need Help', icon: '🤝' },
    { value: 'supervised', label: 'Require Supervision', icon: '👁️' }
  ];

  personalCareNeeds = [
    { value: 'bathing', label: 'Bathing', icon: '🚿' },
    { value: 'dressing', label: 'Dressing', icon: '👔' },
    { value: 'grooming', label: 'Grooming', icon: '💇' },
    { value: 'toileting', label: 'Toileting', icon: '🚽' },
    { value: 'eating', label: 'Eating', icon: '🍽️' },
    { value: 'mobility', label: 'Mobility Assistance', icon: '🚶' }
  ];

  cognitiveSupportOptions = [
    { value: 'yes', label: 'Yes', icon: '🧠' },
    { value: 'no', label: 'No', icon: '✅' },
    { value: 'sometimes', label: 'Sometimes', icon: '🤔' }
  ];

  toggleCondition(condition: string): void {
    const index = this.formData.medicalConditions.indexOf(condition);
    if (index > -1) {
      this.formData.medicalConditions.splice(index, 1);
    } else {
      this.formData.medicalConditions.push(condition);
    }
  }

  togglePersonalCare(need: string): void {
    const index = this.formData.personalCare.indexOf(need);
    if (index > -1) {
      this.formData.personalCare.splice(index, 1);
    } else {
      this.formData.personalCare.push(need);
    }
  }

  isConditionSelected(condition: string): boolean {
    return this.formData.medicalConditions.includes(condition);
  }

  isPersonalCareSelected(need: string): boolean {
    return this.formData.personalCare.includes(need);
  }

  canProceed(): boolean {
    return !!(
      this.formData.medicationManagement &&
      this.formData.cognitiveSupport
    );
  }

  onSubmit(): void {
    if (this.canProceed()) {
      this.stepComplete.emit({ healthNeeds: this.formData });
    }
  }

  onPrevious(): void {
    this.previous.emit();
  }
}


