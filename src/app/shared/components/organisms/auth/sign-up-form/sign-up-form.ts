import { Component, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-up-form.html',
  styleUrl: './sign-up-form.css',
})
export class SignUpForm {
  @Input() userRegistered: boolean = false;
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = "";
  terms: boolean = false;
  signUp() {
  }
  signIn() {
  }
}
