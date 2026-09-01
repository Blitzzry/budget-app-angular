import { Component, signal, computed } from '@angular/core';
import { BudgetService } from '../../../../core/services/budget.service';
import { CategoryInterface } from '../../../../core/models/category.model';
import { Icon } from '../../atoms/icon/icon';
import { AuthService } from '../../../../core/services/auth.service';


@Component({
  selector: 'app-preset-card',
  imports: [Icon],
  templateUrl: './preset-card.html',
  styleUrl: './preset-card.css',
})
export class PresetCard {
  constructor(public budgetService: BudgetService, public authService: AuthService) {
  }
  presetList = computed (() => {
    return this.budgetService.userPresets()
  })

  applyPreset(savedPreset: CategoryInterface[]) {
    console.log(savedPreset)
    this.budgetService.applyPreset(savedPreset);
  }
}
