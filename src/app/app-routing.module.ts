import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { isAuthenticatedGuard } from "@core/guards/auth-guard.service";
import { canActivateNoAuthGuard } from "@core/guards/no-auth-guard.service";
import { isVerifiedGuard } from "@core/guards/verification-guard.service";

const routes: Routes = [
  {
    path: "",
    redirectTo: "tabs",
    pathMatch: "full",
  },
  {
    path: "tabs",
    canActivate: [isAuthenticatedGuard, isVerifiedGuard],
    loadChildren: () =>
      import("@modules/tabs/tabs.module").then(m => m.TabsPageModule),
  },
  {
    path: "auth",
    canActivate: [canActivateNoAuthGuard],
    loadChildren: () =>
      import("@modules/auth/auth.module").then(m => m.AuthModule),
  },
  {
    path: "**",
    redirectTo: "tabs",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
