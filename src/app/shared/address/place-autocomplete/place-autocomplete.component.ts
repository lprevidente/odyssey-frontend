import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  Output,
  signal,
} from "@angular/core";
import { Place, trackPlaceBy } from "@modules/trips/models/address";
import { AddressService } from "@shared/address/service/address.service";

@Component({
  selector: "app-place-autocomplete",
  templateUrl: "./place-autocomplete.component.html",
  styleUrls: ["../autocomplete.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceAutocompleteComponent {
  protected readonly trackBy = trackPlaceBy;
  protected readonly places = signal<Place[]>([]);

  public value = input.required<Place | null>();

  @Output()
  public selected = new EventEmitter<Place>();

  public constructor(private _addressService: AddressService) {}

  protected selectPlace(place: Place): void {
    this.places.set([]);
    this.selected.emit(place);
  }

  protected autocomplete(event: any): void {
    const text = event.target.value?.toLowerCase();
    if (!text) {
      this.clearSearch();
      return;
    }
    this._addressService.autocomplete(text).subscribe({
      next: ({ items }) => this.places.set(items),
      error: console.error,
    });
  }

  protected clearSearch(): void {
    this.places.set([]);
  }
}
