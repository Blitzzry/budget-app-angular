import { Component, Input, OnInit } from '@angular/core';
import { BudgetService } from '../../../../core/services/budget.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-total-balance',
  imports: [DecimalPipe],
  templateUrl: './total-balance.html',
  styleUrl: './total-balance.css',
})

export class TotalBalance implements OnInit {
  constructor(public budgetService: BudgetService) {}
  @Input() total!: number;
  @Input() percentageDiff!: number;
  ngOnInit() {
    this.budgetService.loadJson();
  }
}