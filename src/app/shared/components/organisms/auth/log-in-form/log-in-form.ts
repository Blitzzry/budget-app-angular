import { Component, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../../core/services/auth.service';
import { CategoriesRepository } from '../../../../../core/services/categories-repository.service';
import { BudgetService } from '../../../../../core/services/budget.service';

@Component({
  selector: 'app-log-in-form',
  imports: [FormsModule, RouterLink,],
  templateUrl: './log-in-form.html',
  styleUrl: './log-in-form.css',
})
export class LogInForm {
  constructor(public authService: AuthService, private router: Router, private categoriesRepository: CategoriesRepository, private bugdetService: BudgetService) { }
  @Input() userRegistered: boolean = false;
  rememberMe: boolean = false;
  name: string = '';
  email: string = '';
  incInfo = signal<boolean>(false)
  password: string = '';
  confirmPassword: string = "";
  async logIn(email: string, password: string) {
    try {
      await this.authService.signIn(email, password)
      this.router.navigate(['']) 
    } catch (error) {
      this.incInfo.set(true)
    }
  }
}
