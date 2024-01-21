import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AllTripsPage } from "./pages/all-trips/all-trips.page";
import { TripsPageRoutingModule } from "./trips-routing.module";
import { TripPage } from "./pages/trip/trip.page";
import { TimelineComponent } from "./components/timeline/timeline.component";
import { NewEventComponent } from "./components/new-event/new-event.component";

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, TripsPageRoutingModule],
  declarations: [AllTripsPage, TripPage, TimelineComponent, NewEventComponent],
  providers: [],
})
export class TripsPageModule {}
