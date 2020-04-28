import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as UsersEnums from '../../../cms-login/cms-login-enum';
import { CsmUserdataService } from '../../../csm-userdata.service';
import { environment } from '../../../../environments/environment';
import * as showalert from '../../../helpers/sweetalert';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {
  submitted = false;
  team: any = {
    coach:null,
  };
  @Input() userData: any;
  @Input() isEditTeam:any;
  @Input() teamData:any;
  @Output() BackBtn: EventEmitter<any> = new EventEmitter<any>();
  addStaff = false;
  staff: any = {
  }
  isEdit = false;
  currentEdit: any;
  playerData:any=[]
  allStafList: any = [];
  coachList:any=[];
  addplayer=false;
addedPlayers=[];

  constructor(private csmUserdataService: CsmUserdataService) { }

  ngOnInit() {
    this.loadCoaches()
  }

  createTeam(form) {
    this.submitted = true;
    if (form.invalid) {
      return false;
    }
    var url = environment.apiHost + UsersEnums.UsersWebApis.createTeam + '/' + this.userData._id;
    var params = {
      name: this.team.teamName,
      ageGroup: this.team.age,
      description:this.team.description,
      staff: this.allStafList,
      user: this.userData._id,
      players:this.addedPlayers,
    };
//     var params={
//       "name":"Mumbai",
// "description":"Team of Heroes",
// "ageGroup": "15-25",
// "user": "5e8fdf97ec53df5de4b37d06",
// "staff": {
// "name": "Swapnil Rabse",
// "designation": "Manager",
// "contact": "saagu41@codeburst.io"
// }}
    this.csmUserdataService.AdminPortalPostApi(url, params).subscribe((data:any)=>{
      if(data.status){

      }else{
        showalert.simpleAlert('success', 'Team Created Successfully', 'success');
        this.Cancel();
      }
    })

  }

  AddStaffmember(){
    this.addStaff=true;
    this.addplayer=false;
  }

  AddMember() {
    if (this.isEdit) {
      if (this.staff.name && this.staff.designation && this.staff.contact) {
        if (this.staff.name.trim() != '' && this.staff.designation.trim() != '' && this.staff.contact.trim() != '') {
          this.allStafList[this.currentEdit].name = this.staff.name;
          this.allStafList[this.currentEdit].designation = this.staff.designation;
          this.allStafList[this.currentEdit].contact = this.staff.contact;
          this.staff = {};
          this.isEdit = false;
        }
      }
    } else {
      if (this.staff.name && this.staff.designation && this.staff.contact) {
        if (this.staff.name.trim() != '' && this.staff.designation.trim() != '' && this.staff.contact.trim() != '') {
          this.allStafList.push(this.staff);
          this.staff = {};
        }
      }
    }


  }
  editStaff(staff, index) {
    this.isEdit = true;
    this.staff.name = staff.name;
    this.staff.designation = staff.designation;
    this.staff.contact = staff.contact;
    this.currentEdit = index;
  }

  deleteStaff(index) {
    this.allStafList.splice(index, 1);
  }

  addPlayers(){
    if(!this.addplayer){
      if(this.team.age){
        this.addStaff=false;
        this.addplayer=true;
        // const url = environment.apiHost + UsersEnums.UsersWebApis.availablePlayers+"/"+ this.userData._id+"?orderBy=desc&sortBy=createdAt&limit=3&maxAge="+this.team.age+"&minAge=0";
        // this.csmUserdataService.AdminPortalGetApi(url, null).subscribe(data => {
        //   if (data != ""){
        //      this.playerData = data.result;
        //   }
        // })
      }else{
        alert('please add age group');
      }
    }
  }
  loadPlayers(){
    if(this.team.age && this.team.age != ""){
      this.addplayer=false;
      this.addedPlayers=[];
      const url = environment.apiHost + UsersEnums.UsersWebApis.availablePlayers+"/"+ this.userData._id+"?orderBy=desc&sortBy=createdAt&limit=3&maxAge="+this.team.age+"&minAge=0";
      this.csmUserdataService.AdminPortalGetApi(url, null).subscribe(data => {
        if (data != ""){
           this.playerData = data.result;
          // this.teams=data.userdata.teams;
        }
      })
    }

  }


    AddorRemove(player, e){
      let BtnRef= e.currentTarget;
      if(BtnRef.innerHTML == 'Add'){
        this.addedPlayers.push(player);
        player['isadded']=true;

      }else{
        this.addedPlayers= this.addedPlayers.filter((item) => item._id !== player._id);
        player['isadded']=false;
      }
    }

    loadCoaches(){
      const url = environment.apiHost + UsersEnums.UsersWebApis.allCoaches + '/' + this.userData._id;
      this.csmUserdataService.AdminPortalGetApi(url, null).subscribe(data => {
        if (data) {
          this.coachList = data;
          if(this.isEditTeam){
            this.fillFormData();
          }
          // this.teams=data.userdata.teams;
        }
      })
    }
    fillFormData(){
this.team={
  name:this.teamData.name,
  description:this.teamData.description,
  age:this.teamData.ageGroup,
  coach:(this.teamData.coach)?this.teamData.coach:null
}
this.allStafList=this.teamData.staff;
    }

    Cancel(){
      this.BackBtn.emit(true);
    }
}
