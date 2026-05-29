export interface CategoryInterface {
    id: string | number;
    name: string;
    percentage: number;
    isLocked: boolean;
    assignedAmount: number;
    totalAmount?: number;
    iconName: 'personal' | 'house' | 'health' | 'heart' | 'savings' | 'pencil-square' | 'lock' | 'arrow-up-circle' | 'arrow-down-circle' | 'plus' | 'shopping-cart' | 'food' | 'transport' | 'entertainment' | 'pencil' | 'trash';
}

export interface presetCategoryInterface {
    id: string | number;
    name: string;
    categories: CategoryInterface[];
}