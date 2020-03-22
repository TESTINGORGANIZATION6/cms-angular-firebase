import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-updateplayer',
  templateUrl: './updateplayer.component.html',
  styleUrls: ['./updateplayer.component.scss']
})
export class UpdateplayerComponent implements OnInit{
  submitted=false;
  @Input() teams: any;
  @Input() playerData: any;
  @Input() createNew:any;
  @Output() BackBtn: EventEmitter<any> = new EventEmitter<any>();
  user:any = {};
  constructor() { }

  ngOnInit() {
    if(!this.createNew){
      this.fillUserForm();
    }

  }

  SaveUser(form){

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
