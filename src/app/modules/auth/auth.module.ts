import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginPage } from "./pages/login/login.page";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { SignupPage } from "./pages/signup/signup.page";
import { VerificationPage } from "@modules/auth/pages/verification/verification-page.component";

@NgModule({
  declarations: [LoginPage, SignupPage, VerificationPage],
  imports: [CommonModule, AuthRoutingModule, IonicModule, ReactiveFormsModule],
})
export class AuthModule {}
