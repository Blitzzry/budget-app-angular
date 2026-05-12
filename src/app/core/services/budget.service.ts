export interface category {
    id: string;
    name: string;
    percentage: number;
    isLocked: boolean;
    assignedAmount?: number;
}

export interface distributedCategory {
    id: string;
    percentage: number;
}

export function distributeBudget(totalBudget: number, categories: category[]): category[] {
    let remainingBudget : number = 0;
    let combinedBudget : number = 0;
    let categoriesToDistribute: distributedCategory[] = [];
    for (let category of categories) {
         if (category.isLocked == false) {
            categoriesToDistribute.push({id: category.id, percentage: category.percentage});
            combinedBudget += category.assignedAmount ? category.assignedAmount : 0;
            }
        }
    categoriesToDistribute.sort((a, b) => b.percentage - a.percentage); 
    remainingBudget = totalBudget - combinedBudget;
}