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
  constructor(public budgetService: BudgetService) { }
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

  lockCategory(categoryId: string | number) {
    this.budgetService.categories.update(cats => cats.map(cat => cat.id === categoryId ? { ...cat, isLocked: !cat.isLocked } : cat));
  }

  removeCategory(categoryId: string | number) {
    this.budgetService.categories.update(cats => cats.filter(cat => cat.id !== categoryId));
    console.log(categoryId);
  }

  editCategory(categoryId: string | number, editedCategory: CategoryInterface) {
    console.table(this.budgetService.categories());
    console.table(editedCategory);
    this.budgetService.categories.update(cats => cats.map(cat => cat.id === categoryId ? { ...cat, ...editedCategory } : cat));
    this.budgetService.updateTotalBalance(this.budgetService.totalBalanceMock);
  }

  addCategory() {
    this.budgetService.addCategory({ ...this.newCategory });
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
