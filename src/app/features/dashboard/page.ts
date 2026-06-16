import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../core/services/budget.service';
import { TotalBalance } from '../../shared/components/molecules/total-balance/total-balance';
import { CategoryCard } from '../../shared/components/molecules/category-card/category-card';
import { PresetCard } from '../../shared/components/molecules/preset-card/preset-card';

@Component({
  selector: 'app-page',
  imports: [TotalBalance,
    CategoryCard,
    PresetCard
  ],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page implements OnInit {
  constructor(public budgetService: BudgetService) {}
  totalBalance: number = 0;
  ngOnInit() {
    this.totalBalance = this.budgetService.totalBalanceMock;
  }
}