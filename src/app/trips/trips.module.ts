import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AllTripsPage } from "./pages/all-trips/all-trips-page.component";
import { TripsPageRoutingModule } from "./trips-routing.module";

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, TripsPageRoutingModule],
  declarations: [AllTripsPage],
})
export class TripsPageModule {}
