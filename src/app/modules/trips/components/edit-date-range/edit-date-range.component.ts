import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { CalendarComponentOptions } from "@googlproxer/ion-range-calendar";

@Component({
  selector: "app-edit-date-range",
  templateUrl: "./edit-date-range.component.html",
  styleUrls: ["./edit-date-range.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditDateRangeComponent implements OnInit {
  protected readonly isModalOpen = signal<boolean>(false);
  protected presentingElement: globalThis.Element | null = null;
  protected form = this._formBuilder.group({
    dateRange: [null, Validators.required],
  });

  protected readonly optionsRange: CalendarComponentOptions = {
    pickMode: "range",
  };

  public constructor(private _formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.presentingElement = document.querySelector(".ion-pages");
  }

  protected close(): void {
    this.isModalOpen.set(false);
    this.openModelChange.emit(false);
  }

  @Output()
  public openModelChange = new EventEmitter<boolean>();

  @Input()
  public set openModel(value: boolean) {
    this.isModalOpen.set(value);
  }

  protected addPlace(): void {
    console.log(this.form.value);
    if (this.form.invalid) return;
    this.close();
  }
}
