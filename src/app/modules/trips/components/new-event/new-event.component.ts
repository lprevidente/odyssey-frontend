import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "app-new-event",
  templateUrl: "./new-event.component.html",
  styleUrls: ["./new-event.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEventComponent implements OnInit {
  protected isModalOpen = false;
  // Typically referenced to your ion-router-outlet
  protected presentingElement: HTMLElement | null = null;

  constructor() {}

  ngOnInit() {
    this.presentingElement = document.querySelector(".ion-page");
  }

  onWillDismiss($event: any) {
    this.isModalOpen = false;
  }

  cancel() {
    this.isModalOpen = false;
  }

  confirm() {
    this.isModalOpen = false;
  }

  openModel() {
    this.isModalOpen = true;
  }
}
