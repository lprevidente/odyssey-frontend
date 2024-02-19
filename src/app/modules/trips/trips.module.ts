import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AllTripsPage } from "./pages/all-trips/all-trips.page";
import { TripsPageRoutingModule } from "./trips-routing.module";
import { TripPage } from "./pages/trip/trip.page";
import { TimelineComponent } from "./components/timeline/timeline.component";
import { NewEventComponent } from "./components/new-event/new-event.component";
import { NewTripPage } from "@modules/trips/pages/new-trip/new-trip.page";
import { IonRangeCalendarModule } from "@googlproxer/ion-range-calendar";
import { CounterInputComponent } from "@shared/counter-input/counter-input.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TripsPageRoutingModule,
    ReactiveFormsModule,
    IonRangeCalendarModule,
    CounterInputComponent,
  ],
  declarations: [
    AllTripsPage,
    TripPage,
    TimelineComponent,
    NewEventComponent,
    NewTripPage,
  ],
  providers: [],
})
export class TripsPageModule {}
