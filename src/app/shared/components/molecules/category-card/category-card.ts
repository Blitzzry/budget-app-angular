import { Component } from '@angular/core';
import { Icon } from '../../atoms/icon/icon';
import { Category } from '../../atoms/category/category';

@Component({
  selector: 'app-category-card',
  imports: [Icon, Category],
  templateUrl: './category-card.html',
  styleUrl: './category-card.css',
})
export class CategoryCard {
  constructor() {}
  exampleCategories : { name: string, icon: 'shopping-cart' | 'food' | 'transport' | 'entertainment' }[]= [
    { name: 'Shopping', icon: 'shopping-cart' },
    { name: 'Food', icon: 'food' },
    { name: 'Transport', icon: 'transport' },
    { name: 'Entertainment', icon: 'entertainment' },
  ];
}
