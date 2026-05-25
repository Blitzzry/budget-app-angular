import { Component, OnInit } from '@angular/core';
import { Icon } from '../../atoms/icon/icon';
import { Category } from '../../atoms/category/category';
import { BudgetService } from '../../../../core/services/budget.service';
import { CategoryInterface } from '../../../../core/models/category.model';

@Component({
  selector: 'app-category-card',
  imports: [Icon, Category],
  templateUrl: './category-card.html',
  styleUrl: './category-card.css',
})
export class CategoryCard implements OnInit {
  totalAmount: number = 0;
  exampleCategories: CategoryInterface[] = [];
  categoryExample: CategoryInterface = {} as CategoryInterface;
  constructor(public budgetService: BudgetService) {
  }
  ngOnInit(): void {
    this.categoryExample = this.budgetService.categoryExample;
    this.exampleCategories = this.budgetService.mockCategories;
  }
}
