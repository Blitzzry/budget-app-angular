import { Injectable } from '@angular/core';
import { category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  constructor() {
    this.testAlgorithm();
  }
  categories: category[] = [];

  get totalAssigned(): number {
    return this.categories.reduce((acc, cat) => acc + (cat.assignedAmount || 0), 0);
  }

  get freePercentage(): number {
    return this.categories
      .filter(cat => !cat.isLocked)
      .reduce((acc, cat) => acc + cat.percentage, 0);
  }
  testAlgorithm() {
    const mockCategories: category[] = [
      { id: '1', name: 'Renta', percentage: 40, isLocked: false, assignedAmount: 400 },
      { id: '2', name: 'Comida', percentage: 10, isLocked: false, assignedAmount: 100 },
      { id: '3', name: 'Ahorro', percentage: 50, isLocked: true, assignedAmount: 500 }
    ];
    

    const distributeBudget = (categories: category[], amountToDistribute: number): category[] => {
        for (let category of categories) {
          if (!category.isLocked) {
            category.assignedAmount += category.assignedAmount = (category.percentage / this.freePercentage) * amountToDistribute;
          }
        }
        return categories;
    }
    const resultado = distributeBudget(mockCategories, 1000); 
    
    console.table(resultado);
  }
}