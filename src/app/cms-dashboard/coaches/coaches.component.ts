import { Component, OnInit,Input } from '@angular/core';
import {CsmUserdataService} from '../../csm-userdata.service';
import * as UsersEnums from '../../cms-login/cms-login-enum';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.scss']
})
export class CoachesComponent implements OnInit {
  coachData:any=[];
  @Input() userData=[];
  usersEnums=UsersEnums;
  editCoach=false;
  coachdata:any;
  teams:any;
  constructor(private csmUserdataService: CsmUserdataService) { }

  ngOnInit() {
    this.getAllcoaches();
  }

  SetSortingOptions(sortBy){
// sort columns logic
  }

  getAllcoaches(){
    const url = environment.apiHost + this.usersEnums.UsersWebApis.getCoaches+'/'+ this.userData['_id'];
    this.csmUserdataService.AdminPortalGetApi(url, null).subscribe(data => {
      if(data){
         this.coachData = data;
        // this.teams=data.userdata.te  ams;
      }
    })
      }

      updateInfo(coachData){
      this.coachdata=coachData;
      this.editCoach=true;
      }
      BacktoCoachlist(event){
        this.editCoach=false;
      }
}
