import { Component, OnInit, Input } from '@angular/core';
import {CsmUserdataService} from '../../csm-userdata.service';
import * as UsersEnums from '../../cms-login/cms-login-enum';
import {environment} from '../../../environments/environment';
import { CommonPaginationService} from '../../helpers/pagination.service';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
// @Input() userData=[];
  playerData:any=[];
  userData:any;
  usersEnums = UsersEnums;
  updateplayer=false;  
  createNewPlayer=false;
  editplayer:any;
  teams;
  recordsPerPage=10
  PagingOptions: any;
  SortingOptions: any;
  RowsPerPage: number;
  // @Input() appName:any;
  constructor(private csmUserdataService: CsmUserdataService, private commonPaginationService:CommonPaginationService) { }


  ngOnInit() { 
    this.ResetPaging();
    this.csmUserdataService.getUserData().subscribe(data=>{
      if(data){
        this.userData=data;
        
        this.getAllplayers(1);
      }
    })
      
 
  }


  getAllplayers(pageNo){
    const url = environment.apiHost + this.usersEnums.UsersWebApis.Getplayers+'/'+ this.userData._id + "?orderBy="+this.SortingOptions.columnOrder+"&sortBy="+this.SortingOptions.columnName+"&limit="+this.recordsPerPage+"&page=1";
    this.csmUserdataService.AdminPortalGetApi(url, null).subscribe(data => {
      if (data != ""){
         this.playerData = data.result;
         this.SetPaging(pageNo, data.totalPages)
        // this.teams=data.userdata.teams;  
      }
    })
  }

  CreatePlayer() {
    this.createNewPlayer = true;
    this.updateplayer = true;
  }
  editPlayer(playerinfo) {
    this.updateplayer = true;
    this.createNewPlayer = false;
    this.editplayer = playerinfo;
  }
  BackBtnClicked(event){
    this.updateplayer = false;
    this.getAllplayers(1);
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
    this.getAllplayers(this.PagingOptions.currentPage)
    }
    SetTotalPages() {
    this.PagingOptions.pageSize = this.RowsPerPage;
    this.PagingOptions.totalPages = Math.ceil(this.PagingOptions.totalRecords / parseInt(this.PagingOptions.pageSize, 10));
    // this.loadAllBatches(1);
    }
}
