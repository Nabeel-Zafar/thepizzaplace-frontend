import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';

import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { AddMainItemComponent } from './add-main-item/add-main-item.component';
import { AddSubItemComponent } from './add-sub-item/add-sub-item.component';
import { CreateDealsComponent } from './create-deals/create-deals.component';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { OrderingComponent } from './ordering/ordering.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { UserComponent } from './user/user.component';
import { AddNewUserComponent } from './user/add-new-user/add-new-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReportComponent } from './report/report.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ToastComponent } from './toast/toast.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { ExportAsModule } from 'ngx-export-as';
import {NgxPrintModule} from 'ngx-print';
import { PrintSlipDialogComponent } from './ordering/print-slip-dialog/print-slip-dialog.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    AddMainItemComponent,
    AddSubItemComponent,
    CreateDealsComponent,
    HomeComponent,
    LoginComponent,
    OrderingComponent,
    UserComponent,
    AddNewUserComponent,
    ReportComponent,
    ToastComponent,
    PrintSlipDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatExpansionModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    ExportAsModule,
    NgxPrintModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:() => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['localhost:4000'],
        disallowedRoutes:[]
      }
    })
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    AuthService,
    AuthGuard
 

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
