import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProfilePage } from "./page/profile/profile.page";
import { ProfilePageRoutingModule } from "./profile-routing.module";
import { AvatarComponent } from "./components/avatar/avatar.component";
import { PersonalInformationPage } from "./page/personal-information/personal-information.page";
import { NotificationsPage } from "./page/notifications/notifications.page";
import { SecurityComponent } from "@modules/profile/page/security/security.page";
import { LastUpdatePasswordComponent } from "@modules/profile/components/last-update-password/last-update-password.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProfilePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ProfilePage,
    SecurityComponent,
    AvatarComponent,
    PersonalInformationPage,
    NotificationsPage,
    LastUpdatePasswordComponent,
  ],
})
export class ProfilePageModule {}
