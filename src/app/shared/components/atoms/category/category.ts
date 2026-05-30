import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Icon } from '../icon/icon';
import { BudgetService } from '../../../../core/services/budget.service';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryInterface } from '../../../../core/models/category.model';

@Component({
  selector: 'app-category',
  imports: [Icon, DecimalPipe, FormsModule],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category implements OnInit {
  constructor(public budgetService: BudgetService) { }
  @Input() iconName: 'personal' | 'house' | 'health' | 'heart' | 'savings' | 'pencil-square' | 'lock' | 'arrow-up-circle' | 'arrow-down-circle' | 'plus' | 'shopping-cart' | 'food' | 'transport' | 'entertainment' | 'pencil' | 'trash' = 'shopping-cart';
  @Input() categoryName!: string;
  @Input() percentage!: number;
  @Input() isLocked: boolean = false;
  @Input() assignedAmount: number = 0;
  @Input() id!: string | number;
  @Output() remove = new EventEmitter<string | number>();
  @Output() lock = new EventEmitter<string | number>();
  @Output() edit = new EventEmitter<{ id: string | number; category: CategoryInterface }>();
  @Output() name = new EventEmitter<string>();
  editing: boolean = false;
  locked: boolean = false;
  editedCategory: CategoryInterface = {
    id: 0,
    name: this.categoryName,
    percentage: this.percentage,
    isLocked: false,
    assignedAmount: 0,
    iconName: 'shopping-cart'
  };

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.style.width = input.value.length + 4 + 'ch';
  }

  toggleEdit() {
  this.editing = !this.editing;
  if (this.editing) {
    setTimeout(() => {
      document.querySelectorAll('.input').forEach((input: any) => {
        input.style.width = (input.value.length + 4 || 1) + 'ch';
      });
    }, 0);
  } else {
    this.edit.emit({ id: this.id, category: this.editedCategory });
  }
}

  deleteCategory() {
    this.remove.emit(this.id);
  }

  lockCategory() {
    this.isLocked = !this.isLocked;
    this.lock.emit(this.id);
  }
  ngOnInit(): void {
    this.editedCategory = {
      id: this.id,
      name: this.categoryName,
      percentage: this.percentage,
      isLocked: this.isLocked,
      assignedAmount: this.assignedAmount,
      iconName: this.iconName
    };
  }
}