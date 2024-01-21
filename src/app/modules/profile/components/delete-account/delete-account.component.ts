import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-delete-account",
  templateUrl: "./delete-account.component.html",
  styleUrls: ["./delete-account.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteAccountComponent {
  public constructor() {}
}
