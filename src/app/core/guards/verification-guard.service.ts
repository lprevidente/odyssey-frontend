import { inject, Injectable } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { MeService } from "@core/services/me.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService {
  private readonly _url = "/auth/login";

  public constructor(
    private _meService: MeService,
    private _router: Router
  ) {}

  public canActivate(): true | Promise<boolean> {
    if (this._meService.me?.emailVerified) return true;
    return this._router.navigateByUrl("/auth/verification");
  }
}

export const isVerifiedGuard: CanActivateFn = () =>
  inject(AuthGuardService).canActivate();
