import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  private _isLoading$ = new Subject<boolean>();

  public constructor() {}

  public showLoading(): void {
    this._isLoading$.next(true);
  }

  public hideLoading(): void {
    this._isLoading$.next(false);
  }

  public get isLoading$(): Observable<boolean> {
    return this._isLoading$.asObservable();
  }
}
