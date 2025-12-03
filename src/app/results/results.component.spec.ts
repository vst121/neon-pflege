import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ResultsComponent } from './results.component';
import { WizardService, CareRecommendation } from '../wizard.service';
import { of } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let wizardService: jasmine.SpyObj<WizardService>;
  let router: jasmine.SpyObj<Router>;

  const mockRecommendations: CareRecommendation[] = [
    {
      id: 'test-1',
      title: 'Test Recommendation 1',
      description: 'Test description 1',
      icon: '🏠',
      priority: 'high',
      category: 'Home Modification'
    },
    {
      id: 'test-2',
      title: 'Test Recommendation 2',
      description: 'Test description 2',
      icon: '🦽',
      priority: 'medium',
      category: 'Mobility Support'
    }
  ];

  beforeEach(async () => {
    const wizardServiceSpy = jasmine.createSpyObj('WizardService', ['generateRecommendations', 'reset']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    wizardServiceSpy.generateRecommendations.and.returnValue(mockRecommendations);

    await TestBed.configureTestingModule({
      imports: [
        ResultsComponent,
        MatButtonModule,
        MatCardModule,
        MatChipsModule,
        MatIconModule
      ],
      providers: [
        { provide: WizardService, useValue: wizardServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    wizardService = TestBed.inject(WizardService) as jasmine.SpyObj<WizardService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load recommendations on init', () => {
    component.ngOnInit();
    expect(wizardService.generateRecommendations).toHaveBeenCalled();
    expect(component.recommendations).toEqual(mockRecommendations);
  });

  it('should group recommendations by category', () => {
    component.recommendations = mockRecommendations;
    component.groupRecommendations();

    expect(component.groupedRecommendations['Home Modification']).toBeDefined();
    expect(component.groupedRecommendations['Home Modification'].length).toBe(1);
    expect(component.groupedRecommendations['Mobility Support']).toBeDefined();
    expect(component.groupedRecommendations['Mobility Support'].length).toBe(1);
  });

  it('should return category keys', () => {
    component.recommendations = mockRecommendations;
    component.groupRecommendations();

    const keys = component.getCategoryKeys();
    expect(keys).toContain('Home Modification');
    expect(keys).toContain('Mobility Support');
  });

  it('should return priority class', () => {
    expect(component.getPriorityClass('high')).toBe('priority-high');
    expect(component.getPriorityClass('medium')).toBe('priority-medium');
    expect(component.getPriorityClass('low')).toBe('priority-low');
  });

  it('should return priority label with capital letter', () => {
    expect(component.getPriorityLabel('high')).toBe('High');
    expect(component.getPriorityLabel('medium')).toBe('Medium');
    expect(component.getPriorityLabel('low')).toBe('Low');
  });

  it('should return category icon', () => {
    expect(component.getCategoryIcon('Home Modification')).toBe('🏠');
    expect(component.getCategoryIcon('Mobility Support')).toBe('🦽');
    expect(component.getCategoryIcon('Care Services')).toBe('👩‍⚕️');
    expect(component.getCategoryIcon('Unknown')).toBe('💡');
  });

  it('should reset wizard and navigate home when startOver is called', () => {
    component.startOver();
    expect(wizardService.reset).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});

