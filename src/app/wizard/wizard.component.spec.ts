import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { WizardComponent } from './wizard.component';
import { WizardService } from '../wizard.service';
import { BehaviorSubject } from 'rxjs';

describe('WizardComponent', () => {
  let component: WizardComponent;
  let fixture: ComponentFixture<WizardComponent>;
  let wizardService: jasmine.SpyObj<WizardService>;
  let router: jasmine.SpyObj<Router>;

  const mockWizardService = {
    currentStep$: new BehaviorSubject<number>(1),
    updateData: jasmine.createSpy('updateData'),
    nextStep: jasmine.createSpy('nextStep'),
    previousStep: jasmine.createSpy('previousStep')
  };

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [WizardComponent],
      providers: [
        { provide: WizardService, useValue: mockWizardService },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WizardComponent);
    component = fixture.componentInstance;
    wizardService = TestBed.inject(WizardService) as jasmine.SpyObj<WizardService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with step 1', () => {
    expect(component.currentStep).toBe(1);
  });

  it('should have correct total steps', () => {
    expect(component.totalSteps).toBe(3);
  });

  it('should have correct step titles', () => {
    expect(component.stepTitles).toEqual([
      'Living Conditions',
      'Mobility',
      'Health Needs'
    ]);
  });

  it('should subscribe to current step changes', () => {
    mockWizardService.currentStep$.next(2);
    fixture.detectChanges();
    expect(component.currentStep).toBe(2);
  });

  it('should update data and move to next step when step is not last', () => {
    component.currentStep = 1;
    const stepData: any = { livingConditions: { residenceType: 'house' } };

    component.onStepComplete(stepData);

    expect(wizardService.updateData).toHaveBeenCalledWith(stepData);
    expect(wizardService.nextStep).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to results when last step is completed', () => {
    component.currentStep = 3;
    const stepData: any = { healthNeeds: { medicationManagement: 'independent' } };

    component.onStepComplete(stepData);

    expect(wizardService.updateData).toHaveBeenCalledWith(stepData);
    expect(router.navigate).toHaveBeenCalledWith(['/results']);
    // Note: nextStep is not called when on the last step
  });

  it('should call previousStep when onPrevious is called', () => {
    component.onPrevious();
    expect(wizardService.previousStep).toHaveBeenCalled();
  });

  it('should calculate step progress correctly', () => {
    component.currentStep = 1;
    expect(component.getStepProgress()).toBeCloseTo(33.33, 1);

    component.currentStep = 2;
    expect(component.getStepProgress()).toBeCloseTo(66.67, 1);

    component.currentStep = 3;
    expect(component.getStepProgress()).toBe(100);
  });
});

