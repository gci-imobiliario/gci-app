import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../layout/public/login/login.component';
import { SidenavComponent } from '../layout/layouts/sidenav/sidenav.component';
import { DashBoardComponent } from '../layout/security/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'line',
    component: SidenavComponent,
    children: [
      { path: 'dashboard', component: DashBoardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
