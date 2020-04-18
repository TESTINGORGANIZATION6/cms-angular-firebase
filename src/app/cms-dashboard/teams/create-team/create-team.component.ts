import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as UsersEnums from '../../../cms-login/cms-login-enum';
import { CsmUserdataService } from '../../../csm-userdata.service';
import { environment } from '../../../../environments/environment';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';


const ELEMENT_DATA = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {
  submitted = false;
  team: any = {};
  @Input() userData: any;
  @Output() BackBtn: EventEmitter<any> = new EventEmitter<any>();
  addStaff = false;
  staff: any = {
  }
  isEdit = false;
  currentEdit: any;
  playerData:any=[]
  allStafList: any = [];
  addplayer=false;
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  selection = new SelectionModel(true, []);
  constructor(private csmUserdataService: CsmUserdataService) { }

  ngOnInit() {
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
      staff: this.allStafList,
    };
    this.csmUserdataService.AdminPortalPostApi(url, params).subscribe((data:any)=>{
      if(data.status){

      }else{

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
        const url = environment.apiHost + UsersEnums.UsersWebApis.availablePlayers+"/"+ this.userData._id+"?orderBy=createdAt&sortBy=desc&limit=3&maxAge="+this.team.age+"&minAge=0";
        this.csmUserdataService.AdminPortalGetApi(url, null).subscribe(data => {
          if (data != ""){
             this.playerData = data.result;
            // this.teams=data.userdata.teams;
          }
        })
      }else{
        alert('please add age group');
      }
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(row => this.selection.select(row));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }

    Cancel(){
      this.BackBtn.emit(true);
    }
}
