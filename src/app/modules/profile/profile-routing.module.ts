import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfilePage } from "@modules/profile/pages/profile/profile.page";
import { PersonalInformationPage } from "@modules/profile/pages/personal-information/personal-information.page";
import { NotificationsPage } from "@modules/profile/pages/notifications/notifications.page";
import { SecurityComponent } from "@modules/profile/pages/security/security.page";
import { AppSettingsPage } from "@modules/profile/pages/app-settings/app-settings.page";

const routes: Routes = [
  { path: "", pathMatch: "full", component: ProfilePage },
  { path: "personal-information", component: PersonalInformationPage },
  { path: "security", component: SecurityComponent },
  { path: "notifications", component: NotificationsPage },
  { path: "app-settings", component: AppSettingsPage },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
