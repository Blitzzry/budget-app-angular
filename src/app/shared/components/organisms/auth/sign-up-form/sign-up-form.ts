import { Component, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-sign-up-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-up-form.html',
  styleUrl: './sign-up-form.css',
})
export class SignUpForm {
  constructor(public authService: AuthService, private router: Router) { }
  @Input() userRegistered: boolean = false;
  name: string = '';
  email: string = '';
  password: string = '';
  passwInc: boolean = false

  confirmPassword: string = "";
  terms: boolean = false;
  async signUp(email: string, password: string, confirmPassword: string, name: string, terms: boolean) {
    try {
      if (password == confirmPassword) {
        await this.authService.signUp(name, email, password)
        this.router.navigate([''])
      } else {
        this.passwInc = true
      }
    } catch (error) {
      console.log(error)
    }
  }
}
