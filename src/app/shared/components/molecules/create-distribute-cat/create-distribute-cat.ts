import { Component } from '@angular/core';
import { BudgetService } from '../../../../core/services/budget.service';
import { CategoryInterface } from '../../../../core/models/category.model';
import { Icon } from '../../atoms/icon/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-distribute-cat',
  imports: [Icon, FormsModule],
  templateUrl: './create-distribute-cat.html',
  styleUrl: './create-distribute-cat.css',
})
export class CreateDistributeCat {
  constructor (public budgetService: BudgetService) {}
  newCategory: CategoryInterface = {
      id: crypto.randomUUID(),
      name: '',
      percentage: 0,
      isLocked: false,
      assignedAmount: 0,
      iconName: 'shopping-cart'
    };
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
