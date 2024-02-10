import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BASE_PATH } from "../../../app.module";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class VerificationService {
  private readonly _endpoint: string;

  public constructor(
    private _httpClient: HttpClient,
    @Inject(BASE_PATH) private _basePath: string
  ) {
    this._endpoint = `${this._basePath}/v1/user/confirmation-email`;
  }

  public getConfirmationEmail(): Observable<void> {
    return this._httpClient.get<void>(this._endpoint);
  }

  public verifyIdentity(confirmation: { code: string }): Observable<void> {
    return this._httpClient.post<void>(this._endpoint, confirmation);
  }
}
