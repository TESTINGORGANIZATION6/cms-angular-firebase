import { Component, OnInit } from '@angular/core';
import * as UsersEnums from './cms-login-enum';
import {CsmUserdataService} from '../csm-userdata.service';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';
@Component({
  selector: 'app-cms-login',
  templateUrl: './cms-login.component.html',
  styleUrls: ['./cms-login.component.scss']
})
export class CmsLoginComponent implements OnInit {
  passwordToggel = false;
  isRemember = false;
  usersEnums = UsersEnums;
  model: any = {};
  wrongDataAlert = false;
  submitted = false;
  userData:any=[];
  invalidDetails=false;
  constructor( private csmUserdataService: CsmUserdataService, private route : Router) { }

  ngOnInit() {
  }

  onSubmit(form) {
    this.submitted = true;
    if (form.invalid) {
      return false;
    }
    this.checkUser();
  }

  checkUser() {
const url=environment.apiHost + this.usersEnums.UsersWebApis.login;
var param={
email:this.model.Username,
password:this.model.password
}
this.csmUserdataService.AdminPortalPostApi(url, param).subscribe(data => {
  if(data){
    this.userData=data;
    localStorage.setItem('token', this.userData.token);
    this.csmUserdataService.setUserData(this.userData);
    this.route.navigate(['dashboard']);
    // var islogin = this.userData.find(o => (o.UserName === param.username)&&(o.password===param.password));
    // if(islogin){
    //   this.route.navigate(['dashboard']);
    // }
  }
})
}
}
