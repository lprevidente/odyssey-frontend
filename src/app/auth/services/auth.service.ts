import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BASE_PATH } from "../../app.module";
import { Auth } from "../models/auth";
import { Observable } from "rxjs";
import { FormControl, ɵFormGroupValue, ɵTypedOrUntyped } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly _endpoint: string;

  public constructor(
    private _httpClient: HttpClient,
    @Inject(BASE_PATH) private _basePath: string
  ) {
    this._endpoint = `${this._basePath}/auth`;
  }

  public login(
    auth: ɵTypedOrUntyped<
      { email: FormControl<string>; password: FormControl<string> },
      ɵFormGroupValue<{
        email: FormControl<string>;
        password: FormControl<string>;
      }>,
      any
    >
  ): Observable<void> {
    return this._httpClient.post<void>(`${this._endpoint}/login`, auth);
  }
}
