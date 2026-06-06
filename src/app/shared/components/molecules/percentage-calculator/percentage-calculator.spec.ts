import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageCalculator } from './percentage-calculator';

describe('PercentageCalculator', () => {
  let component: PercentageCalculator;
  let fixture: ComponentFixture<PercentageCalculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PercentageCalculator],
    }).compileComponents();

    fixture = TestBed.createComponent(PercentageCalculator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
