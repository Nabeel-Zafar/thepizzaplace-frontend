import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubItemService } from './../services/sub-item.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MainItemService } from '../services/main-item.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';

interface Food {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  // symbol: string;
  SubItemname:string;
  price:number,
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Pizza', SubItemname:'Pizza Place Special',price:700,weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Burgers', SubItemname:'Zinger Burger',price:200, weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Beverages', SubItemname:'Pepsi', price:40, weight: 6.941, symbol: 'Li'},
// ];

@Component({
  selector: 'app-add-sub-item',
  templateUrl: './add-sub-item.component.html',
  styleUrls: ['./add-sub-item.component.css']
})
export class AddSubItemComponent implements OnInit {

  selectedValue: string;
  subItemForm: FormGroup;
  submitted = false;
  AllMainItems: any;
  AllSubItems:any;
  selectedmainItem: any;
  subItemDisabled : boolean = false
  editedSubItemID : any
  editedMainItemName  : any
  editedMainItemID: any

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Pizza'},
    {value: 'pizza-1', viewValue: 'Burgers'},
    {value: 'tacos-2', viewValue: 'Beverages'},
  ];

  displayedColumns: string[] = ['position', 'name','SubItemname','price' ,'weight'];
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<PeriodicElement>([])

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private subItemService: SubItemService,
    private mainItemService: MainItemService,
    private snackbar: SnackbarService
  ) { 
    this.subForm();
  }

  ngOnInit(): void {
    this.readMainItems();
    this.readSubItems();
  }

 subForm() {
    this.subItemForm = this.fb.group({
      // mainItemName: [''],
      subItemName: [''],
      subItemPrice: [''],
    })

  }

  readMainItems(){
    this.mainItemService.getMainItem().subscribe((data) => {
     this.AllMainItems = data;
     console.log('this.AllMainItems',this.AllMainItems)
    //  console.log('this.dataSource.data',this.dataSource.data)
    //  this.dataSource = new MatTableDataSource(this.AllMainItems);
    //  this.dataSource.paginator = this.paginator;
    //  console.log('this.dataSource',this.dataSource)
    //  console.log('this.AllUsers',this.AllUsers)

    })   

  }

  onChange(id:any) {
    let mainItem = this.AllMainItems.filter(({_id}) => _id === id)
    
    console.log(mainItem[0]);
    this.selectedmainItem = mainItem[0]
    // this.departmentService.getDepartment(this.selectedLocation._id).subscribe((res:any) => {
    //   this.departments = res.data
    // })
    console.log('selectedmainItem',this.selectedmainItem)
  }

  onSubmitSubItemForm(){
    // console.log('this.subItemForm',this.subItemForm.value)
    if (!this.subItemForm.value.subItemName || !this.subItemForm.value.subItemPrice || !this.selectedmainItem) {
      this.snackbar.open("Please Add Compulsory Details!",'error')
    }else {
      // console.log('this.subItemForm.value',this.subItemForm.value)
      this.subItemService.createSubItem({
        mainItem:{ID : this.selectedmainItem._id , mainItemName :this.selectedmainItem.mainItemName},
        subItemName:this.subItemForm.value.subItemName,
        subItemPrice:this.subItemForm.value.subItemPrice
      }).subscribe(
        (res) => {
          this.snackbar.open("Main Item successfully created!",'success')
          this.subItemForm.reset()
          window.location.reload()
        }, (error) => {
          console.log(error);
        });
    }
  }

  readSubItems(){
    this.subItemService.getSubItem().subscribe((data) => {
     this.AllSubItems = data;
     console.log('this.AllSubItems',this.AllSubItems)
    //  console.log('this.dataSource.data',this.dataSource.data)
     this.dataSource = new MatTableDataSource(this.AllSubItems);
    //  this.dataSource.paginator = this.paginator;
    //  console.log('this.dataSource',this.dataSource)
    //  console.log('this.AllUsers',this.AllUsers)

    })   

  }

  onEdit(){
    
    if (!this.subItemForm.value.subItemName || !this.subItemForm.value.subItemPrice) {
      this.snackbar.open("Please Add Compulsory Details!",'error')
    }
    else{
      this.subItemService.updateSubItem(this.editedSubItemID,{
        mainItem:{ID :this.editedMainItemID  , mainItemName :this.editedMainItemName},
        subItemName:this.subItemForm.value.subItemName,
        subItemPrice:this.subItemForm.value.subItemPrice
    }).subscribe((res)=>{
      this.snackbar.open("Updated Successfully",'success') 
      window.location.reload()
    });
    this.subItemForm.reset();
    
    this.subItemDisabled = false
    }
    
  }


  // onSubmitMainItemForm() {
  //   console.log('this.subItemForm',this.subItemForm)
  //   this.submitted = true;
  //   if (!this.subItemForm.valid) {
  //     return false;
  //   } else {
  //     console.log('this.mainItemForm.value',this.subItemForm.value.mainItemName)
  //     this.subItemService.createSubItem(this.subItemForm.value.mainItemName).subscribe(
  //       (res) => {
  //         console.log('Main Item successfully created!')
  //       }, (error) => {
  //         console.log(error);
  //       });
  //   }
  // }

  onCancelEdit(){
    this.subItemDisabled = false
    this.subItemForm.reset()
  }

  edit(data){
    console.log('data',data)
    this.editedSubItemID = data._id
    this.editedMainItemName = data.mainItem.mainItemName
    this.editedMainItemID = data.mainItem.ID

    this.subItemForm.patchValue({
      mainItem: data.mainItem.ID,
      subItemName: data.subItemName,
      subItemPrice: data.subItemPrice
    });
    this.subItemDisabled = true
  }

}
