import { Route } from '@angular/router';
import { LoginComponent } from '@virteex/identity-ui/lib/pages/login/login.component';
import { RegisterComponent } from '@virteex/identity-ui/lib/pages/register/register.component';
import { ForgotPasswordComponent } from '@virteex/identity-ui/lib/pages/forgot-password/forgot-password.component';

export const authRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
