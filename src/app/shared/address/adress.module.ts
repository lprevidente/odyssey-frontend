import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PoiAutocompleteComponent } from "@shared/address/poi-autocomplete/poi-autocomplete.component";
import { PlaceAutocompleteComponent } from "@shared/address/place-autocomplete/place-autocomplete.component";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [PoiAutocompleteComponent, PlaceAutocompleteComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  exports: [PlaceAutocompleteComponent, PoiAutocompleteComponent],
})
export class AdressModule {}
