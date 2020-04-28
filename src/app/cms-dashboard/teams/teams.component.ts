import { Component, OnInit } from '@angular/core';
import { CsmUserdataService } from '../../csm-userdata.service';
import * as UsersEnums from '../../cms-login/cms-login-enum';
import {environment} from '../../../environments/environment';
import { CommonPaginationService} from '../../helpers/pagination.service';
import * as showalert from '../../helpers/sweetalert';
@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  teamData = [];
  userData:any;
  usersEnums = UsersEnums
  isteamedit=false;
  isNewTeam=false;
  isteameView=false;
  hideTeams=false;
  PagingOptions: any;
  SortingOptions: any;
  RowsPerPage: number;
  selectedTeam:any;

  constructor(private csmUserdataService: CsmUserdataService, private commonPaginationService: CommonPaginationService) { }

  ngOnInit() {
    this.ResetPaging();
    this.csmUserdataService.getUserData().subscribe(data=>{
      if(data){
        this.userData=data;
        this.loadTeams(1);
      }
    })
  }

  // getAllteams() {
  //   const url = this.usersEnums.UsersWebApis.dummyData;
  //   this.csmUserdataService.getJSON(url).subscribe(data => {
  //     if (data != "") {
  //       this.teamData = data.userdata.teams;
  //     }
  //   })
  // }
  loadTeams(pageNo){
    const url= environment.apiHost + this.usersEnums.UsersWebApis.getTeams + '/'+ this.userData['_id']+ "?orderBy="+this.SortingOptions.columnOrder+"&sortBy="+this.SortingOptions.columnName+"&limit="+this.RowsPerPage+"&page="+ pageNo+"";
    this.csmUserdataService.AdminPortalGetApi(url,null).subscribe(data =>{
      this.teamData=data.result;
      this.SetPaging(pageNo, data.totalPages);
    })
  }
  CreateTeam(){
    this.isNewTeam=true;
    this.hideTeams=true;
    this.isteamedit=false;
  }
  editTeam(teamInfo){
this.isteamedit=true;
this.hideTeams=true;
this.isNewTeam=true;
this.selectedTeam=teamInfo;
  }
  ViewTeam(teamInfo){
  this.isteameView=true;
  this.hideTeams=true;
  this.selectedTeam=teamInfo;
  }
  backToteams(e){
    this.isteamedit=false;
    this.isNewTeam=false;
    this.hideTeams=false;
    this.isteameView=false;
    this.loadTeams(this.PagingOptions.currentPage);
  }
  ResetPaging() {
    this.PagingOptions = this.commonPaginationService.GetPagingOptions();
    this.SortingOptions = this.commonPaginationService.GetSortingOptions();
    this.SortingOptions = { columnName: 'CreatedDateTime', columnOrder: 'DESC' };
    this.RowsPerPage = this.PagingOptions.pageSize;
    }
    SetPaging(currentPage: number, totalRecords: number) {
    this.commonPaginationService.SetPagingOptions(this.PagingOptions, currentPage, totalRecords);
    }
    GetPagingText() {
    let text = '';
    if (this.PagingOptions !== undefined) {
    const sindex = (this.PagingOptions.pageSize * (this.PagingOptions.currentPage - 1) + 1);
    let eindex = this.PagingOptions.currentPage * this.PagingOptions.pageSize;
    const total = this.PagingOptions.totalRecords;
    if (total < eindex) {
    eindex = total;
    }
    text = 'Showing ' + sindex + ' to ' + eindex + ' of ' + total + ' Courses';
    }
    return text;
    }
    SetSortingOptions(columnName: any) {
    this.commonPaginationService.SetSortingOptions(this.SortingOptions, columnName);
    // this.loadAllBatches(this.batchPagingOptions.currentPage);
    this.loadTeams(this.PagingOptions.currentPage)
    }
    SetTotalPages() {
    this.PagingOptions.pageSize = this.RowsPerPage;
    this.PagingOptions.totalPages = Math.ceil(this.PagingOptions.totalRecords / parseInt(this.PagingOptions.pageSize, 10));
    // this.loadAllBatches(1);
    }
    changeStatus(teamData){
      var url=environment.apiHost + this.usersEnums.UsersWebApis.updateTeamStatus +'/'+teamData._id+"/"+this.userData._id;
      this.csmUserdataService.AdminPortalGetApi(url, null).subscribe((data:any)=>{
        if(data.status){
          showalert.simpleAlert('error', 'Somthing went wrong!', 'error')
        }else{
          showalert.simpleAlert('success', 'Status Updated Successfully', 'success');
          this.loadTeams(this.PagingOptions.currentPage);
        }
      })

    }
}
