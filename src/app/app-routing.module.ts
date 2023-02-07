import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMainItemComponent } from './add-main-item/add-main-item.component';
import { AddSubItemComponent } from './add-sub-item/add-sub-item.component';
import { CreateDealsComponent } from './create-deals/create-deals.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrderingComponent } from './ordering/ordering.component';
import { ReportComponent } from './report/report.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: 'login' },
  // { path: 'home', component: HomeComponent},
  { path: 'home', 
    component: HomeComponent, canActivate: [AuthGuard], 
    children:[
      { path: 'ordering', component: OrderingComponent, canActivate: [AuthGuard]},
      { path: 'addMainItem',component: AddMainItemComponent, canActivate: [AuthGuard]},
      { path: 'addSubItem',component: AddSubItemComponent, canActivate: [AuthGuard]},
      { path: 'createDeals', component: CreateDealsComponent, canActivate: [AuthGuard] },
      { path: 'createUser', component: UserComponent, canActivate: [AuthGuard] },
      { path: 'report', component: ReportComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: '', component: LoginComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
