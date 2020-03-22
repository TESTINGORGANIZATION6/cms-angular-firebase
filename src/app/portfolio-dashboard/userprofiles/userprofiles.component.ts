import { Component, OnInit } from '@angular/core';
import {CsmUserdataService} from '../../csm-userdata.service';
import * as UsersEnums from '../../cms-login/cms-login-enum';
@Component({
  selector: 'app-userprofiles',
  templateUrl: './userprofiles.component.html',
  styleUrls: ['./userprofiles.component.scss']
})
export class UserprofilesComponent implements OnInit {
  userdata=[];
  usersEnums = UsersEnums;
  constructor(private portfolioservice:CsmUserdataService) { }

  ngOnInit() {
    this.getAllplayers();
  }

  SetSortingOptions(sortBy){

  }
  getAllplayers(){
    const url = this.usersEnums.UsersWebApis.dummyData;
    this.portfolioservice.getJSON(url).subscribe(data => {
      if (data != ""){
        this.userdata = data.portfolioData.users;
        // this.teams=data.userdata.teams;
      }
    })
      }

}
