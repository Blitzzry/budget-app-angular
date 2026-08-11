import { Component } from '@angular/core';
import { BudgetService } from '../../../../core/services/budget.service';
import { CategoryInterface } from '../../../../core/models/category.model';
import { Icon } from '../../atoms/icon/icon';

@Component({
  selector: 'app-preset-card',
  imports: [Icon],
  templateUrl: './preset-card.html',
  styleUrl: './preset-card.css',
})
export class PresetCard {
  constructor(public budgetService: BudgetService) { }
  preset: CategoryInterface[] = [];
  applyPreset(preset: CategoryInterface[]) {
    this.budgetService.applyPreset(preset);
  }
}
