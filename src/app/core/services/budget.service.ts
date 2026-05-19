import { Injectable, signal } from '@angular/core';
import { Category } from '../models/category.model';
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

  categories: Category[] = [];

  get totalAssigned(): number {
    return this.categories.reduce((acc, cat) => acc + (cat.assignedAmount || 0), 0);
  }
  customerName: string = 'Anny Sharidt';

  totalIncome: number = 0;
  totalExpenses: number = 0;
  monthlyDifference: number = 0;

  get freePercentage(): number {
    return this.categories
      .filter(cat => !cat.isLocked)
      .reduce((acc, cat) => acc + cat.percentage, 0);
  }
  testAlgorithm() {
    const mockCategories: Category[] = [
      { id: '1', name: 'Renta', percentage: 40, isLocked: false, assignedAmount: 400 },
      { id: '2', name: 'Comida', percentage: 10, isLocked: false, assignedAmount: 100 },
      { id: '3', name: 'Ahorro', percentage: 50, isLocked: true, assignedAmount: 500 }
    ];
    

    const distributeBudget = (categories: Category[], amountToDistribute: number): Category[] => {
        for (let category of categories) {
          if (!category.isLocked) {
            category.assignedAmount += this.freePercentage == 0 ? 0 : (category.percentage / this.freePercentage) * amountToDistribute;
          }
        }
        return categories;
    }
    const resultado = distributeBudget(mockCategories, 1000); 
    
    console.table(resultado);
  }
}