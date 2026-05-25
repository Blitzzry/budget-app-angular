import { Component, Input, OnInit } from '@angular/core';
import { BudgetService } from '../../../../core/services/budget.service';
import { DecimalPipe } from '@angular/common';
import { Icon } from '../../atoms/icon/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-total-balance',
  imports: [DecimalPipe, Icon, FormsModule],
  templateUrl: './total-balance.html',
  styleUrl: './total-balance.css',
})

export class TotalBalance implements OnInit {
  constructor(public budgetService: BudgetService) {}
  @Input() total!: number;
  @Input() percentageDiff!: number;
  ngOnInit() {
    this.budgetService.loadJson();
    this.budgetService.updateTotalBalance(this.total);
  }
}