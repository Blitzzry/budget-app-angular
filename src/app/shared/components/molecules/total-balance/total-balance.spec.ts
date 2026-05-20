import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TotalBalance } from './total-balance';

describe('TotalBalance', () => {
  let component: TotalBalance;
  let fixture: ComponentFixture<TotalBalance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalBalance],
    }).compileComponents();

    fixture = TestBed.createComponent(TotalBalance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
