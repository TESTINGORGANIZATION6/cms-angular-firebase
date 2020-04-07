import { Component, OnInit, Input } from '@angular/core';
import {CsmUserdataService} from '../../csm-userdata.service';
import * as UsersEnums from '../../cms-login/cms-login-enum';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
// @Input() userData=[];
  playerData:any=[];
  userData:any;
  usersEnums = UsersEnums;
  updateplayer=false;  
  createNewPlayer=false;
  editplayer:any;
  teams;
  
  // @Input() appName:any;
  constructor(private csmUserdataService: CsmUserdataService) { }


  ngOnInit() { 
  
    this.csmUserdataService.getUserData().subscribe(data=>{
      if(data){
        this.userData=data;
        this.getAllplayers();
      }
    })
      
 
  }

  SetSortingOptions(sortBy){
// sort columns logic
  }
  getAllplayers(){
    const url = environment.apiHost + this.usersEnums.UsersWebApis.Getplayers+'/'+ this.userData._id;
    this.csmUserdataService.AdminPortalGetApi(url, null).subscribe(data => {
      if (data != ""){
         this.playerData = data.result;
        // this.teams=data.userdata.teams;  
      }
    })
  }

  CreatePlayer() {
    this.createNewPlayer = true;
    this.updateplayer = true;
  }
  editPlayer(playerinfo) {
    this.updateplayer = true;
    this.createNewPlayer = false;
    this.editplayer = playerinfo;
  }
  BackBtnClicked(event){
    this.updateplayer = false;
  }
}
