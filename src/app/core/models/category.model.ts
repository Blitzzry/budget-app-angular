export interface category {
    id: string;
    name: string;
    percentage: number;
    isLocked: boolean;
    assignedAmount?: number;
    totalAmount?: number;
}

export interface distributedCategory {
    id: string;
    percentage: number;
    totalAmount?: number;
    assignedAmount: number;
}