import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.scss']
})
export class RegisterAdminComponent implements OnInit {
  model: any = {
    role:1,
  };

  constructor() { }

  ngOnInit() {
   
  }
  onSubmit(){
    
  }

}
