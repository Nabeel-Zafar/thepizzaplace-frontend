import { Component, ViewChild } from '@angular/core';
import {HomeComponent} from './home/home.component';
// import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // @ViewChild('sidenav') sidenav: MatSidenav;
  // isExpanded = true;
  // showSubmenu: boolean = false;
  // isShowing = false;
  // showSubSubMenu: boolean = false;
  // title = 'resturant-management-frontend';

  // mouseenter() {
  //   if (!this.isExpanded) {
  //     this.isShowing = true;
  //   }
  // }

  // mouseleave() {
  //   if (!this.isExpanded) {
  //     this.isShowing = false;
  //   }
  // }
  
  getData(){
    
    return localStorage.getItem("userData")
       ;
  }
 
}
