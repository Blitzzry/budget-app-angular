import { Injectable, signal } from '@angular/core';
import { CategoryInterface } from '../models/category.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  uiConfig = signal<any>(null);
  constructor(private http: HttpClient) {
    this.testAlgorithm();
  }

  loadJson() {
    this.http.get('/data/budget.json').subscribe(data => {
      this.uiConfig.set(data);
    });
  }

  categories: CategoryInterface[] = [];

  get totalAssigned(): number {
    return this.categories.reduce((acc, cat) => acc + (cat.assignedAmount || 0), 0);
  }
  customerName: string = 'Anny Sharidt';
  totalIncome: number = 0;
  totalExpenses: number = 0;
  monthlyDifference: number = 0;
  totalBalanceMock: number = 1228344;
  get mockCategories(): CategoryInterface[] {
  return [
    { id: crypto.randomUUID(), name: 'Shopping', percentage: 40, isLocked: false, iconName: 'shopping-cart' as const },
    { id: crypto.randomUUID(), name: 'Food', percentage: 10, isLocked: false, iconName: 'food' as const },
    { id: crypto.randomUUID(), name: 'Transport', percentage: 20, isLocked: false, iconName: 'transport' as const },
    { id: crypto.randomUUID(), name: 'Entertainment', percentage: 30, isLocked: false, iconName: 'entertainment' as const },
  ].map(cat => ({
    ...cat,
    assignedAmount: this.totalBalanceMock * (cat.percentage / 100)
  }));
}
  categoryExample: CategoryInterface = { id: crypto.randomUUID(), name: 'Entertainment', percentage: 0, isLocked: false, assignedAmount: 0, iconName: 'entertainment' };

  addCategory(category: CategoryInterface) {
    this.mockCategories.push(this.categoryExample);
  }

  get freePercentage(): number {
    return this.categories
      .filter(cat => !cat.isLocked)
      .reduce((acc, cat) => acc + cat.percentage, 0);
    }
    
    testAlgorithm() {
    

    const distributeBudget = (categories: CategoryInterface[], amountToDistribute: number): CategoryInterface[] => {
        for (let category of categories) {
          if (!category.isLocked) {
            category.assignedAmount += this.freePercentage == 0 ? 0 : (category.percentage / this.freePercentage) * amountToDistribute;
          }
        }
        return categories;
    }
    const resultado = distributeBudget(this.mockCategories, 1000); 
    
    console.table(resultado);
  }
}