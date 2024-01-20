import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EMPTY, Observable, switchMap, tap } from "rxjs";
import { BASE_PATH } from "../../../app.module";
import { Auth } from "@modules/auth/models/auth";
import { Signup } from "@modules/auth/models/signup";
import { TokenResponse } from "@modules/auth/models/token-response";
import { TokenStorageService } from "@core/services/token-storage.service";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly _endpoint: string;

  public constructor(
    private _httpClient: HttpClient,
    private _tokenStorageService: TokenStorageService,
    @Inject(BASE_PATH) private _basePath: string
  ) {
    this._endpoint = `${this._basePath}/v1`;
  }

  public login(auth: Auth): Observable<TokenResponse> {
    return this._httpClient
      .post<TokenResponse>(`${this._endpoint}/auth/login`, auth)
      .pipe(tap(res => this._saveToken(res)));
  }

  public signup(auth: Signup): Observable<TokenResponse> {
    return this._httpClient
      .post<void>(`${this._endpoint}/user`, auth)
      .pipe(switchMap(() => this.login(auth)));
  }

  public refreshToken(): Observable<TokenResponse> {
    return this._httpClient
      .post<TokenResponse>(`${this._endpoint}/auth/refresh-token`, {
        token: this._tokenStorageService.refreshToken,
      })
      .pipe(tap(res => this._saveToken(res)));
  }

  public logout(): Observable<void> {
    return this._httpClient
      .post<void>(`${this._basePath}/v1/auth/logout`, null)
      .pipe(
        tap(() => this.reset()),
        catchError(() => {
          this.reset();
          return EMPTY;
        })
      );
  }

  public reset = (): void => {
    this._tokenStorageService.clear();
  };

  private _saveToken(tokenResponse: TokenResponse): void {
    this._tokenStorageService.token = tokenResponse.token;
    this._tokenStorageService.refreshToken = tokenResponse.refreshToken;
  }
}
