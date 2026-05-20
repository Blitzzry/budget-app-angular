import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../core/services/budget.service';
import { StatCard } from '../../shared/components/molecules/stat-card/stat-card';
import { TotalBalance } from '../../shared/components/molecules/total-balance/total-balance';
import { CategoryCard } from '../../shared/components/molecules/category-card/category-card';

@Component({
  selector: 'app-page',
  imports: [StatCard,
    TotalBalance,
    CategoryCard
  ],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page implements OnInit {
  constructor(public budgetService: BudgetService) {}

  ngOnInit() {
    this.budgetService.loadJson();
  }
}