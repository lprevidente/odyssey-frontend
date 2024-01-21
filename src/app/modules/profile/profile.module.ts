import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProfilePage } from "@modules/profile/pages/profile/profile.page";
import { ProfilePageRoutingModule } from "./profile-routing.module";
import { AvatarComponent } from "./components/avatar/avatar.component";
import { PersonalInformationPage } from "@modules/profile/pages/personal-information/personal-information.page";
import { NotificationsPage } from "@modules/profile/pages/notifications/notifications.page";
import { SecurityComponent } from "@modules/profile/pages/security/security.page";
import { LastUpdatePasswordComponent } from "@modules/profile/components/last-update-password/last-update-password.component";
import { DeviceHistoryComponent } from "@modules/profile/components/device-history/device-history.component";
import { DeleteAccountComponent } from "@modules/profile/components/delete-account/delete-account.component";
import { AppSettingsPage } from "@modules/profile/pages/app-settings/app-settings.page";

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
    DeviceHistoryComponent,
    AppSettingsPage,
    SecurityComponent,
    AvatarComponent,
    PersonalInformationPage,
    NotificationsPage,
    LastUpdatePasswordComponent,
    DeleteAccountComponent,
  ],
})
export class ProfilePageModule {}
