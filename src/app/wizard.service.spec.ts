import { TestBed } from '@angular/core/testing';
import { WizardService, CareRecommendation } from './wizard.service';

describe('WizardService', () => {
  let service: WizardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WizardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Step Management', () => {
    it('should initialize with step 1', () => {
      expect(service.getCurrentStep()).toBe(1);
    });

    it('should set current step', () => {
      service.setCurrentStep(2);
      expect(service.getCurrentStep()).toBe(2);
    });

    it('should not set step below 1', () => {
      service.setCurrentStep(0);
      expect(service.getCurrentStep()).toBe(1);
    });

    it('should not set step above total steps', () => {
      service.setCurrentStep(4);
      expect(service.getCurrentStep()).toBe(1);
    });

    it('should move to next step', () => {
      service.nextStep();
      expect(service.getCurrentStep()).toBe(2);
    });

    it('should not move beyond total steps', () => {
      service.setCurrentStep(3);
      service.nextStep();
      expect(service.getCurrentStep()).toBe(3);
    });

    it('should move to previous step', () => {
      service.setCurrentStep(2);
      service.previousStep();
      expect(service.getCurrentStep()).toBe(1);
    });

    it('should not move below step 1', () => {
      service.previousStep();
      expect(service.getCurrentStep()).toBe(1);
    });

    it('should return total steps', () => {
      expect(service.getTotalSteps()).toBe(3);
    });
  });

  describe('Data Management', () => {
    it('should initialize with empty data', () => {
      expect(service.getData()).toEqual({});
    });

    it('should update data', () => {
      const testData = {
        livingConditions: {
          residenceType: 'house',
          livingSituation: 'alone',
          homeAccessibility: 'easy',
          stairs: 'no'
        }
      };
      service.updateData(testData);
      expect(service.getData()).toEqual(testData);
    });

    it('should merge data on update', () => {
      const initialData = {
        livingConditions: {
          residenceType: 'house',
          livingSituation: 'alone',
          homeAccessibility: 'easy',
          stairs: 'no'
        }
      };
      service.updateData(initialData);

      const additionalData = {
        mobility: {
          mobilityLevel: 'independent',
          walkingAid: 'none',
          dailyActivities: [],
          transportation: 'drives'
        }
      };
      service.updateData(additionalData);

      expect(service.getData()).toEqual({
        ...initialData,
        ...additionalData
      });
    });

    it('should reset data and step', () => {
      service.setCurrentStep(3);
      service.updateData({
        livingConditions: {
          residenceType: 'house',
          livingSituation: 'alone',
          homeAccessibility: 'easy',
          stairs: 'no'
        }
      });

      service.reset();

      expect(service.getCurrentStep()).toBe(1);
      expect(service.getData()).toEqual({});
    });
  });

  describe('Recommendations Generation', () => {
    it('should return default recommendation when no data', () => {
      const recommendations = service.generateRecommendations();
      expect(recommendations.length).toBeGreaterThan(0);
      expect(recommendations[0].id).toBe('preventive-care');
    });

    it('should generate high priority recommendation for difficult accessibility', () => {
      service.updateData({
        livingConditions: {
          residenceType: 'house',
          livingSituation: 'alone',
          homeAccessibility: 'difficult',
          stairs: 'no'
        }
      });

      const recommendations = service.generateRecommendations();
      const barrierFree = recommendations.find(r => r.id === 'barrier-free-bathroom');
      expect(barrierFree).toBeDefined();
      expect(barrierFree?.priority).toBe('high');
    });

    it('should generate recommendation for stairs', () => {
      service.updateData({
        livingConditions: {
          residenceType: 'house',
          livingSituation: 'alone',
          homeAccessibility: 'easy',
          stairs: 'yes'
        }
      });

      const recommendations = service.generateRecommendations();
      const barrierFree = recommendations.find(r => r.id === 'barrier-free-bathroom');
      expect(barrierFree).toBeDefined();
    });

    it('should generate mobility recommendation for limited mobility', () => {
      service.updateData({
        mobility: {
          mobilityLevel: 'limited',
          walkingAid: 'cane',
          dailyActivities: [],
          transportation: 'drives'
        }
      });

      const recommendations = service.generateRecommendations();
      const mobilityAids = recommendations.find(r => r.id === 'mobility-aids');
      expect(mobilityAids).toBeDefined();
      expect(mobilityAids?.priority).toBe('high');
    });

    it('should generate walking aid assessment recommendation', () => {
      service.updateData({
        mobility: {
          mobilityLevel: 'limited',
          walkingAid: 'none',
          dailyActivities: [],
          transportation: 'drives'
        }
      });

      const recommendations = service.generateRecommendations();
      const assessment = recommendations.find(r => r.id === 'walking-aid-assessment');
      expect(assessment).toBeDefined();
      expect(assessment?.priority).toBe('medium');
    });

    it('should generate part-time care recommendation for personal care needs', () => {
      service.updateData({
        healthNeeds: {
          medicalConditions: [],
          medicationManagement: 'independent',
          personalCare: ['bathing', 'dressing'],
          cognitiveSupport: 'no'
        }
      });

      const recommendations = service.generateRecommendations();
      const partTimeCare = recommendations.find(r => r.id === 'part-time-care');
      expect(partTimeCare).toBeDefined();
      expect(partTimeCare?.priority).toBe('high');
    });

    it('should generate cognitive support recommendation', () => {
      service.updateData({
        healthNeeds: {
          medicalConditions: [],
          medicationManagement: 'independent',
          personalCare: [],
          cognitiveSupport: 'yes'
        }
      });

      const recommendations = service.generateRecommendations();
      const cognitiveSupport = recommendations.find(r => r.id === 'cognitive-support');
      expect(cognitiveSupport).toBeDefined();
      expect(cognitiveSupport?.priority).toBe('high');
    });

    it('should sort recommendations by priority', () => {
      service.updateData({
        livingConditions: {
          residenceType: 'house',
          livingSituation: 'alone',
          homeAccessibility: 'difficult',
          stairs: 'yes'
        },
        mobility: {
          mobilityLevel: 'limited',
          walkingAid: 'none',
          dailyActivities: ['shopping'],
          transportation: 'drives'
        }
      });

      const recommendations = service.generateRecommendations();
      const priorities = recommendations.map(r => r.priority);
      
      // Check that high priority comes before medium, and medium before low
      for (let i = 0; i < priorities.length - 1; i++) {
        const current = priorities[i];
        const next = priorities[i + 1];
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        expect(priorityOrder[current as keyof typeof priorityOrder])
          .toBeGreaterThanOrEqual(priorityOrder[next as keyof typeof priorityOrder]);
      }
    });
  });

  describe('Observables', () => {
    it('should emit current step changes', (done) => {
      service.currentStep$.subscribe(step => {
        if (step === 2) {
          expect(step).toBe(2);
          done();
        }
      });
      service.setCurrentStep(2);
    });

    it('should emit data changes', (done) => {
      const testData = {
        livingConditions: {
          residenceType: 'apartment',
          livingSituation: 'spouse',
          homeAccessibility: 'moderate',
          stairs: 'no'
        }
      };

      service.data$.subscribe(data => {
        if (data.livingConditions) {
          expect(data).toEqual(testData);
          done();
        }
      });
      service.updateData(testData);
    });
  });
});

