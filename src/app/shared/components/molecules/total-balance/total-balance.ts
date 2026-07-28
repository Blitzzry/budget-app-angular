import { Component, Input, OnInit, AfterViewInit, effect } from '@angular/core';
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
  constructor(public budgetService: BudgetService) {
    // effect() reacciona automáticamente cada vez que "total" cambia,
    // sin necesitar botón ni llamada manual
    effect(() => {
      this.budgetService.updateTotalAssigned(this.total);
    });
  }

  displayValue: string = '';
  totall: number = 0;
  @Input() total: number = 1; // valor por defecto 1, como pediste

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;

    // Limpia todo lo que no sea dígito (bloquea letras, símbolos, etc.)
    let raw = input.value.replace(/\D/g, '');

    // Si queda vacío (usuario borró todo), forzamos mínimo 1
    if (raw === '' || Number(raw) === 0) {
      raw = '1';
    }

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
    this.displayValue = this.total.toLocaleString('es-CO');
  }
}