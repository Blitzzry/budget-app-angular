import { Component, Input} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BudgetService } from '../../../../core/services/budget.service';
import { CategoryInterface } from '../../../../core/models/category.model';
import { Icon } from '../../atoms/icon/icon';

@Component({
  selector: 'app-stat-card',
  imports: [DecimalPipe, Icon],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css',
})
export class StatCard {
@Input() type: 'income' | 'expense' = 'income';
@Input() total!: number;
@Input() percentageDiff!: number;
  constructor(public BudgetService: BudgetService) {}
}
