import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MobilityStepComponent } from './mobility-step.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

describe('MobilityStepComponent', () => {
  let component: MobilityStepComponent;
  let fixture: ComponentFixture<MobilityStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MobilityStepComponent,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatRadioModule,
        MatCheckboxModule,
        MatIconModule,
        MatRippleModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MobilityStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form data', () => {
    expect(component.formData.mobilityLevel).toBe('');
    expect(component.formData.walkingAid).toBe('');
    expect(component.formData.dailyActivities).toEqual([]);
    expect(component.formData.transportation).toBe('');
  });

  it('should have mobility levels', () => {
    expect(component.mobilityLevels.length).toBeGreaterThan(0);
  });

  it('should have walking aids', () => {
    expect(component.walkingAids.length).toBeGreaterThan(0);
  });

  it('should have daily activity options', () => {
    expect(component.dailyActivityOptions.length).toBeGreaterThan(0);
  });

  it('should have transportation options', () => {
    expect(component.transportationOptions.length).toBeGreaterThan(0);
  });

  it('should toggle activity selection', () => {
    const activity = 'shopping';
    expect(component.isActivitySelected(activity)).toBeFalse();

    component.toggleActivity(activity);
    expect(component.isActivitySelected(activity)).toBeTrue();
    expect(component.formData.dailyActivities).toContain(activity);

    component.toggleActivity(activity);
    expect(component.isActivitySelected(activity)).toBeFalse();
    expect(component.formData.dailyActivities).not.toContain(activity);
  });

  it('should not allow proceeding with incomplete form', () => {
    expect(component.canProceed()).toBeFalse();
  });

  it('should allow proceeding when required fields are filled', () => {
    component.formData = {
      mobilityLevel: 'independent',
      walkingAid: 'none',
      dailyActivities: [],
      transportation: 'drives'
    };
    expect(component.canProceed()).toBeTrue();
  });

  it('should allow proceeding with daily activities selected', () => {
    component.formData = {
      mobilityLevel: 'independent',
      walkingAid: 'none',
      dailyActivities: ['shopping'],
      transportation: 'drives'
    };
    expect(component.canProceed()).toBeTrue();
  });

  it('should emit stepComplete when form is submitted and valid', () => {
    spyOn(component.stepComplete, 'emit');
    component.formData = {
      mobilityLevel: 'independent',
      walkingAid: 'none',
      dailyActivities: ['shopping'],
      transportation: 'drives'
    };

    component.onSubmit();

    expect(component.stepComplete.emit).toHaveBeenCalledWith({
      mobility: component.formData
    });
  });

  it('should emit previous when onPrevious is called', () => {
    spyOn(component.previous, 'emit');
    component.onPrevious();
    expect(component.previous.emit).toHaveBeenCalled();
  });
});

