export interface CategoryInterface {
    id: string;
    name: string;
    percentage: number;
    isLocked: boolean;
    assignedAmount: number;
    totalAmount?: number;
    iconName: 'shopping-cart' | 'food' | 'transport' | 'entertainment';
}