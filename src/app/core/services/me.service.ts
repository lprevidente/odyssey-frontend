import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BASE_PATH } from "../../app.module";
import { map, Observable, of, tap } from "rxjs";
import { Me } from "@core/models/me";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class MeService {
  private readonly _endpoint: string;
  private _me: Me = {} as Me;

  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
    @Inject(BASE_PATH) private _basePath: string
  ) {
    this._endpoint = `${this._basePath}/v1/user`;
  }

  public getMe(): Observable<void> {
    return this._httpClient.get<Me>(this._endpoint).pipe(
      tap(me => (this._me = me)),
      map(() => {}),
      catchError(err => {
        console.log(err);
        this._router.navigateByUrl("/error");
        return of();
      })
    );
  }

  public get me(): Me {
    return this._me;
  }
}
