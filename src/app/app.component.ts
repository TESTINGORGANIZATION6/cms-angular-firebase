import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as UsersEnums from '../app/cms-login/cms-login-enum';
import { CsmUserdataService } from './csm-userdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cms-clientside';
  userId = localStorage.getItem('userId');
  UsersEnums = UsersEnums;
  constructor(private csmUserdataService: CsmUserdataService, private router: Router) { }
  ngOnInit() {
   
    if (this.userId) {
      this.checkLogin();
    }else{  
      // this.router.navigate(['']);
    }
  }

  checkLogin() {
    var url = environment.apiHost + this.UsersEnums.UsersWebApis.getUser + '/' + this.userId;
    this.csmUserdataService.AdminPortalGetApi(url, null).subscribe(data => {
      if (data.status) {
        this.router.navigate['']
      }else{
        this.csmUserdataService.setUserData(data);
        this.router.navigate(['dashboard']);
      }
    })
  }
}
