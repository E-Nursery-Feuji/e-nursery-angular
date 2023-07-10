import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ENurseryInterceptorInterceptor implements HttpInterceptor {



  constructor() {


  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwtToken =localStorage.getItem("token");
    // return next.handle(request.clone());

    if (jwtToken) {
      request = request.clone({headers: request.headers.set("Authorization","Bearer "+jwtToken)
      });
      console.log("request jwt");
      console.log(request);
      return next.handle(request);
  }
  else {
      return next.handle(request);
  }
  }


}
