import { Component, Input } from '@angular/core';
import { Icon } from '../icon/icon';
import { BudgetService } from '../../../../core/services/budget.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-category',
  imports: [Icon, DecimalPipe],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {
  constructor(private budgetService: BudgetService) {}
  @Input() iconName: 'shopping-cart' | 'food' | 'transport' | 'entertainment' = 'shopping-cart';
  @Input() categoryName!: string;
  @Input() percentage!: number;
  @Input() isLocked: boolean = false;
  @Input() assignedAmount: number = 0;
 }
