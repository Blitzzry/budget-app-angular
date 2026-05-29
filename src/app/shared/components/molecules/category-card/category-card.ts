import { Component, computed, signal } from '@angular/core';
import { Icon } from '../../atoms/icon/icon';
import { Category } from '../../atoms/category/category';
import { BudgetService } from '../../../../core/services/budget.service';
import { CategoryInterface } from '../../../../core/models/category.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-card',
  imports: [Icon, Category, FormsModule],
  templateUrl: './category-card.html',
  styleUrl: './category-card.css',
})
export class CategoryCard {
  constructor(public budgetService: BudgetService) {}
  totalAmount: number = 0;
  categoryExample: CategoryInterface = {} as CategoryInterface;
  newCategory: CategoryInterface = {
  id: crypto.randomUUID(),
  name: '',
  percentage: 0,
  isLocked: false,
  assignedAmount: 0,
  iconName: 'shopping-cart'
};
  addCategory() {
  this.budgetService.addCategory({...this.newCategory});
  this.newCategory = {
    id: crypto.randomUUID(),
    name: '',
    percentage: 0,
    isLocked: false,
    assignedAmount: 0,
    iconName: 'shopping-cart'
  };
}
}
