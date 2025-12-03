import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LivingConditionsStepComponent } from './living-conditions-step.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

describe('LivingConditionsStepComponent', () => {
  let component: LivingConditionsStepComponent;
  let fixture: ComponentFixture<LivingConditionsStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LivingConditionsStepComponent,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatRadioModule,
        MatIconModule,
        MatRippleModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LivingConditionsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form data', () => {
    expect(component.formData.residenceType).toBe('');
    expect(component.formData.livingSituation).toBe('');
    expect(component.formData.homeAccessibility).toBe('');
    expect(component.formData.stairs).toBe('');
  });

  it('should have residence types', () => {
    expect(component.residenceTypes.length).toBeGreaterThan(0);
    expect(component.residenceTypes[0].value).toBeDefined();
    expect(component.residenceTypes[0].label).toBeDefined();
    expect(component.residenceTypes[0].icon).toBeDefined();
  });

  it('should have living situations', () => {
    expect(component.livingSituations.length).toBeGreaterThan(0);
  });

  it('should have accessibility levels', () => {
    expect(component.accessibilityLevels.length).toBeGreaterThan(0);
  });

  it('should have stairs options', () => {
    expect(component.stairsOptions.length).toBeGreaterThan(0);
  });

  it('should not allow proceeding with incomplete form', () => {
    expect(component.canProceed()).toBeFalse();
  });

  it('should allow proceeding when all fields are filled', () => {
    component.formData = {
      residenceType: 'house',
      livingSituation: 'alone',
      homeAccessibility: 'easy',
      stairs: 'no'
    };
    expect(component.canProceed()).toBeTrue();
  });

  it('should emit stepComplete when form is submitted and valid', () => {
    spyOn(component.stepComplete, 'emit');
    component.formData = {
      residenceType: 'house',
      livingSituation: 'alone',
      homeAccessibility: 'easy',
      stairs: 'no'
    };

    component.onSubmit();

    expect(component.stepComplete.emit).toHaveBeenCalledWith({
      livingConditions: component.formData
    });
  });

  it('should not emit stepComplete when form is invalid', () => {
    spyOn(component.stepComplete, 'emit');
    component.formData = {
      residenceType: '',
      livingSituation: 'alone',
      homeAccessibility: 'easy',
      stairs: 'no'
    };

    component.onSubmit();

    expect(component.stepComplete.emit).not.toHaveBeenCalled();
  });

  it('should emit previous when onPrevious is called', () => {
    spyOn(component.previous, 'emit');
    component.onPrevious();
    expect(component.previous.emit).toHaveBeenCalled();
  });
});

