import { Component } from '@angular/core';
import { BudgetService } from '../core/services/budget.service';

@Component({
  selector: 'app-page',
  imports: [],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page {
  constructor(public budgetService: BudgetService) {}
}
