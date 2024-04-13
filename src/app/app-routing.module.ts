import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth.guard';
import { NotFound404Component } from './not-found404/not-found404.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
<<<<<<< HEAD
import { LeadsComponent } from './leads/leads.component';
=======
import { ProfileComponent } from './profile/profile.component';
>>>>>>> 64c7a7ef55f832c777c711517803b91fdf716350

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      authOnly: true,
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
    },
      {
          path: 'leads',
          component: LeadsComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent
  },
  {
    path: '',
    component: NotFound404Component
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
