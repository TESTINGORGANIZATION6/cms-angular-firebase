import { Component, OnInit, Input } from '@angular/core';
import { CsmUserdataService } from '../../csm-userdata.service';
import * as UsersEnums from '../../cms-login/cms-login-enum';
@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  teamData = [];
  userData:any;
  usersEnums = UsersEnums
  isteamedit=false;
  isNewTeam=false;
  hideTeams=false;

  constructor(private csmUserdataService: CsmUserdataService) { }

  ngOnInit() {
    this.csmUserdataService.getUserData().subscribe(data=>{
      if(data){
        this.userData=data;
      }
    })
    this.getAllteams();
  }

  SetSortingOptions(sortBy) {
    // sort columns logic
  }
  getAllteams() {
    const url = this.usersEnums.UsersWebApis.dummyData;
    this.csmUserdataService.getJSON(url).subscribe(data => {
      if (data != "") {
        this.teamData = data.userdata.teams;
      }
    })
  }
  CreateTeam(){
    this.isNewTeam=true;
    this.hideTeams=true;
  }
  editTeam(){
this.isteamedit=true;
this.hideTeams=true;
  }
  backToteams(e){
    this.isteamedit=false;
    this.isNewTeam=false;
    this.hideTeams=false;
  }
}
