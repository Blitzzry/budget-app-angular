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
      { id: 1, name: 'Shopping', percentage: 40, isLocked: false, assignedAmount: 0, iconName: 'shopping-cart' as const },
      { id: 2, name: 'Food', percentage: 10, isLocked: false, assignedAmount: 0, iconName: 'food' as const },
      { id: 3, name: 'Transport', percentage: 20, isLocked: false, assignedAmount: 0, iconName: 'transport' as const },
      { id: 4, name: 'Entertainment', percentage: 30, isLocked: false, assignedAmount: 0, iconName: 'entertainment' as const },
    ].map(cat => ({ ...cat, assignedAmount: (cat.percentage / 100) * this.totalBalanceMock }));
  }

categories: CategoryInterface[] = [...this.mockCategories];

  addCategory(category: CategoryInterface) {
    this.categories.push(category);
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