import { computed, effect, Injectable, signal } from '@angular/core';
import { CategoryInterface, presetCategoryInterface } from '../models/category.model';
import { AuthService } from './auth.service';
import { CategoriesRepository } from './categories-repository.service';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  constructor(private authService: AuthService, private catsRep: CategoriesRepository, private supabaseService: SupabaseService) {
    effect(() => {
      if (this.authService.userIsLoggedIn() == false) {
        this.categories.set(this.publicCats)
        this.userPresets.set(this.publicPreset)
      } else {
        this.catsRep.getAllPresets().then((savedArrPresets) => {
          savedArrPresets.map((savedPreset) => {
            console.log(savedPreset)
            this.userPresets.update(presets => [...presets, savedPreset])
          })
        })
        this.catsRep.getAllCats().then((categories) => {
          if (categories.length !== 0) {
            this.categories.set(categories)
            this.categories.update(cats =>
              cats.map(cat => ({
                ...cat,
                assignedAmount: (cat.percentage / 100) * this.totalBalance()
              })));
          } else {
            Promise.all(this.publicCats.map(cat => {
              cat.assignedAmount = (cat.percentage / 100) * this.totalBalance(),
                this.catsRep.create(cat)
              return cat
            }))
              .then((createdCats) => {
                this.categories.set(createdCats)
              })
          }
        });
      }
    })
  }

  monthlyDifference: number = 0;
  windowWidth = signal<number>(window.innerWidth);
  userPresets = signal<presetCategoryInterface[]>([]);
  categories = signal<CategoryInterface[]>([])
  totalBalance = signal<number>(1);
  uiConfig = signal<any>(null);

  uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
  unlockedCatGetter = computed(() => {
    const unlockedCats = this.categories().filter(cat => cat.isLocked == false)
    return unlockedCats
  })

  publicPreset: presetCategoryInterface[] = [
    {
      preset_id: '1',
      preset_name: 'Presupuesto Básico',
      categories: [
        { id: 1, name: 'Ahorro', percentage: 20, isLocked: false, assignedAmount: 0, iconName: 'savings' as const },
        { id: 2, name: 'Emergencia', percentage: 10, isLocked: false, assignedAmount: 0, iconName: 'health' as const },
        { id: 3, name: 'Gastos Hogar', percentage: 25, isLocked: false, assignedAmount: 0, iconName: 'house' as const },
        { id: 4, name: 'Transporte', percentage: 15, isLocked: false, assignedAmount: 0, iconName: 'transport' as const },
        { id: 5, name: 'Gustos propios', percentage: 30, isLocked: false, assignedAmount: 0, iconName: 'entertainment' as const }
      ]
    }
  ]
  publicCats: CategoryInterface[] = ([
    { id: 1, name: 'Ahorro', percentage: 20, isLocked: false, assignedAmount: 0, iconName: 'savings' as const },
    { id: 2, name: 'Emergencia', percentage: 10, isLocked: false, assignedAmount: 0, iconName: 'health' as const },
    { id: 3, name: 'Gastos Hogar', percentage: 25, isLocked: false, assignedAmount: 0, iconName: 'house' as const },
    { id: 4, name: 'Transporte', percentage: 15, isLocked: false, assignedAmount: 0, iconName: 'transport' as const },
    { id: 5, name: 'Gustos propios', percentage: 30, isLocked: false, assignedAmount: 0, iconName: 'entertainment' as const }
  ]);

  windowResizer = computed(() => {
    return this.windowWidth.set(window.innerWidth)
  })

  totalAssigned = computed(() => {
    return this.categories()
      .reduce((acc, cat) => acc + (cat.assignedAmount || 0), 0);
  })

  totalPercentage = computed(() => {
    const result = Number(this.categories()
      .reduce((acc, cat) => acc - cat.percentage, 0).toFixed(2)) + 100
    return result
  })

  async distributePercentage(): Promise<void> {
    console.log(this.categories().length)
    const updatedCats = this.categories()
      .map(cat => {
        const updatedCategory = cat.isLocked === false ? {
          ...cat,
          percentage: cat.percentage + (this.totalPercentage() / this.unlockedCatGetter().length),
        } : cat;
        return updatedCategory;
      })
    this.categories.set(updatedCats.map(cat => {
      const updatedAmount = {
        ...cat,
        assignedAmount: (cat.percentage / 100) * this.totalBalance()
      }
      return updatedAmount
    }))
    const catsToUpload = updatedCats.filter(cats => this.uuidPattern.test(cats.id as string))
    Promise.all(catsToUpload.map(cat => this.catsRep.update({ ...cat }, cat.id as string)))
  }

  updateTotalAssigned(newTotal: number) {
    this.totalBalance.set(newTotal);
    this.categories.update(cats =>
      cats.map(cat => ({
        ...cat,
        assignedAmount: (cat.percentage / 100) * this.totalBalance()
      }))
    );
  }

  applyPreset(savedPreset: CategoryInterface[]) {
    this.categories.set(savedPreset);
    this.updateTotalAssigned(this.totalBalance());
  }

  async savePreset(preset: CategoryInterface[]) {
    console.log(preset)
    const presetUUID: string = crypto.randomUUID()
    const newPreset: presetCategoryInterface = {preset_id: presetUUID,
      preset_name: `Preset ${this.userPresets().length + 1}`,
      categories: preset
    }
    this.userPresets.update(presets => [...presets, newPreset])
    await this.catsRep.createPreset(presetUUID, `Preset ${this.userPresets().length + 1}`, preset)
  }

  async deletePreset(presetId: string) {
    console.log(presetId)
    await this.catsRep.deletePreset(presetId)
    this.userPresets.update(presets => presets.filter(preset => preset.preset_id !== presetId));
  }

  async addCategory(category: CategoryInterface) {
    if (this.authService.userIsLoggedIn()) {
      if (this.uuidPattern.test(category.id as string)) {
        await this.catsRep.create(category);
      }
    }
    this.categories.update(cats => [...cats, category]);
    this.updateTotalAssigned(this.totalBalance());
  }
}