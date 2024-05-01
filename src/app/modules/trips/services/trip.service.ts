import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BASE_PATH } from "../../../app.module";
import { Observable } from "rxjs";
import { NewTrip } from "@modules/trips/models/new-trip";
import { TripDetails, TripInfo } from "@modules/trips/models/tripInfo";
import { TransformDate } from "@core/utils/date";
import { DateRange, formatDateRange } from "@modules/trips/models/date-range";
import { People } from "@modules/trips/models/people";
import {
  Activity,
  NewAccommodation,
  NewEatery,
  NewEntertainment,
  NewTransportation,
} from "@modules/trips/models/activity";
import { format } from "date-fns";

@Injectable({ providedIn: "root" })
export class TripService {
  private readonly _endpoint: string;

  constructor(
    private _httpClient: HttpClient,
    @Inject(BASE_PATH) private _basePath: string
  ) {
    this._endpoint = `${this._basePath}/v1/trip`;
  }

  @TransformDate
  public getTrips(): Observable<TripInfo[]> {
    return this._httpClient.get<TripInfo[]>(`${this._endpoint}`);
  }

  @TransformDate
  public getTrip(id: string): Observable<TripDetails> {
    return this._httpClient.get<TripDetails>(`${this._endpoint}/${id}`);
  }

  public createTrip(trip: NewTrip): Observable<TripInfo> {
    return this._httpClient.post<TripInfo>(`${this._endpoint}`, {
      ...trip,
      dateRange: formatDateRange(trip.dateRange),
    });
  }

  public updateDateRange(id: string, dateRange: DateRange): Observable<void> {
    return this._httpClient.put<void>(
      `${this._endpoint}/${id}/date-range`,
      formatDateRange(dateRange)
    );
  }

  public updatePeople(id: string, people: People): Observable<void> {
    return this._httpClient.put<void>(`${this._endpoint}/${id}/people`, people);
  }

  public deleteTrip(id: string): Observable<void> {
    return this._httpClient.delete<void>(`${this._endpoint}/${id}`);
  }
}
