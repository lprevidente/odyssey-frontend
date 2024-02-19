import { Component, forwardRef, Input, ViewEncapsulation } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-counter-input",
  templateUrl: "./counter-input.component.html",
  styleUrls: ["./counter-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CounterInputComponent),
      multi: true,
    },
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [IonicModule],
})
export class CounterInputComponent implements ControlValueAccessor {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input("counterValue") protected _counterValue = 0;

  protected propagateChange: any = () => {}; // Noop function

  protected get counterValue(): number {
    return this._counterValue;
  }

  protected set counterValue(val) {
    this._counterValue = val;
    this.propagateChange(val);
  }

  public writeValue(value: number): void {
    if (value) {
      this.counterValue = value;
    }
  }

  public registerOnChange(fn: () => void): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(): void {}

  protected increase(): void {
    this.counterValue++;
  }

  protected decrease(): void {
    this.counterValue--;
  }
}
