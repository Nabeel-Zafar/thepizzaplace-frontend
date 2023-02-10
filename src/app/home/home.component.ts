import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  userStatus: any;
  title = 'resturant-management-frontend';
  constructor(private auth: AuthService, private router: Router) {
    
   }
   mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  ngOnInit(): void {
    this.userStatus = JSON.parse(localStorage.getItem('access_token') || '{}' )
    // console.log('userStatus',this.userStatus.status.IsAdmin)
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
