export interface Category {
    id: string;
    name: string;
    percentage: number;
    isLocked: boolean;
    assignedAmount: number;
    totalAmount?: number;
}