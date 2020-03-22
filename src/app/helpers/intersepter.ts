import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {finalize, catchError } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class LoadingScreenInterceptor implements HttpInterceptor {

    activeRequests = 0;

    /**
     * URLs for which the loading screen should not be enabled
     * Comma separated string type array
     */
    skippUrls = [];

    constructor( private loader:NgxSpinnerService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let displayLoadingScreen = true;
        for (const skippUrl of this.skippUrls) {
            if (new RegExp(skippUrl).test(request.url)) {
                displayLoadingScreen = false;
                break;
            }
        }
        if (displayLoadingScreen) {
            if (this.activeRequests === 0) {
                // this.ngxUiLoaderService.start();
                this.loader.show()
            }
            this.activeRequests++;
            return next.handle(request).pipe(
                finalize(() => {
                    this.activeRequests--;
                    if (this.activeRequests === 0) {
                        // this.ngxUiLoaderService.stop();
                        this.loader.hide();
                    }
                }),
                catchError((error: HttpErrorResponse) => {                   
                    // let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                      // client-side error
                    //   errorMessage = `Error: ${error.error.message}`;
                    } else {
                      if(error.status== 401){        
                        // this.commonService.setLoginStatus({ 'status': 400});
                            }
                      // server-side error
                    //   errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                    }
                    // window.alert(errorMessage);
                    return throwError(error);
                  })
            );
        } else {
            return next.handle(request);
        }
    }

}
