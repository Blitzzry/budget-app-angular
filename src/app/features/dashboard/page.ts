import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../core/services/budget.service';
import { StatCard } from '../../shared/components/molecules/stat-card/stat-card';

@Component({
  selector: 'app-page',
  imports: [StatCard],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page implements OnInit {
  constructor(public budgetService: BudgetService) {}

  ngOnInit() {
    this.budgetService.loadJson();
  }
}