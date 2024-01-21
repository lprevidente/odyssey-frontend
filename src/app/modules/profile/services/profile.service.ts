import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BASE_PATH } from "../../../app.module";
import { Observable } from "rxjs";
import { Profile } from "@modules/profile/models/profile";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  private readonly _endpoint: string;

  public constructor(
    private _httpClient: HttpClient,
    @Inject(BASE_PATH) private _basePath: string
  ) {
    this._endpoint = `${this._basePath}/v1/user/profile`;
  }

  public getProfile(): Observable<Profile> {
    return this._httpClient.get<Profile>(this._endpoint);
  }

  public updateProfile(profile: Omit<Profile, "avatarURL">): Observable<void> {
    return this._httpClient.put<void>(this._endpoint, profile);
  }

  public deleteProfile(): Observable<void> {
    return this._httpClient.delete<void>(this._endpoint);
  }
}
