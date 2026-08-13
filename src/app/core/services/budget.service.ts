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
        this.userCategories.set(this.publicUserCategories)
      } else {
        this.catsRep.getAll().then((categories) => {
          if (categories.length !== 0) {
            this.categories.set(categories)
            this.categories.update(cats =>
              cats.map(cat => ({
                ...cat,
                assignedAmount: (cat.percentage / 100) * this.totalBalance()
              })));
              this.userCategories.set(this.publicUserCategories)
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
  userCategories = signal<presetCategoryInterface[]>([]);
  categories = signal<CategoryInterface[]>([])
  totalBalance = signal<number>(1);
  uiConfig = signal<any>(null);
  uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
  unlockedCatGetter = computed(() => {
     const unlockedCats = this.categories().filter(cat => cat.isLocked == false)
     return unlockedCats
    })

  publicUserCategories: presetCategoryInterface[] = [
    {
      id: 1,
      name: 'Quincena del 15',
      categories: [
        { id: 1, name: 'Ahorro', percentage: 15, isLocked: false, assignedAmount: 0, iconName: 'savings' as const },
        { id: 2, name: 'Emergencia', percentage: 8, isLocked: false, assignedAmount: 0, iconName: 'health' as const },
        { id: 3, name: 'Gastos Hogar', percentage: 25, isLocked: false, assignedAmount: 0, iconName: 'house' as const },
        { id: 4, name: 'Transporte', percentage: 12, isLocked: false, assignedAmount: 0, iconName: 'transport' as const },
        { id: 5, name: 'Citas Pareja', percentage: 17, isLocked: false, assignedAmount: 0, iconName: 'personal' as const },
        { id: 6, name: 'Gustos propios', percentage: 23, isLocked: false, assignedAmount: 0, iconName: 'entertainment' as const }
      ]
    },
    {
      id: 2,
      name: 'Quincena del 30',
      categories: [
        { id: 1, name: 'Ahorro', percentage: 23, isLocked: false, assignedAmount: 0, iconName: 'savings' as const },
        { id: 2, name: 'Emergencia', percentage: 10, isLocked: false, assignedAmount: 0, iconName: 'health' as const },
        { id: 3, name: 'Gastos Hogar', percentage: 17, isLocked: false, assignedAmount: 0, iconName: 'house' as const },
        { id: 4, name: 'Transporte', percentage: 9, isLocked: false, assignedAmount: 0, iconName: 'transport' as const },
        { id: 5, name: 'Citas Pareja', percentage: 20, isLocked: false, assignedAmount: 0, iconName: 'personal' as const },
        { id: 6, name: 'Gustos propios', percentage: 21, isLocked: false, assignedAmount: 0, iconName: 'entertainment' as const }
      ]
    },
    {
      id: 3,
      name: 'Presupuesto Básico',
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
    const updatedCats = this.categories()
      .map(cat => {
        const updatedCategory = cat.isLocked === false ? {
          ...cat,
          percentage: cat.percentage + (this.totalPercentage() / this.unlockedCatGetter().length),
          assignedAmount: (cat.percentage / 100) * this.totalBalance()
        } : cat;
        return updatedCategory;
      })
    this.categories.set(updatedCats)
    const catsToUpload = updatedCats.filter(cats => this.uuidPattern.test(cats.id as string))
    Promise.all(catsToUpload.map(cat => this.catsRep.update({...cat}, cat.id as string)))
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

  applyPreset(preset: CategoryInterface[]) {
    this.categories.set(preset);
    this.updateTotalAssigned(this.totalBalance());
  }

  async addCategory(category: CategoryInterface) {
    if (this.authService.userIsLoggedIn()) {
      if (this.uuidPattern.test(category.id as string)) {
        console.log(category)
        await this.catsRep.create( category );
      }
    }
    this.categories.update(cats => [...cats, category]);
    this.updateTotalAssigned(this.totalBalance());
  }

}