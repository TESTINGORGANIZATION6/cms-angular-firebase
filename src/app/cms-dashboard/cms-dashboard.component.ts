import { Component, OnInit } from '@angular/core';
import {CsmUserdataService} from '../csm-userdata.service';
@Component({
  selector: 'app-cms-dashboard',
  templateUrl: './cms-dashboard.component.html',
  styleUrls: ['./cms-dashboard.component.scss']
})
export class CmsDashboardComponent implements OnInit {

  constructor(private csmUserdataService: CsmUserdataService) { }
  userData=[];
  showActiveTab:any;
  unsubscribeService:any;
  ngOnInit() {
  //  this.unsubscribeService= this.csmUserdataService.getUserData().subscribe(data=>{
  //     if(data){
  //       this.userData=data;      
  //     }
  //   })
  }

  SetSortingOptions(){
// sort columns logic
  }

  checkActiveTab(e){
this.showActiveTab=e;
  }
   
//   ngOnDistroy(){
// this.unsubscribeService.unsubscribe();
//   }

}
