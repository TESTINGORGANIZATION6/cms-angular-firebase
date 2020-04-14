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
  @Input() userData=[];
  usersEnums = UsersEnums
  isteamedit=false;
  isNewTeam=true;
  performAction='create';
  constructor(private csmUserdataService: CsmUserdataService) { }

  ngOnInit() {
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
    this.isteamedit=true;
    this.isNewTeam=true;
    this.performAction='create';
  }
  editTeam(){
this.isteamedit=true;
this.isNewTeam=false;
this.performAction='edit';
  }
  backToteams(e){
    this.isteamedit=false;
  }
}
