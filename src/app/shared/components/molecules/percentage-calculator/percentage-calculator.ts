import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-percentage-calculator',
  imports: [DecimalPipe],
  templateUrl: './percentage-calculator.html',
  styleUrl: './percentage-calculator.css',
})
export class PercentageCalculator {
  @Input() totalBalance!: number;
  displayValue: string = '';
  total: number = 0;

  calculatePercentage(amount: number, totalAmount: number): number {
    return (amount * 100) / totalAmount;
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const raw = input.value.replace(/\./g, '').replace(/\D/g, '');
    this.total = Number(raw);
    this.displayValue = this.total.toLocaleString('es-CO');
    input.value = this.displayValue;
    input.style.width = input.value.length + 2 + 'ch';
  }

}
