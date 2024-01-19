import { Inject, Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { BASE_PATH } from "../../app.module";
import { Router } from "@angular/router";
import { TokenStorageService } from "./token-storage.service";
import { Me } from "../models/me";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MeService {
  private readonly _endpoint: string;
  private _me: Me | undefined = undefined;

  public constructor(
    private _httpClient: HttpClient,
    @Inject(BASE_PATH) private _basePath: string,
    private _router: Router,
    private _tokenService: TokenStorageService
  ) {
    this._endpoint = `${_basePath}/utenti`;
  }

  public init(): Observable<Me> {
    return this._httpClient
      .get<Me>(`${this._endpoint}/me`)
      .pipe(tap(me => (this._me = me)));
  }

  public get me(): Me {
    return this._me!;
  }

  public logout(): void {
    this._httpClient
      .post<void>(`${this._basePath}/auth/logout`, null)
      .subscribe({
        next: this.reset,
        error: this.reset,
      });
  }

  public reset = (): void => {
    this._tokenService.clear();
    this._router.navigateByUrl("/auth/login").then();
  };
}
