import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ProfilePage } from "./page/profile/profile-page.component";
import { ProfilePageRoutingModule } from "./profile-routing.module";
import { AvatarComponent } from "./components/avatar/avatar.component";
import { PersonalInformationPage } from "./page/personal-information/personal-information.page";
import { NotificationsPage } from "./page/notifications/notifications-page.component";

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ProfilePageRoutingModule],
  declarations: [
    ProfilePage,
    AvatarComponent,
    PersonalInformationPage,
    NotificationsPage,
  ],
})
export class ProfilePageModule {}
