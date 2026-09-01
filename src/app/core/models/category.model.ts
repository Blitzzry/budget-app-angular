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
    preset_id: string;
    preset_name: string;
    categories: CategoryInterface[];
}

export interface CategoryRow {
  id: string;
  user_id: string;
  name: string;
  percentage: number;
  assigned_amount: number;
  locked: boolean;
  icon_name: CategoryInterface['iconName'];
  created_at: string;
}