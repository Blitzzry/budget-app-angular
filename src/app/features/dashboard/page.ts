import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../core/services/budget.service';
import { TotalBalance } from '../../shared/components/molecules/total-balance/total-balance';
import { CategoryCard } from '../../shared/components/organisms/category-card/category-card';
import { PresetCard } from '../../shared/components/molecules/preset-card/preset-card';
import { Topbar } from '../../shared/components/molecules/topbar/topbar';
import { LogInForm } from '../../shared/components/organisms/auth/log-in-form/log-in-form';
import { SignUpForm } from '../../shared/components/organisms/auth/sign-up-form/sign-up-form';
import { App } from '../../app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page',
  imports: [TotalBalance,
    CategoryCard,
    PresetCard,
    Topbar,
    LogInForm,
    SignUpForm
  ],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page implements OnInit {
  constructor(public budgetService: BudgetService, private router: Router) {}
  totalBalance: number = 0;
  goToSignUp() {
    this.router.navigate(["/signUp"])
  }
  goToLogin() {
    this.router.navigate(["/logIn"])
  }
  
  ngOnInit() {
    this.totalBalance = this.budgetService.totalBalance();
  }
  openModal() {

  }
}