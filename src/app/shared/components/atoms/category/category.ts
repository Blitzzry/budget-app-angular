import { Component, Input } from '@angular/core';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-category',
  imports: [Icon],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {
  constructor() {}
  @Input() iconName: 'shopping-cart' | 'food' | 'transport' | 'entertainment' = 'shopping-cart';
  @Input() categoryName!: string;
}
