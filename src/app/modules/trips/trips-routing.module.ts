import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllTripsPage } from "./pages/all-trips/all-trips.page";
import { TripPage } from "./pages/trip/trip.page";
import { NewTripPage } from "@modules/trips/pages/new-trip/new-trip.page";

const routes: Routes = [
  { path: "", pathMatch: "full", component: AllTripsPage },
  { path: "new", component: NewTripPage },
  { path: ":id", component: TripPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripsPageRoutingModule {}
