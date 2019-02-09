import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';
import { GenericUtil } from '../util/GenericUtil';

@Injectable()


export class ValidateRequestService extends GenericUtil implements HttpInterceptor {

  constructor(public router:Router) {
    super();
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request);
    // request = request.clone({
    //   setHeaders: {
    //     Authorization: `${this.getToken()}`
    //   }
    // });
    // return next.handle(request).do((event: HttpEvent<any>) => {
    //   if (event instanceof HttpResponse) {
    //     // do stuff with response if you want
    //     console.log("Passou");
    //   }
    // }, (err: any) => {
    //   if (err instanceof HttpErrorResponse) {
    //     console.log("N Passou");
        
    //     // if (err.status === 402) {
    //     //   this.clearToken();
    //     //   this.router.navigate(['/login'])

    //     //   this.growl('error','Não permitido',`Você não tem permissao`);
    //     // }
    //   }
    // });
  }

  getToken():string{
    try{
      return localStorage.getItem('_token_on_t')
    }catch(e){
      this.router.navigate(['/login'])
    }
  }
}