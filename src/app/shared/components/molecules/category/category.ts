import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Icon } from '../../atoms/icon/icon';
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
export class Category implements OnInit, OnChanges {
  constructor(public budgetService: BudgetService) { }
  @Input() iconName: 'personal' | 'house' | 'health' | 'heart' | 'savings' | 'pencil-square' | 'lock' | 'arrow-up-circle' | 'arrow-down-circle' | 'plus' | 'shopping-cart' | 'food' | 'transport' | 'entertainment' | 'pencil' | 'trash' = 'shopping-cart';
  @Input() categoryName!: string;
  @Input() percentage!: number;
  @Input() isLocked: boolean = false;
  @Input() assignedAmount: number = 0;
  @Input() id!: string | number;
  @Input() totalBalance!: number;
  @Output() remove = new EventEmitter<string | number>();
  @Output() lock = new EventEmitter<string | number>();
  @Output() edit = new EventEmitter<{ id: string | number; category: CategoryInterface }>();
  @Output() name = new EventEmitter<string>();
  formatter = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 2 });
  displayAssignedValue: string = '';
  displayPercentageValue: string = '';
  total: number = 0;
  editing: boolean = false;
  locked: boolean = false;
  editedCategory: CategoryInterface = {
    id: 0,
    name: this.categoryName,
    percentage: this.percentage,
    isLocked: false,
    assignedAmount: this.assignedAmount,
    iconName: 'shopping-cart'
  };

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const total = this.budgetService.totalBalance();

    if (input.id === 'percentage') {
      const cleanString = input.value.replace(/[^\d,.]/g, '')
      input.value = cleanString;
      let newPercentage = Number(cleanString.replace(/\./g, '').replace(',', '.'));
      if (newPercentage > 100) {
        newPercentage = 100
      };
      const newAmount = (newPercentage / 100) * total;
      this.percentage = newPercentage;
      this.assignedAmount = newAmount;
      this.editedCategory.percentage = newPercentage;
      this.editedCategory.assignedAmount = newAmount;
      this.displayPercentageValue = this.formatter.format(newPercentage);
      this.displayAssignedValue = this.formatter.format(newAmount);
    }

    if (input.id === 'assignedAmount') {
      const cleanString = input.value.replace(/[^\d,.]/g, '')
      input.value = cleanString;
      let newAmount = Number(cleanString.replace(/\./g, '').replace(',', '.'));
      if (newAmount > total) {
        newAmount = total
      };
      const newPercentage = total === 0 ? 0 : (newAmount / total) * 100;
      this.assignedAmount = newAmount;
      this.percentage = newPercentage;
      this.editedCategory.assignedAmount = newAmount;
      this.editedCategory.percentage = newPercentage;
      this.displayAssignedValue = this.formatter.format(newAmount);
      this.displayPercentageValue = this.formatter.format(newPercentage);
    }
  }

  inputStyle() {
    this.editing = !this.editing;
    if (this.editing) {
      this.displayPercentageValue = this.formatter.format(this.percentage);
      this.displayAssignedValue = this.formatter.format(this.assignedAmount);
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
  ngOnChanges(changes: SimpleChanges) {
    if (this.editing) {
      if (changes['percentage']) {
        this.assignedAmount = this.percentage / 100 * this.budgetService.totalBalance();
        this.editedCategory.percentage = this.percentage;
        this.editedCategory.assignedAmount = this.assignedAmount;
        this.displayPercentageValue = this.formatter.format(this.percentage);
        this.displayAssignedValue = this.formatter.format(this.assignedAmount);
      }
      if (changes['assignedAmount']) {
        this.editedCategory.assignedAmount = this.assignedAmount;
        this.displayAssignedValue = this.formatter.format(this.assignedAmount);
      }
    }
  }
}