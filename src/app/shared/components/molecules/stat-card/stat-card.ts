import { Component, Input} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BudgetService } from '../../../../core/services/budget.service';
import { Category } from '../../../../core/models/category.model';

@Component({
  selector: 'app-stat-card',
  imports: [DecimalPipe],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css',
})
export class StatCard {
@Input() type: 'income' | 'expense' = 'income';
@Input() total!: number;
@Input() percentageDiff!: number;
  constructor(public BudgetService: BudgetService) {}
}
