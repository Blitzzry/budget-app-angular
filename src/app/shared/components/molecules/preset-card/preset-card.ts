import { Component } from '@angular/core';
import { BudgetService } from '../../../../core/services/budget.service';
import { presetCategoryInterface } from '../../../../core/models/category.model';
import { CategoryInterface } from '../../../../core/models/category.model';
import { Icon } from '../../atoms/icon/icon';

@Component({
  selector: 'app-preset-card',
  imports: [Icon],
  templateUrl: './preset-card.html',
  styleUrl: './preset-card.css',
})
export class PresetCard {
  constructor(public budgetService: BudgetService) {}
  examplePresets: presetCategoryInterface[] = [];
  preset: CategoryInterface[] = [];
    applyPreset(preset: CategoryInterface[]) {
      console.log(this.budgetService.categories());
    this.budgetService.applyPreset(preset);
  }
    ngOnInit(): void {
    this.examplePresets = this.budgetService.userCategories;
  }
}
