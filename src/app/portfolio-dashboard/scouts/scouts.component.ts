import { Component, OnInit } from '@angular/core';
import {CsmUserdataService} from '../../csm-userdata.service';
import * as UsersEnums from '../../cms-login/cms-login-enum';

@Component({
  selector: 'app-scouts',
  templateUrl: './scouts.component.html',
  styleUrls: ['./scouts.component.scss']
})
export class ScoutsComponent implements OnInit {
scoutData=[];
usersEnums=UsersEnums
  constructor( private recruterData:CsmUserdataService) { }

  ngOnInit() {
    this.getAllrecruters();
  }
  SetSortingOptions(sortBy){

  }
  getAllrecruters(){
    const url = this.usersEnums.UsersWebApis.dummyData;
    this.recruterData.getJSON(url).subscribe(data => {
      if (data != ""){
        this.scoutData = data.portfolioData.scouts;
        // this.teams=data.userdata.teams;
      }
    })
      }
}
