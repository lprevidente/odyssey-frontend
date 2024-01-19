import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, switchMap, tap } from "rxjs";
import { BASE_PATH } from "../../../app.module";
import { Auth } from "@modules/auth/models/auth";
import { Signup } from "@modules/auth/models/signup";
import { TokenResponse } from "@modules/auth/models/token-response";
import { TokenStorageService } from "@core/services/token-storage.service";

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
      .pipe(tap(res => (this._tokenStorageService.token = res.token)));
  }

  public signup(auth: Signup): Observable<TokenResponse> {
    return this._httpClient
      .post<void>(`${this._endpoint}/user`, auth)
      .pipe(switchMap(() => this.login(auth)));
  }

  public logout(): void {
    this._tokenStorageService.clear();
  }
}
