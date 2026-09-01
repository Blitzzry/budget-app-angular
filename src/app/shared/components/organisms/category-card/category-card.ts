import { Component } from '@angular/core';
import { Icon } from '../../atoms/icon/icon';
import { Category } from '../../molecules/category/category';
import { BudgetService } from '../../../../core/services/budget.service';
import { CategoryInterface } from '../../../../core/models/category.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { CategoriesRepository } from '../../../../core/services/categories-repository.service';

@Component({
  selector: 'app-category-card',
  imports: [Icon, Category, FormsModule],
  templateUrl: './category-card.html',
  styleUrl: './category-card.css',
})
export class CategoryCard {
  constructor(public budgetService: BudgetService, private authService: AuthService, private categoriesRepo: CategoriesRepository) { }
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

  async editCategory(event: { id: string | number; category: CategoryInterface }) {
    if (this.authService.userIsLoggedIn()) {
      if (this.budgetService.uuidPattern.test(event.id as string)) {
        await this.categoriesRepo.update({ ...event.category }, event.id as string);
      } else {
        await this.categoriesRepo.create({ ...event.category });
      }
    }
    this.budgetService.categories.update(cats => cats.map(cat => cat.id === event.id ? { ...event.category } : cat)
    );
  }

  async removeCategory(categoryId: string | number) {
    if (this.authService.userIsLoggedIn()) {
      if (this.budgetService.uuidPattern.test(categoryId as string)) {
        await this.categoriesRepo.deleteCat(categoryId as string);
      }
    }
    this.budgetService.categories.update(cats => cats.filter(cat => cat.id !== categoryId));
  }

  async addCategory() {
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
