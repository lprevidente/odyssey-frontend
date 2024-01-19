import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfilePage } from "./page/profile/profile-page.component";
import { PersonalInformationPage } from "./page/personal-information/personal-information.page";
import { NotificationsPage } from "./page/notifications/notifications-page.component";

const routes: Routes = [
  { path: "", pathMatch: "full", component: ProfilePage },
  { path: "personal-information", component: PersonalInformationPage },
  { path: "notifications", component: NotificationsPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
