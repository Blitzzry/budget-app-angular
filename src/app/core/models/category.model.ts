export interface category {
    id: string;
    name: string;
    percentage: number;
    isLocked: boolean;
    assignedAmount: number;
    totalAmount?: number;
}