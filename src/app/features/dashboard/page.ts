import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../core/services/budget.service';
import { TotalBalance } from '../../shared/components/molecules/total-balance/total-balance';
import { CategoryCard } from '../../shared/components/organisms/category-card/category-card';
import { PresetCard } from '../../shared/components/molecules/preset-card/preset-card';
import { Topbar } from '../../shared/components/molecules/topbar/topbar';
import { LogInForm } from '../../shared/components/organisms/auth/log-in-form/log-in-form';
import { SignUpForm } from '../../shared/components/organisms/auth/sign-up-form/sign-up-form';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-page',
  imports: [TotalBalance,
    CategoryCard,
    PresetCard,
    Topbar
  ],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page implements OnInit {
  constructor(public budgetService: BudgetService, private router: Router, public authService: AuthService) {
  }

  totalBalance: number = 0;
  goToSignUp() {
    this.router.navigate(["/signUp"])
  }
  goToLogin() {
    this.router.navigate(["/logIn"])
  }
  async signOutAction() {
    await this.authService.signOut()
  }
  
  ngOnInit() {
    this.totalBalance = this.budgetService.totalBalance();
  }
  openModal() {

  }
}