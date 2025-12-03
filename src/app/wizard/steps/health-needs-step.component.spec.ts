import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HealthNeedsStepComponent } from './health-needs-step.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

describe('HealthNeedsStepComponent', () => {
  let component: HealthNeedsStepComponent;
  let fixture: ComponentFixture<HealthNeedsStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HealthNeedsStepComponent,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatRadioModule,
        MatCheckboxModule,
        MatIconModule,
        MatRippleModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HealthNeedsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form data', () => {
    expect(component.formData.medicalConditions).toEqual([]);
    expect(component.formData.medicationManagement).toBe('');
    expect(component.formData.personalCare).toEqual([]);
    expect(component.formData.cognitiveSupport).toBe('');
  });

  it('should have medical conditions', () => {
    expect(component.medicalConditions.length).toBeGreaterThan(0);
  });

  it('should have medication options', () => {
    expect(component.medicationOptions.length).toBeGreaterThan(0);
  });

  it('should have personal care needs', () => {
    expect(component.personalCareNeeds.length).toBeGreaterThan(0);
  });

  it('should have cognitive support options', () => {
    expect(component.cognitiveSupportOptions.length).toBeGreaterThan(0);
  });

  it('should toggle condition selection', () => {
    const condition = 'diabetes';
    expect(component.isConditionSelected(condition)).toBeFalse();

    component.toggleCondition(condition);
    expect(component.isConditionSelected(condition)).toBeTrue();
    expect(component.formData.medicalConditions).toContain(condition);

    component.toggleCondition(condition);
    expect(component.isConditionSelected(condition)).toBeFalse();
    expect(component.formData.medicalConditions).not.toContain(condition);
  });

  it('should toggle personal care selection', () => {
    const need = 'bathing';
    expect(component.isPersonalCareSelected(need)).toBeFalse();

    component.togglePersonalCare(need);
    expect(component.isPersonalCareSelected(need)).toBeTrue();
    expect(component.formData.personalCare).toContain(need);

    component.togglePersonalCare(need);
    expect(component.isPersonalCareSelected(need)).toBeFalse();
    expect(component.formData.personalCare).not.toContain(need);
  });

  it('should not allow proceeding with incomplete form', () => {
    expect(component.canProceed()).toBeFalse();
  });

  it('should allow proceeding when required fields are filled', () => {
    component.formData = {
      medicalConditions: [],
      medicationManagement: 'independent',
      personalCare: [],
      cognitiveSupport: 'no'
    };
    expect(component.canProceed()).toBeTrue();
  });

  it('should allow proceeding with conditions and personal care selected', () => {
    component.formData = {
      medicalConditions: ['diabetes'],
      medicationManagement: 'independent',
      personalCare: ['bathing'],
      cognitiveSupport: 'no'
    };
    expect(component.canProceed()).toBeTrue();
  });

  it('should emit stepComplete when form is submitted and valid', () => {
    spyOn(component.stepComplete, 'emit');
    component.formData = {
      medicalConditions: ['diabetes'],
      medicationManagement: 'independent',
      personalCare: ['bathing'],
      cognitiveSupport: 'no'
    };

    component.onSubmit();

    expect(component.stepComplete.emit).toHaveBeenCalledWith({
      healthNeeds: component.formData
    });
  });

  it('should emit previous when onPrevious is called', () => {
    spyOn(component.previous, 'emit');
    component.onPrevious();
    expect(component.previous.emit).toHaveBeenCalled();
  });
});

