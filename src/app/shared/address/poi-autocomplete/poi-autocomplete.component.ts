import {
  ChangeDetectionStrategy,
  Component,
  effect,
  forwardRef,
  input,
  signal,
} from "@angular/core";
import { Place, trackPlaceBy } from "@modules/trips/models/address";
import { AddressService } from "@shared/address/service/address.service";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-poi-autocomplete",
  templateUrl: "./poi-autocomplete.component.html",
  styleUrls: ["../autocomplete.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PoiAutocompleteComponent),
      multi: true,
    },
  ],
})
export class PoiAutocompleteComponent implements ControlValueAccessor {
  protected readonly trackBy = trackPlaceBy;
  protected readonly places = signal<Place[]>([]);
  protected propagateChange: any = () => {}; // Noop function

  public label = input.required<string>();
  public value = signal<Place | null>(null);
  public latitude = input.required<number>();
  public longitude = input.required<number>();

  public constructor(private _addressService: AddressService) {
    effect(() => {
      if (!this.value()) return;
      this.propagateChange(this.value());
    });
  }

  public writeValue(place: Place | null): void {
    if (!place) return;
    this.value.set(place);
  }

  public registerOnChange(fn: () => void): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(): void {}

  protected clearSearch(): void {
    this.places.set([]);
  }

  protected selectPlace(place: Place): void {
    this.places.set([]);
    this.value.set(place);
  }

  protected autocomplete(event: any): void {
    const text = event.target.value?.toLowerCase();
    if (!text) {
      this.clearSearch();
      return;
    }

    this._addressService
      .getPOI(text, `${this.latitude()},${this.longitude()}`)
      .subscribe({
        next: ({ items }) => this.places.set(items),
        error: console.error,
      });
  }
}
