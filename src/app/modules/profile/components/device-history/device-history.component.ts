import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-device-history",
  templateUrl: "./device-history.component.html",
  styleUrls: ["./device-history.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceHistoryComponent {
  public constructor() {}
}
