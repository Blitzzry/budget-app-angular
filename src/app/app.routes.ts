import { Routes } from '@angular/router';
import { Page } from './features/dashboard/page';
import { LogInForm } from './shared/components/organisms/auth/log-in-form/log-in-form';
import { SignUpForm } from './shared/components/organisms/auth/sign-up-form/sign-up-form';

export const routes: Routes = [
  { path: '', component: Page },
  { path: 'logIn', component: LogInForm },
  { path: 'signUp', component: SignUpForm }
];