import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { AddressService } from "@shared/address/service/address.service";
import { Place } from "@modules/trips/models/address";
import { CalendarComponentOptions } from "@googlproxer/ion-range-calendar";
import { format } from "date-fns";
import { map, switchMap } from "rxjs";
import { TripService } from "@modules/trips/services/trip.service";
import { NewTrip } from "@modules/trips/models/new-trip";
import { LoadingService } from "@core/services/loading.service";
import { ToastSavingService } from "@core/services/toast-saving.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-new-trip",
  templateUrl: "./new-trip.page.html",
  styleUrls: ["./new-trip.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTripPage {
  protected readonly form = this._formBuilder.group({
    name: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    dateRange: new FormControl<{
      from: Date;
      to: Date;
    } | null>(null, Validators.required),
    people: this._formBuilder.nonNullable.group({
      adults: [0, [Validators.required, Validators.min(1)]],
      children: [0, Validators.required],
    }),
  });

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
    private _addressService: AddressService,
    private _tripService: TripService,
    private _loadingService: LoadingService,
    private _router: Router,
    private _toastSavingService: ToastSavingService
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

  protected selectPlace(place: Place): void {
    this.form.patchValue({ name: place.address.city ?? place.address.label });
    this.place.set(place);
    this.showWhere.set(false);
    this.showWhen.set(true);
  }

  protected rangeSelected(): void {
    const { from, to } = this.form.getRawValue().dateRange!;
    const fromStr = format(from, "MMM dd");
    const toStr = format(to, "MMM dd");
    this.range.set(`${fromStr} - ${toStr}`);
    this.setShowWho();
  }

  protected peopleSelected(): void {
    this.showWho.set(false);
    const { adults, children } = this.form.getRawValue().people;
    this.guests.set(adults + children);
  }

  protected createTrip(): void {
    if (this.form.invalid) {
      console.info("Form is invalid", this.form.errors);
      return;
    }

    this._loadingService.showLoading();
    const trip = this.form.getRawValue() as NewTrip;
    this._addressService
      .getPosition(this.place()!.id)
      .pipe(
        map(place => ({ ...trip, place })),
        switchMap(trip => this._tripService.createTrip(trip))
      )
      .subscribe({
        next: trip => {
          this._router.navigateByUrl(`/tabs/trips/${trip.id}`);
          this._toastSavingService.showSaved();
        },
        error: () => this._toastSavingService.showError(),
      })
      .add(() => this._loadingService.hideLoading());
  }
}
