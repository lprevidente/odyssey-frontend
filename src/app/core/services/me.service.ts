import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BASE_PATH } from "../../app.module";
import { EMPTY, map, Observable, tap } from "rxjs";
import { Me } from "@core/models/me";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MeService {
  private readonly _endpoint: string;
  private _me: Me = {} as Me;

  public constructor(
    private _httpClient: HttpClient,
    @Inject(BASE_PATH) private _basePath: string
  ) {
    this._endpoint = `${this._basePath}/v1/user`;
  }

  public getMe(): Observable<void> {
    return this._httpClient.get<Me>(this._endpoint).pipe(
      tap(me => (this._me = me)),
      map(() => {}),
      catchError(() => EMPTY)
    );
  }

  public get me(): Me {
    return this._me;
  }
}
