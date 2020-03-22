import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-update-coach',
  templateUrl: './update-coach.component.html',
  styleUrls: ['./update-coach.component.scss']
})
export class UpdateCoachComponent implements OnInit {
  user: any = {};
  @Input() teams: any;
  @Input() coachData: any;
  @Output() BackBtn: EventEmitter<any> = new EventEmitter<any>();
  submitted=false;
  constructor() { }

  ngOnInit() {
    this.fillUserForm();
  }
  SaveUser(form) {

  }

  Cancel() {
    this.BackBtn.emit(true);
  }

  fillUserForm() {
    this.user = {
      firstName: this.coachData.Name,
      lastName: this.coachData.lastname,
      age: this.coachData.age,
      email: this.coachData.email,
      team: this.teams.find(o => o.Name === this.coachData.team).id
      // position: this.coachData.position,
    }
  }
}
