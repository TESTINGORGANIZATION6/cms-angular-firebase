import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import {CsmUserdataService} from '../../../csm-userdata.service';
import * as UsersEnums from '../../../cms-login/cms-login-enum';

@Component({
  selector: 'app-updateplayer',
  templateUrl: './updateplayer.component.html',
  styleUrls: ['./updateplayer.component.scss']
})
export class UpdateplayerComponent implements OnInit{
  submitted=false;
  @Input() userData: any;
  @Input() playerData: any;
  @Input() createNew:any;
  @Output() BackBtn: EventEmitter<any> = new EventEmitter<any>();
  UsersEnums=UsersEnums;
  user:any = {};
  constructor( private csmUserdataService:CsmUserdataService) { }

  ngOnInit() {
    if(!this.createNew){
      this.fillUserForm();
    }

  }

  SaveUser(form){
    const url= environment.apiHost + this.UsersEnums.UsersWebApis.createPlayer+ '/'+ this.userData['_id'];
    var params={      
        "firstname": this.user.firstName,
        "lastname": this.user.lastName,
        "age": 'player',
        "email": this.user.email,
        "team": this.user.team,
        "position": this.user.position,
        "photo": ""
      
    }
    this.csmUserdataService.AdminPortalPostApi(url,params).subscribe(data =>{
      if(data){
        
      }
    })
  }
  Cancel(){
this.BackBtn.emit(true);
  }
  fillUserForm(){
    this.user={
      firstName:this.playerData.firstname,
      lastName:this.playerData.lastname,
      age:this.playerData.age,
      email:this.playerData.email,
      // team:this.teams.find(o => o.Name === this.playerData.team).id,
      position:this.playerData.position,
    }
// this.user.firstName=this.playerData.Name;
// this.user.lastName=this.playerData.lastname;
// this.user.age=this.playerData.age;
// this.user.email=this.playerData.email;
// this.user.team=this.playerData.team;
// this.user.position=this.playerData.position;

  }
}
