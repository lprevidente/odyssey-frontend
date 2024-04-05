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
import { AdressModule } from "@shared/address/adress.module";
import { NewEventTransportationComponent } from "@modules/trips/components/new-event-transportation/new-event-transportation.component";
import { NewEventEateryComponent } from "@modules/trips/components/new-event-eatery/new-event-eatery.component";
import { NewEventAccommodationComponent } from "@modules/trips/components/new-event-accomodation/new-event-accommodation.component";
import { NewEventEntertainmentComponent } from "@modules/trips/components/new-event-entertainment/new-event-entertainment.component";
import { EditGuestsComponent } from "@modules/trips/components/edit-guests/edit-guests.component";
import { EditDateRangeComponent } from "@modules/trips/components/edit-date-range/edit-date-range.component";

@NgModule({
  declarations: [
    AllTripsPage,
    TripPage,
    TimelineComponent,
    NewEventComponent,
    NewTripPage,
    NewEventTransportationComponent,
    NewEventEateryComponent,
    NewEventAccommodationComponent,
    NewEventEntertainmentComponent,
    EditGuestsComponent,
    EditDateRangeComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TripsPageRoutingModule,
    ReactiveFormsModule,
    IonRangeCalendarModule,
    CounterInputComponent,
    AdressModule,
  ],
  providers: [],
})
export class TripsPageModule {}
