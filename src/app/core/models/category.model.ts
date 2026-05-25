export interface CategoryInterface {
    id: string | number;
    name: string;
    percentage: number;
    isLocked: boolean;
    assignedAmount: number;
    totalAmount?: number;
    iconName: 'shopping-cart' | 'food' | 'transport' | 'entertainment';
}