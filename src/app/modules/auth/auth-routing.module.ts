import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPage } from "./pages/login/login.page";
import { SignupPage } from "./pages/signup/signup.page";
import { VerificationPage } from "@modules/auth/pages/verification/verification.page";
import { isAuthenticatedGuard } from "@core/guards/auth-guard.service";
import { PasswordForgotPage } from "@modules/auth/pages/password-forgot/password-forgot.page";
import { ResetPasswordPage } from "@modules/auth/pages/reset-password/reset-password.page";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginPage },
  { path: "signup", component: SignupPage },
  { path: "password-forgot", component: PasswordForgotPage },
  { path: "reset-password", component: ResetPasswordPage },
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
