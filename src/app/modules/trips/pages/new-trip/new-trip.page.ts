import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { AddressService } from "@modules/trips/services/address.service";
import { Place, trackPlaceBy } from "@modules/trips/models/here";
import { CalendarComponentOptions } from "@googlproxer/ion-range-calendar";
import { format } from "date-fns";

@Component({
  selector: "app-new-trip",
  templateUrl: "./new-trip.page.html",
  styleUrls: ["./new-trip.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTripPage {
  protected readonly form = this._formBuilder.group({
    name: ["", Validators.required],
    range: new FormControl<{
      from: Date;
      to: Date;
    } | null>(null, Validators.required),
    guests: this._formBuilder.nonNullable.group({
      adults: [0, [Validators.required, Validators.min(1)]],
      children: [0, Validators.required],
    }),
  });
  protected readonly trackBy = trackPlaceBy;
  protected readonly places = signal<Place[]>([]);

  protected readonly showWhere = signal<boolean>(false);
  protected readonly showWhen = signal<boolean>(false);
  protected readonly showWho = signal<boolean>(false);

  protected readonly place = signal<Place | null>(null);
  protected readonly range = signal<string | null>(null);
  protected readonly guests = signal<number | null>(null);

  protected readonly optionsRange: CalendarComponentOptions = {
    pickMode: "range",
  };

  public constructor(
    private _formBuilder: FormBuilder,
    private _addressService: AddressService
  ) {}

  protected setShowWhere(): void {
    this.showWhere.set(true);
    this.showWhen.set(false);
    this.showWho.set(false);
  }

  protected setShowWhen(): void {
    this.showWhere.set(false);
    this.showWhen.set(true);
    this.showWho.set(false);
  }

  protected setShowWho(): void {
    this.showWhere.set(false);
    this.showWhen.set(false);
    this.showWho.set(true);
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

  protected selectPlace(place: Place): void {
    this.form.patchValue({ name: place.address.city ?? place.address.label });
    this.place.set(place);
    this.places.set([]);
    this.showWhere.set(false);
    this.showWhen.set(true);
  }

  protected rangeSelected(): void {
    const { from, to } = this.form.getRawValue().range!;
    const fromStr = format(from, "MMM dd");
    const toStr = format(to, "MMM dd");
    this.range.set(`${fromStr} - ${toStr}`);
    this.setShowWho();
  }

  protected peopleSelected(): void {
    this.showWho.set(false);
    const { adults, children } = this.form.getRawValue().guests;
    this.guests.set(adults + children);
  }
}
