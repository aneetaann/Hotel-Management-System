import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService {
  constructor(private injector: Injector) {}

  intercept(req:any, next:any) {
    let userService = this.injector.get(UsersService);
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${userService.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }
}
