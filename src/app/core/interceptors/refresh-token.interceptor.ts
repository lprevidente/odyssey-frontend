import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, switchMap, take } from "rxjs/operators";
import { AuthService } from "@modules/auth/services/auth.service";
import { Router } from "@angular/router";
import { rejectNil } from "@core/utils/rxjs";
import { TokenStorageService } from "@core/services/token-storage.service";

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private _isRefreshing = false;
  private _refreshTokenSubject = new BehaviorSubject<string | null>(null);

  public constructor(
    private _authService: AuthService,
    private _tokenStorageService: TokenStorageService,
    private _router: Router
  ) {}

  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          this._tokenStorageService.refreshToken
        )
          return this._handle401Error(req, next);

        return throwError(() => error);
      })
    );
  }

  private _handle401Error(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this._isRefreshing) {
      this._isRefreshing = true;
      this._refreshTokenSubject.next(null);

      return this._authService.refreshToken().pipe(
        switchMap((token: { token: string }) => {
          this._isRefreshing = false;
          this._refreshTokenSubject.next(token.token);
          return next.handle(this._addToken(req, token.token));
        }),
        catchError(() => {
          this._isRefreshing = false;
          this._router.navigate(["login"]);
          return throwError(() => "Refresh token failed");
        })
      );
    }

    return this._refreshTokenSubject.pipe(
      rejectNil(),
      take(1),
      switchMap(jwt => {
        return next.handle(this._addToken(req, jwt));
      })
    );
  }

  private _addToken(
    req: HttpRequest<unknown>,
    jwt: string
  ): HttpRequest<unknown> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  }
}
