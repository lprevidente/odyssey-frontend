import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Response } from "@modules/trips/models/here";
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
}
