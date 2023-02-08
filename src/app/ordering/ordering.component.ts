import { Component, OnInit,Inject } from '@angular/core';
import { OrderService } from '../services/order.service';
import { SnackbarService } from '../services/snackbar.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PrintSlipDialogComponent } from './print-slip-dialog/print-slip-dialog.component';


@Component({
  selector: 'app-ordering',
  templateUrl: './ordering.component.html',
  styleUrls: ['./ordering.component.css']
})
export class OrderingComponent implements OnInit {

  subItemsArray: any[] = [];
  allMenu: any;
  orderNumber: any;
  orderDate:any;
  mainItem: any[] = [
    {
      itemName: 'Pizza',
      subItems: [
        { Name: 'BBQ Pizza', Price: 500, qtyTotal: 1 },
        { Name: 'Afghani Pizza', Price: 500, qtyTotal: 1 },
        { Name: 'Tikka Pizza', Price: 500, qtyTotal: 1 },
      ]
    },
    {
      itemName: 'Burgers',
      subItems: [
        { Name: 'Zinger Burger', Price: 250, qtyTotal: 1 },
        { Name: 'Chicken Burger', Price: 200, qtyTotal: 1 },
        { Name: 'Tikka Burger', Price: 300, qtyTotal: 1 },
      ],
    },
    {
      itemName: 'Beverages',
      subItems: [
        { Name: 'Pepsi', Price: 500, qtyTotal: 1 },
        { Name: '7up', Price: 500, qtyTotal: 1 },
        { Name: 'Mirinda', Price: 500, qtyTotal: 1 },
      ]
    }
  ];
  constructor(private orderService: OrderService,private snackbar: SnackbarService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.readOrders();
  }

  onClick(event: any, subItems: any) {
    console.log(event)
    console.log("-->>", subItems)
    if (subItems) {
      if (this.subItemsArray.find(f => f._id === subItems._id)) {
        this.subItemsArray = this.subItemsArray.filter(r => r._id !== subItems._id);
      } else this.subItemsArray.push({ ...subItems, qtyTotal: 1 })
    }
    console.log(this.subItemsArray);
    console.log(this.mainItem)
  }

  total() {
    return this.subItemsArray.reduce(
      (sum, x) => ({
        qtyTotal: 1,
        subItemPrice: Number(sum.subItemPrice) + Number((x.qtyTotal || 1) * x.subItemPrice)
      }),
      { qtyTotal: 1, subItemPrice: 0 }
    ).subItemPrice;
  }

  readOrders() {
    this.orderService.getMenu().subscribe((data: any) => {
      this.allMenu = data;
      console.log('this.allMenu', this.allMenu)
   
    })

  }

  getDate(date:any){
    var nDate=new Date(date)
    return nDate.getDate()+"/"+(nDate.getMonth()+1)+"/"+nDate.getFullYear();
  }

  openDialog() {
    this.dialog.open(PrintSlipDialogComponent, {
      data: {
        animal: 'panda',
        items: this.subItemsArray,
        totalAmount: this.total(),
        orderDate: this.orderDate,
        orderNumber : this.orderNumber
      },
    });
  }

  onSubmitSubItemForm(){
    if(this.subItemsArray.length > 0 ){
      let json = JSON.stringify({date: new Date()});
    let obj = JSON.parse(json)
    this.orderNumber = Date.now()
    this.orderDate= obj.date = new Date(obj.date),
      this.orderService.createOrder({
        items: this.subItemsArray,
        totalAmount: this.total(),
        orderDate: this.orderDate,
        orderNumber : this.orderNumber
      }).subscribe(
        (res) => {
          this.snackbar.open("Order Placed!",'success')
          // this.subItemForm.reset()
          this.openDialog()
        }, (error) => {
          console.log(error);
        });
    
  }
  else{
    this.snackbar.open("Please Select Items!",'error')
  }
  }
    

}
