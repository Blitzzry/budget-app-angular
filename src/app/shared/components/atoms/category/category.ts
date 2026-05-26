import { Component, Input } from '@angular/core';
import { Icon } from '../icon/icon';
import { BudgetService } from '../../../../core/services/budget.service';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  imports: [Icon, DecimalPipe, FormsModule],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {
  constructor(private budgetService: BudgetService) {}
  @Input() iconName: 'personal' | 'house' | 'health' | 'heart' | 'savings' | 'pencil-square' | 'lock' | 'arrow-up-circle' | 'arrow-down-circle' | 'plus' | 'shopping-cart' | 'food' | 'transport' | 'entertainment' | 'pencil' | 'trash' = 'shopping-cart';
  @Input() categoryName!: string;
  @Input() percentage!: number;
  @Input() isLocked: boolean = false;
  @Input() assignedAmount: number = 0;
  editing: boolean = false;
  toggleEdit() {
    this.editing = !this.editing;
  }
 }
