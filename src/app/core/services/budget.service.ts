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
  totalBalanceMock: number = 1;
  
  mockCategories: CategoryInterface[] = [
    { id: 1, name: 'Ahorro', percentage: 28.57, isLocked: false, assignedAmount: 0, iconName: 'savings' as const },
    { id: 2, name: 'Emergencia', percentage: 8.57, isLocked: false, assignedAmount: 0, iconName: 'health' as const },
    { id: 3, name: 'Novia', percentage: 17.14, isLocked: false, assignedAmount: 0, iconName: 'personal' as const },
    { id: 4, name: 'Gastos Hogar', percentage: 20, isLocked: false, assignedAmount: 0, iconName: 'house' as const },
    { id: 5, name: 'Transporte', percentage: 8.57, isLocked: false, assignedAmount: 0, iconName: 'transport' as const },
    { id: 6, name: 'Gustos propios', percentage: 17.14, isLocked: false, assignedAmount: 0, iconName: 'entertainment' as const }
  ];
  
  updateTotalBalance(newTotal: number) {
    this.totalBalanceMock = newTotal;
    this.mockCategories.forEach(cat => {
      cat.assignedAmount = (cat.percentage / 100) * this.totalBalanceMock;
    });
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