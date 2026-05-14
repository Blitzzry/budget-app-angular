import { Injectable } from '@angular/core';
import { category, distributedCategory } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  constructor() {
    this.testAlgorithm();
  }

  testAlgorithm() {
    const mockCategories: category[] = [
      { id: '1', name: 'Renta', percentage: 40, isLocked: false, assignedAmount: 400 },
      { id: '2', name: 'Comida', percentage: 10, isLocked: false, assignedAmount: 100 },
      { id: '3', name: 'Ahorro', percentage: 50, isLocked: true, assignedAmount: 500 }
    ];

    const distributeBudget = (totalBudget: number, categories: category[], amountToDistribute: number): category[] => {
        let percentageAvailable : number = 0;
        let categoriesToDistribute: distributedCategory[] = [];
        for (let category of categories) {
             if (category.isLocked == false) {
                percentageAvailable += category.percentage;
                categoriesToDistribute.push({id: category.id, percentage: category.percentage, assignedAmount: category.assignedAmount ? category.assignedAmount : 0});
                }
            }
        categoriesToDistribute.sort((a, b) => b.percentage - a.percentage); 
        for (let category of categoriesToDistribute) {
          category.percentage = category.percentage / percentageAvailable;
            for (let categoryy of categories) {
            // necesita buscar el id de cada producto y cambiar el categoryy.assignedAmount = por ese valor multiplicado por el category.percentage
            }
        }
        // creo que seria mejor reemplazar los valores directamente de la categoria original, asi no tengo que hacer un nuevo array y luego buscar el id para cambiar el assignedAmount, ademas de que asi se mantiene el orden original de las categorias
    }
    const resultado = distributeBudget(1000, mockCategories, 50); 
    
    console.table(resultado);
  }
}