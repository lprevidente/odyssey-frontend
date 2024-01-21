import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BASE_PATH } from "../../../app.module";
import { AppSettings } from "@modules/profile/models/app-settings";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AppSettingsService {
  private readonly _endpoint: string;

  public constructor(
    private _httpClient: HttpClient,
    @Inject(BASE_PATH) private _basePath: string
  ) {
    this._endpoint = `${this._basePath}/v1/user/app-settings`;
  }

  public getAppSettings(): Observable<AppSettings> {
    return this._httpClient.get<AppSettings>(this._endpoint);
  }

  public updateAppSettings(appSettings: AppSettings): Observable<void> {
    return this._httpClient.put<void>(this._endpoint, appSettings);
  }
}
