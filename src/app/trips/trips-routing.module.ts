import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllTripsPage } from "./pages/all-trips/all-trips-page.component";

const routes: Routes = [
  {
    path: "",
    component: AllTripsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripsPageRoutingModule {}
