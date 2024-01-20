import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenStorageService } from "@core/services/token-storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _tokenStorageService: TokenStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this._tokenStorageService.token;
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${token}`),
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
