import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {CsmUserdataService} from '../../../csm-userdata.service';
import * as UsersEnums from '../../../cms-login/cms-login-enum';
import {environment} from '../../../../environments/environment';
import { CommonPaginationService} from '../../../helpers/pagination.service';
import * as showalert from '../../../helpers/sweetalert';

@Component({
  selector: 'app-update-coach',
  templateUrl: './update-coach.component.html',
  styleUrls: ['./update-coach.component.scss']
})
export class UpdateCoachComponent implements OnInit {
  user: any = {};
  // @Input() teams: any;
  @Input() coachData: any;
  @Input() userData: any;
  @Input() isCreate:any
  @Output() BackBtn: EventEmitter<any> = new EventEmitter<any>();
  submitted=false;
  teams=[];
  constructor(private csmUserdataService:CsmUserdataService, private commonPaginationService:CommonPaginationService) { }

  ngOnInit() {
    if(!this.isCreate){
      this.fillUserForm();
    }
  
  }
  SaveUser(form) {
    if(form.invalid){
       return false;
    }
    var params={      
      "firstname": this.user.firstName,
      "lastname": this.user.lastName,
      "age": this.user.age,
      "email": this.user.email,
      "team": (this.user.team)?this.user.team:"5e89435059275c5960c5c60f",     
      "photo": "",
      "role":"coach",
      "user":this.userData._id      
  }
  let formData = new FormData()
  for (let key in params) {
    formData.set(key, params[key])
  }
    if(this.isCreate){
      let url= environment.apiHost+UsersEnums.UsersWebApis.createCoach +"/" +this.userData._id;      
      this.csmUserdataService.AdminPortalPostApi(url, formData).subscribe((data:any)=>{
        if(data.status){
          showalert.simpleAlert('error', 'Somthing went wrong!', 'error')
        }else{
          showalert.simpleAlert('success', 'Coach Created Successfully', 'success')
          this.Cancel();
        }
      })
    }else{
      let url= environment.apiHost+UsersEnums.UsersWebApis.updatecoach +'/'+this.coachData._id +"/" +this.userData._id;      
      this.csmUserdataService.AdminPortalPutApi(url, formData).subscribe((data:any)=>{
        if(data.status){
          showalert.simpleAlert('error', 'Somthing went wrong!', 'error')
        }else{
          showalert.simpleAlert('success', 'Coach Updated Successfully', 'success')
          this.Cancel();
        }
      })

    }

  }

  Cancel() {
    this.BackBtn.emit(true);
  }

  fillUserForm() {
    this.user = {
      firstName: this.coachData.firstname,
      lastName: this.coachData.lastname,
      age: this.coachData.age,
      email: this.coachData.email,
      // team: this.teams.find(o => o.Name === this.coachData.team).id
      // position: this.coachData.position,
    }
  }
}
