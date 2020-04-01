import { Component, OnInit } from '@angular/core';
import * as UsersEnums from '../cms-login/cms-login-enum';
import {CsmUserdataService} from '../csm-userdata.service';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.scss']
})
export class RegisterAdminComponent implements OnInit {
  model: any = {
    role:1,
  };
  usersEnums=UsersEnums;

  constructor(private csmUserdataService:CsmUserdataService, private router:Router) { }

  ngOnInit() {
   
  }
  onSubmit(){
    var url=environment.apiHost + this.usersEnums.UsersWebApis.registerUser;
    var params={
      "username": this.model.Username,
      "firstname": this.model.firstName,
      "lastname": this.model.lastName,
      "email": this.model.email,
      "password": this.model.password
    }
    this.csmUserdataService.AdminPortalPostApi(url, params).subscribe(data=>{
      if(data.status){

      }
      else{
        Swal.fire('Success', "User created Successfully", "success");
      }
    })
  }
}
