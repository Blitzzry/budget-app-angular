import { Component, EventEmitter, Input, input, Output, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { BudgetService } from '../../../../core/services/budget.service';
import { Icon } from '../../atoms/icon/icon';

@Component({
  selector: 'app-topbar',
  imports: [
    Icon
  ],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {
  constructor(public budgetService: BudgetService) {}
  @Input() isUserLogged: boolean = false
  @Input() userName?: string = ''
  @Output() loginClick = new EventEmitter<void>();
  @Output() signUpClick = new EventEmitter<void>();
  @Output() signOutClick = new EventEmitter<void>();

}
