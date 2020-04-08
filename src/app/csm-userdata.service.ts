import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError  } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { retry, catchError } from 'rxjs/operators';

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
      Authorization: 'Bearer ' + (!!localStorage.getItem('token') ? localStorage.getItem('token').replace(/"/g, '') : '')
    });
  }
  handleError(error) {
   
    let errorMessage = '';
    var errorData=[];
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.err}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
   errorData.push({'status':error.status})
    return errorData;
  }

  AdminPortalGetApi(path: any, params: any) {
    this.spinner.show();
    const httpOptionsGet = {
      headers: (localStorage.getItem('token')) ? this.getHeaders() : {
        'Content-Type': 'application/json'
      }
    };
    return this.http.get(path, httpOptionsGet).pipe(
      catchError(this.handleError)
    );
  }

  AdminPortalPostApi(url: any, apiBody: any) {
    this.spinner.show();
    const httpOptionsPost = {
      headers: (localStorage.getItem('token')) ? this.getHeaders() : {
        Accept: 'application/json'
      }
    };
    return this.http.post(url, apiBody, httpOptionsPost)
    .pipe(
      catchError(this.handleError)
    );
  }

  AdminPortalPutApi(url: any, apiBody: any) {
    this.spinner.show();
    const httpOptionsPost = {
      headers: (localStorage.getItem('token')) ? this.getHeaders() : {
        'Content-Type': 'application/json'
      }
    };
    return this.http.put(url, apiBody, httpOptionsPost).pipe(
      catchError(this.handleError)
    );
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
