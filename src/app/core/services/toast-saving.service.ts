import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ToastSavingService {
  private readonly _saved$ = new BehaviorSubject<boolean>(false);
  private readonly _error$ = new BehaviorSubject<string>("");

  public constructor() {}

  public get saved$(): Observable<boolean> {
    return this._saved$.asObservable();
  }

  public get error$(): Observable<string | null> {
    return this._error$.asObservable();
  }

  public showSaved(): void {
    this._saved$.next(true);
  }

  public hideSaved(): void {
    this._saved$.next(false);
  }

  public showError(): void {
    this._error$.next("Something went wrong, please try again.");
  }

  public showErrorWithMessage(message: string): void {
    this._error$.next(message);
  }

  public hideError(): void {
    this._error$.next("");
  }
}
