import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDistributeCat } from './create-distribute-cat';

describe('CreateDistributeCat', () => {
  let component: CreateDistributeCat;
  let fixture: ComponentFixture<CreateDistributeCat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDistributeCat],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDistributeCat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
