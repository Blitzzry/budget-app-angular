import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../core/services/budget.service';
import { TotalBalance } from '../../shared/components/molecules/total-balance/total-balance';
import { CategoryCard } from '../../shared/components/organisms/category-card/category-card';
import { PresetCard } from '../../shared/components/molecules/preset-card/preset-card';
import { Topbar } from '../../shared/components/molecules/topbar/topbar';

@Component({
  selector: 'app-page',
  imports: [TotalBalance,
    CategoryCard,
    PresetCard,
    Topbar
  ],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page implements OnInit {
  constructor(public budgetService: BudgetService) {}
  totalBalance: number = 0;
  ngOnInit() {
    this.totalBalance = this.budgetService.totalBalance();
  }
}