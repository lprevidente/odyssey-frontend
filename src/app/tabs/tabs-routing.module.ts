import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "trips",
        loadChildren: () =>
          import("../trips/trips.module").then(m => m.TripsPageModule),
      },
      {
        path: "profile",
        loadChildren: () =>
          import("../profile/profile.module").then(m => m.ProfilePageModule),
      },
      {
        path: "",
        redirectTo: "/tabs/trips",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/tabs/trips",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
