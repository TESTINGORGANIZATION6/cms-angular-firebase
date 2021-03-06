import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import {CsmUserdataService} from '../../../csm-userdata.service';
import * as UsersEnums from '../../../cms-login/cms-login-enum';
import * as showalert from '../../../helpers/sweetalert';

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
  user:any = {
    position:null,
    team:null
  };
  teams=[];
  addteam=false;
  userPositions=[
    {id:'gool keepar', name:'Gool Keeper'  },
    {id:'right back', name:'Right Back'  },
    {id:'left back', name:'Left Back'  },
    {id:'center defence', name:'Center Defence'},
    {id:'rigth winger', name:'Right Winger'  },
    {id:'left winger', name:'Left Winger'  },
    {id:'center midfielder', name:'Center Midfielder'},
    {id:'striker', name:'Striker'  },
  ]
  constructor( private csmUserdataService:CsmUserdataService) { }

  ngOnInit() {
    this.loadTeams();
  }

  SaveUser(form){
this.submitted=true;
if(form.invalid){
  return false;
}
    var params={
        "firstname": this.user.firstName,
        "lastname": this.user.lastName,
        "age": this.user.age,
        "email": this.user.email,
        "team": (this.addteam)?this.user.team:"",
        "position": this.user.position,
        "photo": "",
        "role":"player",
        "user":this.userData._id

    }
  let formData = new FormData()
  for (let key in params) {
    formData.set(key, params[key])
  }
  if(!this.user.team || !this.addteam){
    formData.delete("team")
  }
    if(this.createNew){
      let url= environment.apiHost + this.UsersEnums.UsersWebApis.createPlayer+ '/'+ this.userData['_id'];
      this.csmUserdataService.AdminPortalPostApi(url,formData).subscribe(data =>{
        if(data.status){
         showalert.simpleAlert('error', 'error msg', 'error')

        }else{
          showalert.simpleAlert('success', 'Player Created Successfully', 'success')
          this.Cancel();
        }
      })
    }
    else{
      let url= environment.apiHost + this.UsersEnums.UsersWebApis.updatePlayer+'/'+this.playerData._id +'/'+ this.userData['_id'];
      this.csmUserdataService.AdminPortalPutApi(url,formData).subscribe(data =>{
        if(data.status){
         showalert.simpleAlert('error', 'error msg', 'error')

        }else{
          showalert.simpleAlert('success', 'Player Updated Successfully', 'success')
          this.Cancel();
        }
      })
    }
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
       team:null,
      position:this.playerData.position,
    }
    if(this.playerData.team){
    this.user.team=this.playerData.team._id;
    this.addteam=true;
      }
  }
  loadTeams(){
    const url= environment.apiHost + this.UsersEnums.UsersWebApis.allTeams + '/'+ this.userData['_id'];
    this.csmUserdataService.AdminPortalGetApi(url,null).subscribe(data =>{
      this.teams=data;
      if(!this.createNew){
        this.fillUserForm();
      }
    })

  }
}
