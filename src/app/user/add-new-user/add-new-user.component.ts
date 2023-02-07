import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css']
})
export class AddNewUserComponent implements OnInit {

  myForm:FormGroup

  FullName: any;
  EmailAdd: any;
  Password: any;
  Address: any;
  ContactNo: any;
  FinalData: any;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      FullName: ['',Validators.required],
      EmailAdd: ['',Validators.required],
      Password: ['',Validators.required],
      Address: ['',Validators.required],
      ContactNo: ['',Validators.required],
    })
  }

  submit() {
    console.log('this.myForm.value',this.myForm.value)
    // if (!this.myForm.value.FullName || !this.myForm.value.EmailAdd || !this.myForm.value.Password || !this.myForm.value.ContactNo || !this.myForm.value.Address) {
    //   this.snackbar.open("Please Add Compulsory Details!",'error')
    // } 
    // else {
    //   this.userService.createEmployee(this.myForm.value).subscribe(
    //     (res) => {
    //       this.snackbar.open("Successfully created!",'success')
    //       window.location.reload()
    //     }, (error) => {
    //       this.snackbar.open(error,'error')
    //     });
    // }
  }


}
