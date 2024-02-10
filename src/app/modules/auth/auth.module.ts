import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginPage } from "./pages/login/login.page";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { SignupPage } from "./pages/signup/signup.page";
import { VerificationPage } from "@modules/auth/pages/verification/verification.page";
import { PasswordForgotPage } from "@modules/auth/pages/password-forgot/password-forgot.page";
import { ResetPasswordPage } from "@modules/auth/pages/reset-password/reset-password.page";

@NgModule({
  declarations: [
    LoginPage,
    SignupPage,
    VerificationPage,
    PasswordForgotPage,
    ResetPasswordPage,
  ],
  imports: [CommonModule, AuthRoutingModule, IonicModule, ReactiveFormsModule],
})
export class AuthModule {}
