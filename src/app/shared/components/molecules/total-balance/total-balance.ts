import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { BudgetService } from '../../../../core/services/budget.service';
import { DecimalPipe, NgClass } from '@angular/common';
import { Icon } from '../../atoms/icon/icon';
import { FormsModule } from '@angular/forms';
import { PercentageCalculator } from '../percentage-calculator/percentage-calculator';


@Component({
  selector: 'app-total-balance',
  imports: [DecimalPipe, Icon, FormsModule, NgClass, PercentageCalculator],
  templateUrl: './total-balance.html',
  styleUrl: './total-balance.css',
})

export class TotalBalance implements OnInit, AfterViewInit {
  constructor(public budgetService: BudgetService) { }
  displayValue: string = '';
  totall: number = 0;
  @Input() total!: number;
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const raw = input.value.replace(/\./g, '').replace(/\D/g, '');
    this.total = Number(raw);
    this.displayValue = this.total.toLocaleString('es-CO');
    input.value = this.displayValue;
    input.style.width = input.value.length + 2 + 'ch';
  }

  get statusColor(): string {
  if (this.budgetService.totalPercentage > 80) return 'green';
  if (this.budgetService.totalPercentage > 50) return 'yellow';
  return 'red';
}

  ngOnInit() {
    this.budgetService.updateTotalAssigned(this.total);
  }
  ngAfterViewInit() {
    this.displayValue = this.total > 0 ? this.total.toLocaleString('es-CO') : '';
  }
}