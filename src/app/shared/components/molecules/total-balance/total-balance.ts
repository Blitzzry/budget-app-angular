import { Component, Input, OnInit, AfterViewInit, effect } from '@angular/core';
import { BudgetService } from '../../../../core/services/budget.service';
import { DecimalPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PercentageCalculator } from '../percentage-calculator/percentage-calculator';

@Component({
  selector: 'app-total-balance',
  imports: [DecimalPipe, FormsModule, NgClass, PercentageCalculator],
  templateUrl: './total-balance.html',
  styleUrl: './total-balance.css',
})
export class TotalBalance implements OnInit, AfterViewInit {
  constructor(public budgetService: BudgetService) {
    effect(() => {
      this.budgetService.updateTotalAssigned(budgetService.totalBalance());
    });
  }

  displayValue: string = '';

  onModelChange(value: string) {
    let raw = value.replace(/\D/g, '');
    if (raw === '') {
      raw = '1';
    }
    const numericValue = Number(raw);
    this.budgetService.totalBalance.set(numericValue);
    this.displayValue = numericValue.toLocaleString('es-CO');
  }

  get statusColor(): string {
    if (this.budgetService.totalPercentage > 80) return 'green';
    if (this.budgetService.totalPercentage > 50) return 'yellow';
    return 'red';
  }

  ngOnInit() {
    this.budgetService.updateTotalAssigned(this.budgetService.totalBalance());
  }

  ngAfterViewInit() {
    this.displayValue = this.budgetService.totalBalance().toLocaleString('es-CO');
  }
}