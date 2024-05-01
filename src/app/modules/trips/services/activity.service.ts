import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BASE_PATH } from "../../../app.module";
import { Observable } from "rxjs";
import {
  Activity,
  NewAccommodation,
  NewEatery,
  NewEntertainment,
  NewTransportation,
} from "@modules/trips/models/activity";
import { format } from "date-fns";
import { TransformDate } from "@core/utils/date";

@Injectable({ providedIn: "root" })
export class ActivityService {
  private readonly _endpoint: string;

  constructor(
    private _httpClient: HttpClient,
    @Inject(BASE_PATH) private _basePath: string
  ) {
    this._endpoint = `${this._basePath}/v1/trip`;
  }

  public deleteActivity(
    id: string,
    date: Date,
    activityId: string
  ): Observable<void> {
    const dateStr = format(date, "yyyy-MM-dd");
    return this._httpClient.delete<void>(
      `${this._endpoint}/${id}/activities/${dateStr}/${activityId}`
    );
  }

  @TransformDate
  public addActivity(
    id: string,
    date: Date,
    activity:
      | NewEntertainment
      | NewEatery
      | NewTransportation
      | NewAccommodation
  ): Observable<Activity> {
    const dateStr = format(date, "yyyy-MM-dd");
    return this._httpClient.post<Activity>(
      `${this._endpoint}/${id}/activities/${dateStr}`,
      activity
    );
  }

  public updateActivity(
    id: string,
    date: Date,
    activityId: string,
    activity:
      | NewEntertainment
      | NewEatery
      | NewTransportation
      | NewAccommodation
  ): Observable<Activity> {
    const dateStr = format(date, "yyyy-MM-dd");
    return this._httpClient.put<Activity>(
      `${this._endpoint}/${id}/activities/${dateStr}/${activityId}`,
      activity
    );
  }
}
