import { inject, Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { TokenStorageService } from "@core/services/token-storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService {
  private readonly _url = "/auth/login";

  public constructor(
    private _tokenStorageService: TokenStorageService,
    private _router: Router
  ) {}

  public canActivate(state: RouterStateSnapshot): true | Promise<boolean> {
    if (this._tokenStorageService.isTokenPresent) {
      return true;
    }
    let redirectUrl = this._url;
    if (!state.url) redirectUrl += `?redirect=${state.url}`;
    return this._router.navigateByUrl(redirectUrl);
  }
}

export const isAuthenticatedGuard: CanActivateFn = (
  _: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => inject(AuthGuardService).canActivate(state);
