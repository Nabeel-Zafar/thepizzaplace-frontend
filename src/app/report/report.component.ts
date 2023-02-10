import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { MainItemService } from '../services/main-item.service';
import { ReportService } from '../services/report.service';
import { SnackbarService } from '../services/snackbar.service';
import { SubItemService } from '../services/sub-item.service';
import { MatTableDataSource } from '@angular/material/table';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

interface Food {
  value: string;
  viewValue: string;
}

interface Car {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  symbol1: string;
  SubItemname:string;
  price:number,
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  exportAsConfig: ExportAsConfig = {
    type: 'xlsx', // the type you want to download
    elementIdOrContent: 'myTableElementId', // the id of html/table element
  }

  selectedValue: string;
  selectedCar: string;
  AllMainItems: any;
  selectedmainItem: any;
  selectedsubItem:any;
  AllSubItems: any;
  Report: any;
  isDisableSubitem = true;
  isDisableMainitem = true;
  serachByOrder: any;

  displayedColumns: string[] = ['position', 'name','SubItemname','price' ,'weight', 'symbol','symbol1'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  cars: Car[] = [
    {value: 'volvo', viewValue: 'Volvo'},
    {value: 'saab', viewValue: 'Saab'},
    {value: 'mercedes', viewValue: 'Mercedes'},
  ];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(private exportAsService: ExportAsService,private snackbar: SnackbarService,private mainItemService: MainItemService,private subItemService: SubItemService, private reportService:ReportService) { }

  ngOnInit(): void {
    
    this.readMainItems();
    this.readSubItems();
  }

  search(){
    this.isDisableMainitem = false;
    // console.log(this.range.value)
  }

  export() {
    // download the file using old school javascript method
    this.exportAsService.save(this.exportAsConfig, 'Record').subscribe(() => {
      // save started
    });
    // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
    this.exportAsService.get(this.exportAsConfig).subscribe(content => {
      // console.log(content);
    });
  }

  searchByOrder(){
    this.reportService.getOrdersByNumber(this.serachByOrder).subscribe((data) => {
      this.Report = data;
      if(this.Report.length > 0 ){
        this.dataSource = new MatTableDataSource(this.Report);
        this.snackbar.open("Records Found!",'success')
      }
      else{
        this.snackbar.open("No record found!",'error')
      }
     }) 
  }

  readMainItems(){
    // console.log(this.range.value.start)
    this.mainItemService.getMainItem().subscribe((data) => {
     this.AllMainItems = data;
    //  console.log('this.AllMainItems',this.AllMainItems)
    })   

  }

  readSubItems(){
    this.subItemService.getSubItem().subscribe((data) => {
     this.AllSubItems = data;
    //  console.log('this.AllSubItems',this.AllSubItems)
    })   

  }

  getReports(){
    if(this.range.value?.end || this.range.value?.start || this.selectedmainItem?._id){
      this.reportService.getOrders(this.range.value,this.selectedmainItem?._id,this.selectedsubItem?._id).subscribe((data) => {
        this.Report = data;
        // console.log('this.Report',this.Report)
        // this.dataSource = new MatTableDataSource(this.Report);
        // console.log('this.Report',this.dataSource)
        if(this.Report.length > 0 ){
          this.dataSource = new MatTableDataSource(this.Report);
          this.snackbar.open("Records Found!",'success')
        }
        else{
          this.snackbar.open("No record found!",'error')
        }
       }) 

      
    }
    else{
      this.snackbar.open("Select all required fields",'error')
    }
      
  }


  onChange(id:any) {
    let mainItem = this.AllMainItems.filter(({_id}) => _id === id)
    
    // console.log(mainItem[0]);
    this.selectedmainItem = mainItem[0]
    // this.departmentService.getDepartment(this.selectedLocation._id).subscribe((res:any) => {
    //   this.departments = res.data
    // })
    // console.log('selectedmainItem',this.selectedmainItem)
    this.isDisableSubitem = false
  }
  
  onChangeSubItems(id:any) {
    let subItem = this.AllSubItems.filter(({_id}) => _id === id)
    
    // console.log(subItem[0]);
    this.selectedsubItem = subItem[0]
    // this.departmentService.getDepartment(this.selectedLocation._id).subscribe((res:any) => {
    //   this.departments = res.data
    // })
    // console.log('selectedmainItem',this.selectedsubItem)/
  }

  getDate(date:any){
    var nDate=new Date(date)
    // console.log('this.dateDiff()',this.dateDiff())
    return nDate.getDate()+"/"+(nDate.getMonth()+1)+"/"+nDate.getFullYear();
  }

}
