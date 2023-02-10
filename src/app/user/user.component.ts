import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  SubItemname:string;
  price:number,
}

interface Food{
  value: string;
  viewValue: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Pizza', SubItemname:'Pizza Place Special',price:700,weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Burgers', SubItemname:'Zinger Burger',price:200, weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Beverages', SubItemname:'Pepsi', price:40, weight: 6.941, symbol: 'Li'},
];


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name','SubItemname','price' ,'weight', 'symbol'];
    dataSource = new MatTableDataSource<PeriodicElement>([]);
    // dataSource = ELEMENT_DATA;
    myForm:FormGroup
    allUsers:any;
    userDisabled : boolean = false
    IsAdmin: any;
    selectedRole: any;
    editedUserID:any;
    foods: Food[] = [
      {value: 'Yes', viewValue: 'Yes'},
      {value: 'No', viewValue: 'No'}
    ]
      
    // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    ngAfterViewInit() {
      // this.dataSource.paginator = this.paginator;
    }

  constructor(public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackbar: SnackbarService) { }

  openDialog() {
    const dialogRef = this.dialog.open(AddNewUserComponent);
    

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  
  ngOnInit(): void {
    this.userForm();
    this.getAllUsers();
  }

  userForm(){
    this.myForm = this.formBuilder.group({
      FullName: [''],
      EmailAdd: [''],
      Password: [''],
      Address: [''],
      ContactNo: [''],
      IsAdmin:['']
    })
  }

  submit() {
    // console.log('this.myForm.value',this.myForm.value)
    if (!this.myForm.value.FullName || !this.myForm.value.EmailAdd || !this.myForm.value.Password || !this.myForm.value.ContactNo || !this.myForm.value.Address) {
      this.snackbar.open("Please Add Compulsory Details!",'error')
    } 
    else {
      this.userService.createUser(
        {
          Address:this.myForm.value.Address,
          ContactNo:this.myForm.value.ContactNo,
          EmailAdd:this.myForm.value.EmailAdd,
          FullName:this.myForm.value.FullName,
          IsAdmin:this.selectedRole ,
          Password:this.myForm.value.Password,
        }
      ).subscribe(
        (res) => {
          this.snackbar.open("Successfully created!",'success')
          window.location.reload()
        }, (error) => {
          this.snackbar.open(error,'error')
        });
    }
  }
  onChange(event){
    this.selectedRole = event;
    // console.log('event',event)
  }
  getAllUsers(){
    this.userService.getAllUsers().subscribe((data) => {
     this.allUsers = data;
    //  console.log('this.allUsers',this.allUsers)
    //  console.log('this.dataSource.data',this.dataSource.data)
     this.dataSource = new MatTableDataSource(this.allUsers);
    //  this.dataSource.paginator = this.paginator;
    //  console.log('this.dataSource',this.dataSource)
    //  console.log('this.AllUsers',this.AllUsers)

    })   

  }

  edit(data){
    // console.log('data',data)
    this.editedUserID = data._id
    this.myForm.patchValue({
      FullName:  data.FullName,
      EmailAdd:  data.EmailAdd,
      Password:  data.Password,
      Address:   data.Address,
      ContactNo: data.ContactNo,
    });
    this.userDisabled = true
  }


  onEdit(){
    
    if (!this.myForm.value.Address ||
        !this.myForm.value.ContactNo ||
        !this.myForm.value.EmailAdd ||
        !this.myForm.value.FullName||
        !this.selectedRole) {
      this.snackbar.open("Please Add Compulsory Details!",'error')
    }
    else{
      this.userService.updateUser(this.editedUserID,{
          Address   :this.myForm.value.Address,
          ContactNo :this.myForm.value.ContactNo,
          EmailAdd  :this.myForm.value.EmailAdd,
          FullName  :this.myForm.value.FullName,
          IsAdmin   : this.selectedRole,
          Password  :this.myForm.value.Password,
    }).subscribe((res)=>{
      this.snackbar.open("Updated Successfully",'success') 
      window.location.reload()
    });
    this.myForm.reset();
    
    this.userDisabled = false
    }
    
  }

  onCancelEdit(){
    this.userDisabled = false
    this.myForm.reset()
  }

}
