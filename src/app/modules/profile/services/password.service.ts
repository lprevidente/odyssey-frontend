import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BASE_PATH } from "../../../app.module";
import { ChangePassword } from "@modules/profile/models/change-password";
import { Observable } from "rxjs";
import { LastUpdatePassword } from "@modules/profile/models/last-update-password";

@Injectable({
  providedIn: "root",
})
export class PasswordService {
  private readonly _endpoint: string;

  public constructor(
    private _httpClient: HttpClient,
    @Inject(BASE_PATH) private _basePath: string
  ) {
    this._endpoint = `${this._basePath}/v1/user/password`;
  }

  public getLastUpdatePassword(): Observable<LastUpdatePassword> {
    return this._httpClient.get<LastUpdatePassword>(
      `${this._endpoint}/last-update`
    );
  }

  public updatePassword(changePassword: ChangePassword): Observable<void> {
    return this._httpClient.put<void>(this._endpoint, changePassword);
  }
}
