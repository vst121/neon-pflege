import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mobility-step',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mobility-step.component.html',
  styleUrls: ['./mobility-step.component.scss']
})
export class MobilityStepComponent {
  @Output() stepComplete = new EventEmitter<any>();
  @Output() previous = new EventEmitter<void>();

  formData = {
    mobilityLevel: '',
    walkingAid: '',
    dailyActivities: [] as string[],
    transportation: ''
  };

  mobilityLevels = [
    { value: 'independent', label: 'Fully Independent', icon: '🚶' },
    { value: 'limited', label: 'Limited Mobility', icon: '🚶‍♂️' },
    { value: 'difficult', label: 'Difficulty Walking', icon: '🦽' },
    { value: 'wheelchair', label: 'Wheelchair User', icon: '♿' }
  ];

  walkingAids = [
    { value: 'none', label: 'No Aid', icon: '🚶' },
    { value: 'cane', label: 'Cane', icon: '🦯' },
    { value: 'walker', label: 'Walker', icon: '🚶‍♂️' },
    { value: 'wheelchair', label: 'Wheelchair', icon: '♿' }
  ];

  dailyActivityOptions = [
    { value: 'shopping', label: 'Grocery Shopping', icon: '🛒' },
    { value: 'cooking', label: 'Cooking', icon: '👨‍🍳' },
    { value: 'cleaning', label: 'House Cleaning', icon: '🧹' },
    { value: 'laundry', label: 'Laundry', icon: '👔' },
    { value: 'gardening', label: 'Gardening', icon: '🌱' },
    { value: 'errands', label: 'Running Errands', icon: '📋' }
  ];

  transportationOptions = [
    { value: 'drives', label: 'I Drive', icon: '🚗' },
    { value: 'family', label: 'Family/Friends', icon: '👨‍👩‍👧‍👦' },
    { value: 'public', label: 'Public Transport', icon: '🚌' },
    { value: 'taxi', label: 'Taxi/Rideshare', icon: '🚕' },
    { value: 'none', label: 'Limited Access', icon: '🚫' }
  ];

  toggleActivity(activity: string): void {
    const index = this.formData.dailyActivities.indexOf(activity);
    if (index > -1) {
      this.formData.dailyActivities.splice(index, 1);
    } else {
      this.formData.dailyActivities.push(activity);
    }
  }

  isActivitySelected(activity: string): boolean {
    return this.formData.dailyActivities.includes(activity);
  }

  canProceed(): boolean {
    return !!(
      this.formData.mobilityLevel &&
      this.formData.walkingAid &&
      this.formData.transportation
    );
  }

  onSubmit(): void {
    if (this.canProceed()) {
      this.stepComplete.emit({ mobility: this.formData });
    }
  }

  onPrevious(): void {
    this.previous.emit();
  }
}

