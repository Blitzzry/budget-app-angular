export interface Category {
  id: string;
  name: string;
  percentage: number;
  isLocked: boolean;
  assignedAmount?: number; // Para que muestre cuánta plata es en pesos
}