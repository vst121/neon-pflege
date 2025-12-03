import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface WizardData {
  livingConditions: {
    residenceType: string;
    livingSituation: string;
    homeAccessibility: string;
    stairs: string;
  };
  mobility: {
    mobilityLevel: string;
    walkingAid: string;
    dailyActivities: string[];
    transportation: string;
  };
  healthNeeds: {
    medicalConditions: string[];
    medicationManagement: string;
    personalCare: string[];
    cognitiveSupport: string;
  };
}

export interface CareRecommendation {
  id: string;
  title: string;
  description: string;
  icon: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class WizardService {
  private dataSubject = new BehaviorSubject<Partial<WizardData>>({});
  public data$: Observable<Partial<WizardData>> = this.dataSubject.asObservable();

  private currentStepSubject = new BehaviorSubject<number>(1);
  public currentStep$: Observable<number> = this.currentStepSubject.asObservable();

  private totalSteps = 3;

  updateData(data: Partial<WizardData>): void {
    const currentData = this.dataSubject.value;
    this.dataSubject.next({ ...currentData, ...data });
  }

  getData(): Partial<WizardData> {
    return this.dataSubject.value;
  }

  setCurrentStep(step: number): void {
    if (step >= 1 && step <= this.totalSteps) {
      this.currentStepSubject.next(step);
    }
  }

  getCurrentStep(): number {
    return this.currentStepSubject.value;
  }

  getTotalSteps(): number {
    return this.totalSteps;
  }

  nextStep(): void {
    const current = this.currentStepSubject.value;
    if (current < this.totalSteps) {
      this.currentStepSubject.next(current + 1);
    }
  }

  previousStep(): void {
    const current = this.currentStepSubject.value;
    if (current > 1) {
      this.currentStepSubject.next(current - 1);
    }
  }

  generateRecommendations(): CareRecommendation[] {
    const data = this.getData();
    const recommendations: CareRecommendation[] = [];

    // Analyze living conditions
    if (data.livingConditions?.homeAccessibility === 'difficult' || 
        data.livingConditions?.stairs === 'yes') {
      recommendations.push({
        id: 'barrier-free-bathroom',
        title: 'Barrier-Free Bathroom',
        description: 'Install grab bars, walk-in shower, and raised toilet seat for improved safety and accessibility.',
        icon: '🚿',
        priority: 'high',
        category: 'Home Modification'
      });
    }

    // Analyze mobility
    if (data.mobility?.mobilityLevel === 'limited' || 
        data.mobility?.mobilityLevel === 'wheelchair') {
      recommendations.push({
        id: 'mobility-aids',
        title: 'Mobility Aids',
        description: 'Consider walkers, wheelchairs, or mobility scooters to enhance independence and safety.',
        icon: '🦽',
        priority: 'high',
        category: 'Mobility Support'
      });
    }

    if (data.mobility?.walkingAid === 'none' && 
        (data.mobility?.mobilityLevel === 'limited' || data.mobility?.mobilityLevel === 'difficult')) {
      recommendations.push({
        id: 'walking-aid-assessment',
        title: 'Walking Aid Assessment',
        description: 'Professional assessment for appropriate walking aids (cane, walker, rollator).',
        icon: '🦯',
        priority: 'medium',
        category: 'Mobility Support'
      });
    }

    // Analyze health needs
    const needsPersonalCare = data.healthNeeds?.personalCare && 
                             data.healthNeeds.personalCare.length > 0;
    const needsMedicationHelp = data.healthNeeds?.medicationManagement === 'needs-help';

    if (needsPersonalCare || needsMedicationHelp || 
        (data.mobility?.dailyActivities && data.mobility.dailyActivities.length > 2)) {
      recommendations.push({
        id: 'part-time-care',
        title: 'Part-Time Care',
        description: 'Regular professional care assistance for personal care, medication management, and daily activities.',
        icon: '👩‍⚕️',
        priority: 'high',
        category: 'Care Services'
      });
    }

    if (data.mobility?.dailyActivities && data.mobility.dailyActivities.length > 0 &&
        data.mobility.dailyActivities.length <= 2) {
      recommendations.push({
        id: 'home-help',
        title: 'Home Help Services',
        description: 'Assistance with household tasks, meal preparation, and light housekeeping.',
        icon: '🏠',
        priority: 'medium',
        category: 'Care Services'
      });
    }

    if (data.healthNeeds?.cognitiveSupport === 'yes') {
      recommendations.push({
        id: 'cognitive-support',
        title: 'Cognitive Support Services',
        description: 'Specialized support for memory care, cognitive exercises, and mental health support.',
        icon: '🧠',
        priority: 'high',
        category: 'Care Services'
      });
    }

    // Default recommendation if none found
    if (recommendations.length === 0) {
      recommendations.push({
        id: 'preventive-care',
        title: 'Preventive Care Consultation',
        description: 'Regular check-ins and preventive care planning to maintain independence and well-being.',
        icon: '💚',
        priority: 'low',
        category: 'Care Services'
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  reset(): void {
    this.dataSubject.next({});
    this.currentStepSubject.next(1);
  }
}

