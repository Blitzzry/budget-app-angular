import { Component, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-sign-up-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-up-form.html',
  styleUrl: './sign-up-form.css',
})
export class SignUpForm {
  constructor(public authService: AuthService) { }
  @Input() userRegistered: boolean = false;
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = "";
  terms: boolean = false;
  signUp(email: string, password: string, confirmPassword: string, name: string, terms: boolean) {
    if (password == confirmPassword && terms == true) {
      this.authService.signUp(name, email, password)
    } else {
      throw console.error();
    }
  }
  signIn() {
  }
}
