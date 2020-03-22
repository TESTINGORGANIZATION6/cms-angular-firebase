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

  editTeam(){
this.isteamedit=true;
  }
}
