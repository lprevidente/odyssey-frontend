import { IonicModule } from "@ionic/angular";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AllTripsPage } from "./pages/all-trips/all-trips.page";
import { TripsPageRoutingModule } from "./trips-routing.module";
import { TripPage } from "./pages/trip/trip.page";
import { TimelineComponent } from "./components/timeline/timeline.component";
import { NewTripPage } from "@modules/trips/pages/new-trip/new-trip.page";
import { IonRangeCalendarModule } from "@googlproxer/ion-range-calendar";
import { CounterInputComponent } from "@shared/counter-input/counter-input.component";
import { AdressModule } from "@shared/address/adress.module";
import { EditGuestsComponent } from "@modules/trips/components/edit-guests/edit-guests.component";
import { EditDateRangeComponent } from "@modules/trips/components/edit-date-range/edit-date-range.component";
import { NewEventComponent } from "@modules/trips/components/new-events/new-event/new-event.component";
import { NewEventTransportationComponent } from "@modules/trips/components/new-events/new-event-transportation/new-event-transportation.component";
import { NewEventEateryComponent } from "@modules/trips/components/new-events/new-event-eatery/new-event-eatery.component";
import { NewEventAccommodationComponent } from "@modules/trips/components/new-events/new-event-accomodation/new-event-accommodation.component";
import { NewEventEntertainmentComponent } from "@modules/trips/components/new-events/new-event-entertainment/new-event-entertainment.component";
import { EventTransportationComponent } from "@modules/trips/components/events/event-transportation/event-transportation.component";
import { EventAccommodationComponent } from "@modules/trips/components/events/event-accomodation/event-accommodation.component";
import { EventEateryComponent } from "@modules/trips/components/events/event-eatery/event-eatery.component";
import { EventEntertainmentComponent } from "@modules/trips/components/events/event-entertainment/event-entertainment.component";
import { SwipeDirective } from "@shared/swipe.directive";

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
    EventTransportationComponent,
    EventAccommodationComponent,
    EventEateryComponent,
    EventEntertainmentComponent,
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
    SwipeDirective,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TripsPageModule {}
