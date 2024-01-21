import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfilePage } from "./page/profile/profile.page";
import { PersonalInformationPage } from "./page/personal-information/personal-information.page";
import { NotificationsPage } from "./page/notifications/notifications.page";
import { SecurityComponent } from "@modules/profile/page/security/security.page";

const routes: Routes = [
  { path: "", pathMatch: "full", component: ProfilePage },
  { path: "personal-information", component: PersonalInformationPage },
  { path: "security", component: SecurityComponent },
  { path: "notifications", component: NotificationsPage },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
