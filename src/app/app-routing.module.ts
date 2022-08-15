import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HelpComponent } from './pages/help/help.component';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './pages/_guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'landingpage',
  },
  {
    path: 'landingpage',
    component: NavBarComponent,
    canActivate: [AuthGuard],
    children: [
        {
          path: 'home',
          component: HomeComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'profile',
          component: ProfileComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'about',
          component: AboutComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'help',
          component: HelpComponent,
          canActivate: [AuthGuard]
        },

    ]
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
