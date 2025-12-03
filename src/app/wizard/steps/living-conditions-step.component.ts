import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-living-conditions-step',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatIconModule,
    MatRippleModule
  ],
  templateUrl: './living-conditions-step.component.html',
  styleUrls: ['./living-conditions-step.component.scss']
})
export class LivingConditionsStepComponent {
  @Output() stepComplete = new EventEmitter<any>();
  @Output() previous = new EventEmitter<void>();

  formData = {
    residenceType: '',
    livingSituation: '',
    homeAccessibility: '',
    stairs: ''
  };

  residenceTypes = [
    { value: 'house', label: 'House', icon: '🏠' },
    { value: 'apartment', label: 'Apartment', icon: '🏢' },
    { value: 'senior-living', label: 'Senior Living Community', icon: '🏘️' },
    { value: 'other', label: 'Other', icon: '📍' }
  ];

  livingSituations = [
    { value: 'alone', label: 'Living Alone', icon: '👤' },
    { value: 'spouse', label: 'With Spouse/Partner', icon: '👫' },
    { value: 'family', label: 'With Family', icon: '👨‍👩‍👧‍👦' },
    { value: 'caregiver', label: 'With Caregiver', icon: '👩‍⚕️' }
  ];

  accessibilityLevels = [
    { value: 'easy', label: 'Easy - Fully Accessible', icon: '✅' },
    { value: 'moderate', label: 'Moderate - Some Challenges', icon: '⚠️' },
    { value: 'difficult', label: 'Difficult - Many Barriers', icon: '❌' }
  ];

  stairsOptions = [
    { value: 'yes', label: 'Yes', icon: '📶' },
    { value: 'no', label: 'No', icon: '✅' }
  ];

  canProceed(): boolean {
    return !!(
      this.formData.residenceType &&
      this.formData.livingSituation &&
      this.formData.homeAccessibility &&
      this.formData.stairs
    );
  }

  onSubmit(): void {
    if (this.canProceed()) {
      this.stepComplete.emit({ livingConditions: this.formData });
    }
  }

  onPrevious(): void {
    this.previous.emit();
  }
}


