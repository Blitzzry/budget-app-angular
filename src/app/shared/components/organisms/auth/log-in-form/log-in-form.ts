import { Component, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-log-in-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './log-in-form.html',
  styleUrl: './log-in-form.css',
})
export class LogInForm {
  @Input() userRegistered: boolean = false;
  @Output() closeWindow: any;
  rememberMe: boolean = false;
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = "";
  signUp() {
  }
  logIn() {
  }
}
