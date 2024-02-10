import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPage } from "./pages/login/login.page";
import { SignupPage } from "./pages/signup/signup.page";
import { VerificationPage } from "@modules/auth/pages/verification/verification-page.component";
import { isAuthenticatedGuard } from "@core/guards/auth-guard.service";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginPage },
  { path: "signup", component: SignupPage },
  {
    path: "verification",
    canActivate: [isAuthenticatedGuard],
    component: VerificationPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
