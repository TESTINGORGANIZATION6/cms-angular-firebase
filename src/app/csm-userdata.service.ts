import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, isObservable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class CsmUserdataService {
  userData:any;
  userInfo: any;
  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {
    this.userData = new BehaviorSubject<String>('');
    this.userInfo = this.userData.asObservable();
  }
  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + (!!localStorage.getItem('token') ? localStorage.getItem('token').replace(/"/g, '') : '')
    });
  }

  AdminPortalGetApi(path: any, params: any) {
    this.spinner.show();
    const httpOptionsGet = {
      headers: (localStorage.getItem('token')) ? this.getHeaders() : {
        'Content-Type': 'application/json'
      }
    };
    return this.http.get(path, httpOptionsGet);
  }

  AdminPortalPostApi(url: any, apiBody: any) {
    this.spinner.show();
    const httpOptionsPost = {
      headers: (localStorage.getItem('token')) ? this.getHeaders() : {
        'Content-Type': 'application/json'
      }
    };
    return this.http.post(url, apiBody, httpOptionsPost);
  }

  AdminPortalPutApi(url: any, apiBody: any) {
    this.spinner.show();
    const httpOptionsPost = {
      headers: (localStorage.getItem('token')) ? this.getHeaders() : {
        'Content-Type': 'application/json'
      }
    };
    return this.http.put(url, apiBody, httpOptionsPost);
  }
  public getJSON(url): Observable<any> {
    return this.http.get(url);
  }
  setUserData(name){
    if(name!=" "){
      this.userData.next(name);
    }
  }

  getUserData():Observable<any>{
  return this.userInfo;
    }
}
