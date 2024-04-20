import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BASE_PATH } from "../../../app.module";
import { Observable } from "rxjs";
import { NewTrip } from "@modules/trips/models/new-trip";
import { TripInfo } from "@modules/trips/models/tripInfo";
import { TransformDate } from "@core/utils/date.utils";

@Injectable({ providedIn: "root" })
export class TripService {
  private readonly _endpoint: string;

  public constructor(
    private _httpClient: HttpClient,
    @Inject(BASE_PATH) private _basePath: string
  ) {
    this._endpoint = `${this._basePath}/v1/trip`;
  }

  @TransformDate
  public getTrips(): Observable<TripInfo[]> {
    return this._httpClient.get<TripInfo[]>(`${this._endpoint}`);
  }

  public createTrip(trip: NewTrip): Observable<TripInfo> {
    return this._httpClient.post<TripInfo>(`${this._endpoint}`, trip);
  }
}
