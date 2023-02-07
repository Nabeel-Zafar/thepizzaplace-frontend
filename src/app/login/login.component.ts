import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';
import { SnackbarService } from '../services/snackbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: any;
  public password: any;
  public error: string;
  
  loginSubscriber:Subscription


  loginForm = this.fb.group({
    username: [null],
    password: [null]
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private snackbar: SnackbarService) { }

  ngOnInit(): void {
    
    localStorage.setItem("token","JSON.stringify(res.user.token)")

  }

  ksubmit() {
    this.username = this.loginForm.value.username
    this.password = this.loginForm.value.password
    this.loginSubscriber = this.auth.login(this.username, this.password).subscribe((res : any)=>{
      console.log('res1',res)
      if(res && res.status){
        console.log('res2',res)
        localStorage.setItem("token",res.user.token)
        localStorage.setItem("userData",JSON.stringify(res.user))
      }else{
        this.snackbar.open("server error",'error')
      }
    });
    // this.loginSubscriber.unsubscribe()
  }

  // public submit() {
  //   if(!this.loginForm.value.username || !this.loginForm.value.password){
      
  //     this.snackbar.open("Please Add Compulsory Details!",'error')
  // }
  // else{
  //     let user = localStorage.setItem('userData',this.username)
  //     this.username = this.loginForm.value.username
  //     this.password = this.loginForm.value.password
  //     // this.auth.login(this.username, this.password).subscribe((res : any) => {
  //     //     console.log('this.AllSubItems',res)
  //     //    })   
  //     .subscribe(
        
  //       result => this.router.navigate(['home']),

  //       // err => this.error = 'Could not authenticate'
  //       err => this.snackbar.open("Error",'error')
  //     );
      
  //   }
  // }



  public submit() { 
    
    if(!this.loginForm.value.username || !this.loginForm.value.password){
      this.snackbar.open("Please Add Compulsory Details!",'error')
    }
    else{
      this.username = this.loginForm.value.username
    this.password = this.loginForm.value.password
    this.auth.login(this.username, this.password)
      .subscribe(
        result => {
          this.router.navigate(['home'])
          console.log('result',result)
        },
        // err => this.error = 'Could not authenticate'
        err => this.snackbar.open("Error",'error')
      );
    }
    
  }

  

}

