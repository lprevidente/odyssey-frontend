import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Place, Response } from "@modules/trips/models/address";
import { BASE_PATH } from "../../../app.module";

@Injectable({ providedIn: "root" })
export class AddressService {
  private readonly _endpoint: string;

  public constructor(
    private _httpClient: HttpClient,
    @Inject(BASE_PATH) private _basePath: string
  ) {
    this._endpoint = `${this._basePath}/v1/address`;
  }

  public autocomplete(query: string): Observable<Response> {
    return this._httpClient.get<Response>(`${this._endpoint}/autocomplete`, {
      params: { query },
    });
  }

  public getPosition(id: string): Observable<Place> {
    const options = { params: { id } };
    return this._httpClient.get<Place>(`${this._endpoint}/position`, options);
  }

  public getPOI(query: string, at: string): Observable<Response> {
    return this._httpClient.get<Response>(`${this._endpoint}/poi`, {
      params: { query, at },
    });
  }
}
