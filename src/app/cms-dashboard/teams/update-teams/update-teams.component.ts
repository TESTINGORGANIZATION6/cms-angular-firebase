import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-update-teams',
  templateUrl: './update-teams.component.html',
  styleUrls: ['./update-teams.component.scss']
})
export class UpdateTeamsComponent implements OnInit {

  @Input() action:string;
  @Input() teamData:object;
  @Output() BackBtn: EventEmitter<any> = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit() {
    
  }
  goBack(){
    this.BackBtn.emit(true);
  }

}
