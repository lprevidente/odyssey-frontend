import { inject, Injectable } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { TokenStorageService } from "@core/services/token-storage.service";

@Injectable({
  providedIn: "root",
})
export class NoAuthGuardService {
  public constructor(
    private _tokenStorageService: TokenStorageService,
    private _router: Router
  ) {}

  public canActivate(): true | Promise<boolean> {
    if (!this._tokenStorageService.isTokenPresent) return true;
    return this._router.navigateByUrl("");
  }
}

export const canActivateNoAuthGuard: CanActivateFn = () =>
  inject(NoAuthGuardService).canActivate();
