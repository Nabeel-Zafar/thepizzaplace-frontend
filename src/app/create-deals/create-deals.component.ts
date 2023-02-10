import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CreateDealsService } from '../services/create-deals.service';
import { SnackbarService } from '../services/snackbar.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  SubItemname:string;
  price:number,
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Pizza', SubItemname:'Pizza Place Special',price:700,weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Burgers', SubItemname:'Zinger Burger',price:200, weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Beverages', SubItemname:'Pepsi', price:40, weight: 6.941, symbol: 'Li'},
];

@Component({
  selector: 'app-create-deals',
  templateUrl: './create-deals.component.html',
  styleUrls: ['./create-deals.component.css']
})
export class CreateDealsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name','SubItemname','price' ,'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  dealForm: FormGroup;
  AllDeals: any;
  dealsID: any;
  dealsDisabled : boolean = false


  constructor(public fb: FormBuilder,
    private dealService: CreateDealsService,
    private createdealsService: CreateDealsService,
    private snackbar: SnackbarService) {
      this.dealsForm();
     }

  ngOnInit(): void {
    this.readDeals();
  }

  dealsForm() {
    this.dealForm = this.fb.group({
      dealName: [''],
      dealItem: [''],
      dealPrice: [''],
    })

  }

  onSubmitdealsForm(){
    // console.log('this.dealForm',this.dealForm.value)
    if (!this.dealForm.value.dealName || !this.dealForm.value.dealItem || !this.dealForm.value.dealPrice) {
      this.snackbar.open("Please Add Compulsory Details!",'error')
    }else {
      // console.log('this.subItemForm.value',this.subItemForm.value)
      this.dealService.createDeal({
        dealName: this.dealForm.value.dealName,
        dealItem: this.dealForm.value.dealItem,
        dealPrice:this.dealForm.value.dealPrice
      }).subscribe(
        (res) => {
          this.snackbar.open("Main Item successfully created!",'success')
          this.dealForm.reset()
          window.location.reload()
        }, (error) => {
          console.log(error);
        });
    }
  }

  readDeals(){
    this.dealService.getDeals().subscribe((data) => {
     this.AllDeals = data;
    //  console.log('this.AllDeals',this.AllDeals)
    //  console.log('this.dataSource.data',this.dataSource.data)
     this.dataSource = new MatTableDataSource(this.AllDeals);
    //  this.dataSource.paginator = this.paginator;
    //  console.log('this.dataSource',this.dataSource)
    //  console.log('this.AllUsers',this.AllUsers)

    })   

  }


  onEdit(){
    
    if (!this.dealForm.value.dealName || !this.dealForm.value.dealItem || !this.dealForm.value.dealPrice) {
      this.snackbar.open("Please Add Compulsory Details!",'error')
    }
    else{
      this.createdealsService.updateDeals(this.dealsID,{
        dealName: this.dealForm.value.dealName,
        dealItem: this.dealForm.value.dealItem,
        dealPrice:this.dealForm.value.dealPrice    
      }).subscribe((res)=>{
      this.snackbar.open("Updated Successfully",'success')
      window.location.reload()
    });
    this.dealForm.reset();
    this.dealsDisabled = false
    }
    
  }

  onCancelEdit(){
    this.dealsDisabled = false
    this.dealForm.reset()
  }

  edit(data){
    // console.log('data',data)
    this.dealsID = data._id
    this.dealForm.patchValue({
      dealName: data.dealName,
      dealItem: data.dealItem,
      dealPrice:data.dealPrice
    });
    this.dealsDisabled = true
  }


}
