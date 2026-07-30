import { computed, effect, Injectable, signal } from '@angular/core';
import { CategoryInterface, presetCategoryInterface } from '../models/category.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  uiConfig = signal<any>(null);

  constructor(private http: HttpClient) {
    this.testAlgorithm();
  }

  totalIncome: number = 0;
  totalExpenses: number = 0;
  monthlyDifference: number = 0;

  mockCategories: CategoryInterface[] = [
    { id: 1, name: 'Ahorro', percentage: 28.57, isLocked: false, assignedAmount: 0, iconName: 'savings' as const },
    { id: 2, name: 'Emergencia', percentage: 8.57, isLocked: false, assignedAmount: 0, iconName: 'health' as const },
    { id: 3, name: 'Novia', percentage: 17.14, isLocked: false, assignedAmount: 0, iconName: 'personal' as const },
    { id: 4, name: 'Gastos Hogar', percentage: 20, isLocked: false, assignedAmount: 0, iconName: 'house' as const },
    { id: 5, name: 'Transporte', percentage: 8.57, isLocked: false, assignedAmount: 0, iconName: 'transport' as const },
    { id: 6, name: 'Gustos propios', percentage: 17.14, isLocked: false, assignedAmount: 0, iconName: 'entertainment' as const }
  ];

  userCategories: presetCategoryInterface[] = [
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
  ];

  totalBalance = signal<number>(1);
  categories = signal<CategoryInterface[]>([
    { id: 1, name: 'Ahorro', percentage: 20, isLocked: false, assignedAmount: 0, iconName: 'savings' as const },
    { id: 2, name: 'Emergencia', percentage: 10, isLocked: false, assignedAmount: 0, iconName: 'health' as const },
    { id: 3, name: 'Gastos Hogar', percentage: 25, isLocked: false, assignedAmount: 0, iconName: 'house' as const },
    { id: 4, name: 'Transporte', percentage: 15, isLocked: false, assignedAmount: 0, iconName: 'transport' as const },
    { id: 5, name: 'Gustos propios', percentage: 30, isLocked: false, assignedAmount: 0, iconName: 'entertainment' as const }

  ]);

  get totalAssigned(): number {
    return this.categories()
      .reduce((acc, cat) => acc + (cat.assignedAmount || 0), 0);
  }

  get totalPercentage(): number {
    return Number(this.categories()
      .filter(cat => !cat.isLocked)
      .reduce((acc, cat) => acc - cat.percentage, 0).toFixed(2)) + 100;
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
    console.table(this.categories());
  }

  addCategory(category: CategoryInterface) {
    this.categories.update(cats => [...cats, category]);
    this.updateTotalAssigned(this.totalBalance());
  }

  testAlgorithm() {
    const distributeBudget = (categories: CategoryInterface[], amountToDistribute: number): CategoryInterface[] => {
      for (let category of categories) {
        if (!category.isLocked) {
          category.assignedAmount += this.totalPercentage == 0 ? 0 : (category.percentage / this.totalPercentage) * amountToDistribute;
        }
      }
      return categories;
    }
    const resultado = distributeBudget(this.mockCategories, 1000);
  }
}