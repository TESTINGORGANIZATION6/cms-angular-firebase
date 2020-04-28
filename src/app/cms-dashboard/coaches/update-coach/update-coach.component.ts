import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CsmUserdataService } from '../../../csm-userdata.service';
import * as UsersEnums from '../../../cms-login/cms-login-enum';
import { environment } from '../../../../environments/environment';
import { CommonPaginationService } from '../../../helpers/pagination.service';
import * as showalert from '../../../helpers/sweetalert';

@Component({
  selector: 'app-update-coach',
  templateUrl: './update-coach.component.html',
  styleUrls: ['./update-coach.component.scss']
})
export class UpdateCoachComponent implements OnInit {
  user: any = {
    team:null
  };
  // @Input() teams: any;
  @Input() coachData: any;
  @Input() userData: any;
  @Input() isCreate: any
  @Output() BackBtn: EventEmitter<any> = new EventEmitter<any>();
  submitted = false;
  teams = [];
  addteam = false;
  constructor(private csmUserdataService: CsmUserdataService, private commonPaginationService: CommonPaginationService) { }

  ngOnInit() {
  this.loadTeams();

  }
  SaveUser(form) {
    this.submitted = true;
    if (form.invalid) {
      return false;
    }
    var params = {
      "firstname": this.user.firstName,
      "lastname": this.user.lastName,
      "age": this.user.age,
      "email": this.user.email,
      "team": (this.addteam) ? this.user.team : "",
      "photo": "",
      "role": "coach",
      "user": this.userData._id
    }
    let formData = new FormData()
    for (let key in params) {
      formData.set(key, params[key])
    }
    if(!this.user.team || !this.addteam){
      formData.delete("team")
    }
    if (this.isCreate) {
      let url = environment.apiHost + UsersEnums.UsersWebApis.createCoach + "/" + this.userData._id;
      this.csmUserdataService.AdminPortalPostApi(url, formData).subscribe((data: any) => {
        if (data.status) {
          showalert.simpleAlert('error', 'Somthing went wrong!', 'error')
        } else {
          showalert.simpleAlert('success', 'Coach Created Successfully', 'success')
          this.Cancel();
        }
      })
    } else {
      let url = environment.apiHost + UsersEnums.UsersWebApis.updatecoach + '/' + this.coachData._id + "/" + this.userData._id;
      this.csmUserdataService.AdminPortalPutApi(url, formData).subscribe((data: any) => {
        if (data.status) {
          showalert.simpleAlert('error', 'Somthing went wrong!', 'error')
        } else {
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
       team: null
    }
    if(this.coachData.team){
      this.user.team=this.coachData.team._id;
      this.addteam=true;
        }
  }
  loadTeams(){
    const url= environment.apiHost + UsersEnums.UsersWebApis.allTeams + '/'+ this.userData['_id'];
    this.csmUserdataService.AdminPortalGetApi(url,null).subscribe(data =>{
      this.teams=data;
      if (!this.isCreate) {
        this.fillUserForm();
      }
    })

  }
}
