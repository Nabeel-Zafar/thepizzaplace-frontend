import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  orderNumber: any;
  orderDate: any;
  items:any;
  totalAmount:any;
}

@Component({
  selector: 'app-print-slip-dialog',
  templateUrl: './print-slip-dialog.component.html',
  styleUrls: ['./print-slip-dialog.component.css']
})
export class PrintSlipDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  orderNumber: any;
  orderDate:any;
  itemsArray = []
  totalAmount:any;

  ngOnInit(): void {
    // console.log("this.data",this.data)
    this.orderNumber = this.data.orderNumber
    this.orderDate = this.data.orderDate
    this.itemsArray = this.data.items
    this.totalAmount = this.data.totalAmount
  }

  
  getDate(date:any){
    var nDate=new Date(date)
    return nDate.getDate()+"/"+(nDate.getMonth()+1)+"/"+nDate.getFullYear();
  }

}
