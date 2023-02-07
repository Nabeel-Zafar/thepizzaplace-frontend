import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MainItemService } from './../services/main-item.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {MatTableDataSource} from '@angular/material/table';
import { SnackbarService } from '../services/snackbar.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  // symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Pizza', weight: 1.0079},
  {position: 2, name: 'Burgers', weight: 4.0026},
  {position: 3, name: 'Beverages', weight: 6.941},
];

@Component({
  selector: 'app-add-main-item',
  templateUrl: './add-main-item.component.html',
  styleUrls: ['./add-main-item.component.css']
})
export class AddMainItemComponent implements OnInit {

  mainItemForm: FormGroup;
  submitted = false;
  displayedColumns: string[] = ['position', 'name', 'weight'];
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  AllMainItems: any;
  editedMainItemID: any;
  
  mainItemDisabled : boolean = false

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private mainItemService: MainItemService,
    private snackbar: SnackbarService
  ) {
    this.mainForm();
   }

  ngOnInit(): void {
    this.readMainItems();
  }

  mainForm() {
    this.mainItemForm = this.fb.group({
      mainItemName: [''],
    })
  }

  

  onSubmitMainItemForm() {
    console.log('this.mainItemForm',this.mainItemForm)
    this.submitted = true;
    if (!this.mainItemForm.value.mainItemName) {
      this.snackbar.open("Please Add Compulsory Details!",'error')
    } else {
      console.log('this.mainItemForm.value',this.mainItemForm.value)
      this.mainItemService.createMainItem(this.mainItemForm.value).subscribe(
        (res) => {
          this.snackbar.open("Main Item successfully created!",'success')
          this.mainItemForm.reset()
          window.location.reload()
        }, (error) => {
          console.log(error);
        });
    }
  }

  readMainItems(){
    this.mainItemService.getMainItem().subscribe((data) => {
     this.AllMainItems = data;
     console.log('this.AllMainItems',this.AllMainItems)
    //  console.log('this.dataSource.data',this.dataSource.data)
     this.dataSource = new MatTableDataSource(this.AllMainItems);
    //  this.dataSource.paginator = this.paginator;
    //  console.log('this.dataSource',this.dataSource)
    //  console.log('this.AllUsers',this.AllUsers)

    })   

  }


  onEdit(){
    
    if (!this.mainItemForm.value.mainItemName) {
      this.snackbar.open("Please Add Compulsory Details!",'error')
    }
    else{
      this.mainItemService.updateMainItem(this.editedMainItemID,{
        mainItemName:this.mainItemForm.value.mainItemName,
    }).subscribe((res)=>{
      this.snackbar.open("Updated Successfully",'success')
      window.location.reload()
    });
    this.mainItemForm.reset();
    this.mainItemDisabled = false
    }
    
  }

  onCancelEdit(){
    this.mainItemDisabled = false
    this.mainItemForm.reset()
  }

  edit(data){
    console.log('data',data)
    this.editedMainItemID = data._id
    this.mainItemForm.patchValue({
      mainItemName: data.mainItemName,
    });
    this.mainItemDisabled = true
  }

}
