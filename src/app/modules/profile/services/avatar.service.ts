import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BASE_PATH } from "../../../app.module";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AvatarService {
  private readonly _endpoint: string;

  public constructor(
    private _httpClient: HttpClient,
    @Inject(BASE_PATH) private _basePath: string
  ) {
    this._endpoint = `${this._basePath}/v1/user/avatar`;
  }

  public uploadAvatar(avatar: File): Observable<string> {
    const formData = new FormData();
    formData.append("file", avatar);
    return this._httpClient.post(this._endpoint, formData, {
      responseType: "text",
    });
  }

  public deleteAvatar(): Observable<void> {
    return this._httpClient.delete<void>(this._endpoint);
  }
}
