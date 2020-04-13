import { Component, OnInit, Input } from '@angular/core';
import { CsmUserdataService } from '../../csm-userdata.service';
import * as UsersEnums from '../../cms-login/cms-login-enum';
import { environment } from '../../../environments/environment';
import { CommonPaginationService } from '../../helpers/pagination.service';
import * as showalert from '../../helpers/sweetalert';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.scss']
})
export class CoachesComponent implements OnInit {
  coachData: any = [];
  userdata: any;
  usersEnums = UsersEnums;
  editCoach = false;
  coachdata: any;
  teams: any;
  PagingOptions: any;
  SortingOptions: any;
  RowsPerPage: number;
  createNew = true;
  constructor(private csmUserdataService: CsmUserdataService, private commonPaginationService: CommonPaginationService) { }

  ngOnInit() {
    this.ResetPaging()
    this.csmUserdataService.getUserData().subscribe(data => {
      if (data) {
        this.userdata = data;
        this.getAllcoaches(1);
      }
    })
  }
  getAllcoaches(pageNo) {
    const url = environment.apiHost + this.usersEnums.UsersWebApis.getCoaches + '/' + this.userdata._id + "?orderBy=" + this.SortingOptions.columnOrder + "&sortBy=" + this.SortingOptions.columnName + "&limit=" + this.RowsPerPage + "&page=" + pageNo + "";
    this.csmUserdataService.AdminPortalGetApi(url, null).subscribe(data => {
      if (data) {
        this.coachData = data.result;
        this.SetPaging(pageNo, data.totalPages)
        // this.teams=data.userdata.te  ams;
      }
    })
  }
  createCoach() {
    this.editCoach = true;
    this.createNew = true;
  }

  updateInfo(coachData) {
    this.coachdata = coachData;
    this.editCoach = true;
    this.createNew = false;
  }
  updateStatus(coachData){
  var url=environment.apiHost + this.usersEnums.UsersWebApis.updateCoachStatus +'/'+coachData._id+"/"+this.userdata._id; 
    this.csmUserdataService.AdminPortalPutApi(url, null).subscribe((data:any)=>{
      if(data.status){
        showalert.simpleAlert('error', 'Somthing went wrong!', 'error')
      }else{
        showalert.simpleAlert('success', 'Status Updated Successfully', 'success')
      }
    })
}
  BacktoCoachlist(event) {
    this.editCoach = false;
    this.getAllcoaches(this.SortingOptions.currentPage);
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
    this.getAllcoaches(this.PagingOptions.currentPage)
  }
  SetTotalPages() {
    this.PagingOptions.pageSize = this.RowsPerPage;
    this.PagingOptions.totalPages = Math.ceil(this.PagingOptions.totalRecords / parseInt(this.PagingOptions.pageSize, 10));
    // this.loadAllBatches(1);
  }
}
